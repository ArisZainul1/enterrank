// /api/claude.js — Vercel Serverless Function
// Proxies requests to the Anthropic Claude API (claude-haiku-4-5)

import verifyAuth from "./_auth.js";
import rateLimit from "./_rateLimit.js";

export default async function handler(req, res) {
  const allowedOrigins = ["https://enterrank.com", "https://www.enterrank.com", "https://enterrank.vercel.app", "http://localhost:5173", "http://localhost:3000"];
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await verifyAuth(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!rateLimit(user.id)) return res.status(429).json({ error: "Rate limit exceeded" });

  try {
    const { prompt, temperature } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        temperature: temperature !== undefined ? temperature : 0,
        messages: [{ role: "user", content: prompt }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Claude API error:', response.status, errText);
      return res.status(response.status).json({ error: 'Claude API error: ' + response.status });
    }

    const data = await response.json();

    const text = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("\n");
    const usage = data.usage || {};

    return res.status(200).json({
      text: text,
      usage: {
        input_tokens: usage.input_tokens || 0,
        output_tokens: usage.output_tokens || 0
      }
    });

  } catch (e) {
    console.error('Claude handler error:', e);
    return res.status(500).json({ error: e.name === 'AbortError' ? 'Request timed out' : (e.message || 'Internal error') });
  }
}
