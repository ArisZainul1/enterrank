// /api/claude.js — Vercel Serverless Function
// Proxies requests to the Anthropic API so API keys stay server-side

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in environment variables' });
  }

  try {
    const { prompt, systemPrompt, useWebSearch } = req.body;

    const body = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: useWebSearch ? 4000 : 1000,
      system: systemPrompt || 'You are an expert AEO (Answer Engine Optimization) analyst.',
      messages: [{ role: 'user', content: prompt }],
    };

    if (useWebSearch) {
      body.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    // Extract text from response
    const text = data.content
      ?.map(b => (b.type === 'text' ? b.text : ''))
      .filter(Boolean)
      .join('\n') || '';

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
