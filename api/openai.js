// /api/openai.js — Vercel Serverless Function
// Proxies requests to the OpenAI API

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

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

  try {
    const { prompt, systemPrompt, model } = req.body;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 58000); // 58s safety (Vercel 60s limit)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        max_tokens: 4000,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'OpenAI API error' });
    }

    const text = data.choices?.[0]?.message?.content || '';
    const remaining = response.headers.get("x-ratelimit-remaining-requests");
    const resetMs = response.headers.get("x-ratelimit-reset-requests");
    return res.status(200).json({ text, rateLimit: { remaining, resetMs } });
  } catch (error) {
    console.error('OpenAI proxy error:', error);
    return res.status(500).json({ error: error.name === 'AbortError' ? 'Request timed out' : 'Internal server error' });
  }
}
