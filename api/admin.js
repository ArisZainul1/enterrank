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
      let totalTokens = { openai: { input: 0, output: 0 }, gemini: { input: 0, output: 0 }, perplexity: { input: 0, output: 0 }, claude: { input: 0, output: 0 }, serpapi: { searches: 0 } };
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
          if (tokenUsage.claude) {
            totalTokens.claude.input += tokenUsage.claude?.input || 0;
            totalTokens.claude.output += tokenUsage.claude?.output || 0;
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
        claude: (totalTokens.claude.input / 1000000 * 1) + (totalTokens.claude.output / 1000000 * 5),
        serpapi: totalTokens.serpapi.searches * 0.015
      };
      costs.total = costs.openai + costs.gemini + costs.perplexity + costs.claude + costs.serpapi;

      // Audit log timeline — last 20 audits with cost per audit
      const auditLog = (audits || [])
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, 20)
        .map(a => {
          const results = typeof a.results === "string" ? (() => { try { return JSON.parse(a.results); } catch(e) { return null; } })() : a.results;
          const apiData = typeof a.api_data === "string" ? (() => { try { return JSON.parse(a.api_data); } catch(e) { return null; } })() : a.api_data;
          const tu = results?.tokenUsage || apiData?.tokenUsage || apiData?.results?.tokenUsage || null;
          let auditCost = 0;
          let totalTok = 0;
          if (tu) {
            const oIn = (tu.openai?.input || 0) + (tu.openaiSearch?.input || 0);
            const oOut = (tu.openai?.output || 0) + (tu.openaiSearch?.output || 0);
            auditCost += (oIn / 1000000 * 2.50) + (oOut / 1000000 * 10);
            auditCost += ((tu.gemini?.input || 0) / 1000000 * 0.10) + ((tu.gemini?.output || 0) / 1000000 * 0.40);
            auditCost += ((tu.perplexity?.input || 0) / 1000000 * 3) + ((tu.perplexity?.output || 0) / 1000000 * 15);
            auditCost += ((tu.claude?.input || 0) / 1000000 * 1) + ((tu.claude?.output || 0) / 1000000 * 5);
            auditCost += (tu.serpapi?.searches || 0) * 0.015;
            totalTok = oIn + oOut + (tu.gemini?.input || 0) + (tu.gemini?.output || 0) + (tu.perplexity?.input || 0) + (tu.perplexity?.output || 0) + (tu.claude?.input || 0) + (tu.claude?.output || 0);
          }
          const brand = results?.clientData?.brand || apiData?.results?.clientData?.brand || a.brand || "Unknown";
          return {
            id: a.id,
            brand,
            userId: a.user_id,
            cost: Math.round(auditCost * 100) / 100,
            tokens: totalTok,
            createdAt: a.created_at
          };
        });

      // Cost projection — 7-day rolling average
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const recentAudits = (audits || []).filter(a => a.created_at && new Date(a.created_at) >= sevenDaysAgo);
      const recentCount = recentAudits.length;
      const dailyRate = recentCount / 7;
      const recentCosts = recentAudits.reduce((sum, a) => {
        const results = typeof a.results === "string" ? (() => { try { return JSON.parse(a.results); } catch(e) { return null; } })() : a.results;
        const apiData = typeof a.api_data === "string" ? (() => { try { return JSON.parse(a.api_data); } catch(e) { return null; } })() : a.api_data;
        const tu = results?.tokenUsage || apiData?.tokenUsage || apiData?.results?.tokenUsage;
        if (!tu) return sum;
        let c = 0;
        c += (((tu.openai?.input || 0) + (tu.openaiSearch?.input || 0)) / 1000000 * 2.50) + (((tu.openai?.output || 0) + (tu.openaiSearch?.output || 0)) / 1000000 * 10);
        c += ((tu.gemini?.input || 0) / 1000000 * 0.10) + ((tu.gemini?.output || 0) / 1000000 * 0.40);
        c += ((tu.perplexity?.input || 0) / 1000000 * 3) + ((tu.perplexity?.output || 0) / 1000000 * 15);
        c += ((tu.claude?.input || 0) / 1000000 * 1) + ((tu.claude?.output || 0) / 1000000 * 5);
        c += (tu.serpapi?.searches || 0) * 0.015;
        return sum + c;
      }, 0);
      const dailyCostRate = recentCount > 0 ? recentCosts / 7 : 0;
      const avgCostRecent = recentCount > 0 ? recentCosts / recentCount : 0;
      const projection = {
        dailyAuditRate: Math.round(dailyRate * 10) / 10,
        projectedMonthlyAudits: Math.round(dailyRate * 30),
        projectedMonthlyCost: Math.round(dailyCostRate * 30 * 100) / 100,
        avgCostPerAuditRecent: Math.round(avgCostRecent * 100) / 100
      };

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
          claude: Math.round(costs.claude * 100) / 100,
          serpapi: Math.round(costs.serpapi * 100) / 100,
          total: Math.round(costs.total * 100) / 100
        },
        avgCostPerAudit: (audits || []).length > 0 ? Math.round((costs.total / (audits || []).length) * 100) / 100 : 0,
        auditLog,
        projection
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

    } else if (action === "health") {
      // Ping each service to check availability
      const checks = {};
      const ping = async (name, fn) => {
        const start = Date.now();
        try { await fn(); checks[name] = { ok: true, ms: Date.now() - start }; }
        catch (e) { checks[name] = { ok: false, ms: Date.now() - start, error: e.message || "Failed" }; }
      };

      await Promise.all([
        ping("openai", async () => {
          const key = process.env.OPENAI_API_KEY;
          if (!key) throw new Error("Key not configured");
          const r = await fetch("https://api.openai.com/v1/models", { headers: { "Authorization": "Bearer " + key }, signal: AbortSignal.timeout(8000) });
          if (!r.ok) throw new Error("HTTP " + r.status);
        }),
        ping("gemini", async () => {
          const key = process.env.GOOGLE_AI_KEY;
          if (!key) throw new Error("Key not configured");
          const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + key, { signal: AbortSignal.timeout(8000) });
          if (!r.ok) throw new Error("HTTP " + r.status);
        }),
        ping("perplexity", async () => {
          const key = process.env.PERPLEXITY_API_KEY;
          if (!key) throw new Error("Key not configured");
          const r = await fetch("https://api.perplexity.ai/chat/completions", { method: "POST", headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify({ model: "sonar", messages: [{ role: "user", content: "ping" }] }), signal: AbortSignal.timeout(10000) });
          if (!r.ok && r.status !== 429) throw new Error("HTTP " + r.status);
        }),
        ping("claude", async () => {
          const key = process.env.ANTHROPIC_API_KEY;
          if (!key) throw new Error("Key not configured");
          const r = await fetch("https://api.anthropic.com/v1/models", { headers: { "x-api-key": key, "anthropic-version": "2023-06-01" }, signal: AbortSignal.timeout(8000) });
          if (!r.ok) throw new Error("HTTP " + r.status);
        }),
        ping("serpapi", async () => {
          const key = process.env.SERPAPI_API_KEY;
          if (!key) throw new Error("Key not configured");
          const r = await fetch("https://serpapi.com/account.json?api_key=" + key, { signal: AbortSignal.timeout(8000) });
          if (!r.ok) throw new Error("HTTP " + r.status);
        }),
        ping("supabase", async () => {
          const { data, error } = await supabase.from("projects").select("id", { count: "exact", head: true });
          if (error) throw error;
        })
      ]);

      return res.json({ services: checks, checkedAt: new Date().toISOString() });

    } else if (action === "deleteUser") {
      const targetUserId = req.body.userId;
      if (!targetUserId) return res.status(400).json({ error: "userId required" });
      if (targetUserId === user.id) return res.status(400).json({ error: "Cannot delete your own account" });

      try {
        await supabase.from("audits").delete().eq("user_id", targetUserId);

        const { data: userProjects } = await supabase.from("projects").select("id").eq("user_id", targetUserId);
        if (userProjects && userProjects.length > 0) {
          const projectIds = userProjects.map(p => p.id);
          await supabase.from("generated_content").delete().in("project_id", projectIds);
          await supabase.from("brand_playbook").delete().in("project_id", projectIds);
        }

        await supabase.from("projects").delete().eq("user_id", targetUserId);

        const { error: authError } = await supabase.auth.admin.deleteUser(targetUserId);
        if (authError) throw authError;

        return res.json({ success: true, message: "User and all associated data deleted" });
      } catch (err) {
        console.error("Delete user error:", err);
        return res.status(500).json({ error: "Failed to delete user: " + err.message });
      }

    } else {
      return res.status(400).json({ error: "Unknown action. Use: overview, users, health, deleteUser" });
    }
  } catch (err) {
    console.error("Admin API error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
