// /api/admin.js — Vercel Serverless Function
// Admin dashboard API — restricted to ADMIN_EMAILS only

import verifyAuth from "./_auth.js";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["admin@entermind.com"];

// Service role client — bypasses RLS
function getServiceClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req, res) {
  const allowedOrigins = ["https://enterrank.com", "https://www.enterrank.com", "https://enterrank.vercel.app", "http://localhost:5173", "http://localhost:3000"];
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  // Auth check
  const user = await verifyAuth(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  // Admin check
  if (!ADMIN_EMAILS.includes(user.email?.toLowerCase())) {
    return res.status(403).json({ error: "Forbidden — admin access only" });
  }

  const supabase = getServiceClient();
  if (!supabase) return res.status(500).json({ error: "Service client not configured" });

  const action = req.query.action || req.body?.action;

  try {
    if (action === "overview") {
      const { data: projects, error: pErr } = await supabase.from("projects").select("*");
      if (pErr) throw pErr;

      const { data: audits, error: aErr } = await supabase.from("audits").select("*");
      if (aErr) throw aErr;

      // Get unique users from projects
      const userMap = {};
      (projects || []).forEach(p => {
        if (!p.user_id) return;
        if (!userMap[p.user_id]) userMap[p.user_id] = { userId: p.user_id, projects: 0, audits: 0, lastActivity: null };
        userMap[p.user_id].projects++;
      });

      // Map audits to users
      (audits || []).forEach(a => {
        const uid = a.user_id;
        if (!uid) return;
        if (!userMap[uid]) userMap[uid] = { userId: uid, projects: 0, audits: 0, lastActivity: null };
        userMap[uid].audits++;
        const auditDate = a.created_at || a.updated_at;
        if (auditDate && (!userMap[uid].lastActivity || auditDate > userMap[uid].lastActivity)) {
          userMap[uid].lastActivity = auditDate;
        }
      });

      // Token usage and cost from audit results
      let totalTokens = { openai: { input: 0, output: 0 }, gemini: { input: 0, output: 0 }, perplexity: { input: 0, output: 0 }, serpapi: { searches: 0 } };
      let auditsWithTokenData = 0;

      (audits || []).forEach(a => {
        const results = typeof a.results === "string" ? (() => { try { return JSON.parse(a.results); } catch(e) { return null; } })() : a.results;
        const apiData = typeof a.api_data === "string" ? (() => { try { return JSON.parse(a.api_data); } catch(e) { return null; } })() : a.api_data;

        const tokenUsage = results?.tokenUsage || apiData?.tokenUsage || apiData?.results?.tokenUsage;
        if (tokenUsage) {
          auditsWithTokenData++;
          if (tokenUsage.openai) {
            totalTokens.openai.input += tokenUsage.openai?.input || 0;
            totalTokens.openai.output += tokenUsage.openai?.output || 0;
          }
          if (tokenUsage.openaiSearch) {
            totalTokens.openai.input += tokenUsage.openaiSearch?.input || 0;
            totalTokens.openai.output += tokenUsage.openaiSearch?.output || 0;
          }
          if (tokenUsage.gemini) {
            totalTokens.gemini.input += tokenUsage.gemini?.input || 0;
            totalTokens.gemini.output += tokenUsage.gemini?.output || 0;
          }
          if (tokenUsage.perplexity) {
            totalTokens.perplexity.input += tokenUsage.perplexity?.input || 0;
            totalTokens.perplexity.output += tokenUsage.perplexity?.output || 0;
          }
          if (tokenUsage.serpapi) {
            totalTokens.serpapi.searches += tokenUsage.serpapi?.searches || 0;
          }
        }
      });

      // Estimate costs from tokens
      const costs = {
        openai: (totalTokens.openai.input / 1000000 * 2.50) + (totalTokens.openai.output / 1000000 * 10),
        gemini: (totalTokens.gemini.input / 1000000 * 0.10) + (totalTokens.gemini.output / 1000000 * 0.40),
        perplexity: (totalTokens.perplexity.input / 1000000 * 3) + (totalTokens.perplexity.output / 1000000 * 15),
        serpapi: totalTokens.serpapi.searches * 0.015
      };
      costs.total = costs.openai + costs.gemini + costs.perplexity + costs.serpapi;

      return res.json({
        totalProjects: (projects || []).length,
        totalAudits: (audits || []).length,
        activeUsers: Object.keys(userMap).length,
        users: Object.values(userMap).sort((a, b) => b.audits - a.audits),
        auditsWithTokenData,
        totalTokens,
        estimatedCosts: {
          openai: Math.round(costs.openai * 100) / 100,
          gemini: Math.round(costs.gemini * 100) / 100,
          perplexity: Math.round(costs.perplexity * 100) / 100,
          serpapi: Math.round(costs.serpapi * 100) / 100,
          total: Math.round(costs.total * 100) / 100
        },
        avgCostPerAudit: (audits || []).length > 0 ? Math.round((costs.total / (audits || []).length) * 100) / 100 : 0
      });

    } else if (action === "users") {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      return res.json({
        users: (users || []).map(u => ({
          id: u.id,
          email: u.email,
          createdAt: u.created_at,
          lastSignIn: u.last_sign_in_at
        }))
      });

    } else {
      return res.status(400).json({ error: "Unknown action. Use: overview, users" });
    }
  } catch (err) {
    console.error("Admin API error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
