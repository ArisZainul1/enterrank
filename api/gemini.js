// /api/gemini.js — Vercel Serverless Function
// Proxies requests to the Google Gemini API (gemini-3-flash-preview with Google Search grounding)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
  if (!GOOGLE_AI_KEY) return res.status(500).json({ error: 'GOOGLE_AI_KEY not configured' });

  try {
    const { prompt, systemPrompt } = req.body;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const requestBody = {
      systemInstruction: { parts: [{ text: systemPrompt || 'You are a helpful assistant.' }] },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4000,
        responseMimeType: 'text/plain',
      },
      tools: [{ google_search: {} }],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GOOGLE_AI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);
    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Gemini API error' });
    }

    // Handle safety blocks — return empty text instead of error
    const finishReason = data.candidates?.[0]?.finishReason;
    if (finishReason === "SAFETY" || data.promptFeedback?.blockReason) {
      return res.status(200).json({ text: "", citations: [], blocked: true });
    }

    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';

    // Extract grounding citations from groundingMetadata
    const citations = [];
    try {
      const metadata = data.candidates?.[0]?.groundingMetadata;
      if (metadata && metadata.groundingChunks) {
        metadata.groundingChunks.forEach(chunk => {
          if (chunk.web && chunk.web.uri) {
            citations.push({ url: chunk.web.uri, title: chunk.web.title || "" });
          }
        });
      }
    } catch(e) {
      // Grounding metadata not available — that's fine
    }

    return res.status(200).json({ text, citations });
  } catch (error) {
    console.error('Gemini proxy error:', error);
    return res.status(500).json({ error: error.name === 'AbortError' ? 'Request timed out' : 'Internal server error' });
  }
}
