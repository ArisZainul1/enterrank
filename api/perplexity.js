// /api/perplexity.js — Vercel Serverless Function
// Proxies requests to the Perplexity API (sonar-pro with web search citations)

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
    const { prompt, systemPrompt, temperature } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'PERPLEXITY_API_KEY not configured' });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        ...(temperature !== undefined ? { temperature } : {}),
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Perplexity API error:', response.status, errText);
      return res.status(response.status).json({ error: 'Perplexity API error: ' + response.status, result: '', citations: [] });
    }

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || '';

    // Perplexity returns citations as a top-level array of URL strings
    const rawCitations = data.citations || [];
    const citations = rawCitations.map(url => ({
      url: typeof url === 'string' ? url : (url.url || ''),
      title: typeof url === 'string' ? '' : (url.title || '')
    }));

    return res.status(200).json({
      result: text,
      citations: citations,
      usage: data.usage || null
    });

  } catch (e) {
    console.error('Perplexity handler error:', e);
    return res.status(500).json({ error: e.name === 'AbortError' ? 'Request timed out' : (e.message || 'Internal error'), result: '', citations: [] });
  }
}
