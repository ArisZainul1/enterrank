// /api/openai-search.js — Vercel Serverless Function
// Uses the OpenAI Responses API with web search tool for grounded responses

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: "OPENAI_API_KEY not configured" });

  try {
    const { query, region } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    // Map region to country code for location bias
    const regionMap = {
      "malaysia": "MY", "united states": "US", "usa": "US", "uk": "GB",
      "united kingdom": "GB", "uae": "AE", "singapore": "SG", "australia": "AU",
      "india": "IN", "indonesia": "ID", "philippines": "PH", "thailand": "TH",
      "japan": "JP", "south korea": "KR", "germany": "DE", "france": "FR",
      "canada": "CA", "brazil": "BR", "mexico": "MX", "saudi arabia": "SA",
      "hong kong": "HK", "taiwan": "TW", "vietnam": "VN", "new zealand": "NZ",
      "netherlands": "NL", "spain": "ES", "italy": "IT", "sweden": "SE",
      "norway": "NO", "denmark": "DK", "switzerland": "CH", "ireland": "IE",
      "south africa": "ZA", "nigeria": "NG", "egypt": "EG", "kenya": "KE",
      "pakistan": "PK", "bangladesh": "BD", "sri lanka": "LK", "qatar": "QA",
      "bahrain": "BH", "kuwait": "KW", "oman": "OM", "jordan": "JO",
      "china": "CN", "russia": "RU", "turkey": "TR", "poland": "PL",
      "portugal": "PT", "greece": "GR", "czech republic": "CZ", "romania": "RO",
      "chile": "CL", "colombia": "CO", "argentina": "AR", "peru": "PE",
    };
    const regionLower = (region || "").toLowerCase();
    const countryCode = regionMap[regionLower] || Object.entries(regionMap).find(([k]) => regionLower.includes(k))?.[1] || null;

    const body = {
      model: "gpt-4o",
      input: query,
      tools: [
        {
          type: "web_search",
          ...(countryCode ? { user_location: { type: "approximate", country: countryCode } } : {})
        }
      ],
      temperature: 0.2,
    };

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeout);
    const data = await response.json();

    if (data.error) return res.status(500).json({ error: data.error.message || "API error" });

    // Extract the text response and citations from the output array
    let responseText = "";
    let citations = [];

    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === "message" && item.content) {
          for (const block of item.content) {
            if (block.type === "output_text") {
              responseText += block.text || "";
              if (block.annotations) {
                for (const ann of block.annotations) {
                  if (ann.type === "url_citation" && ann.url) {
                    citations.push({ url: ann.url, title: ann.title || "" });
                  }
                }
              }
            }
          }
        }
      }
    }

    return res.status(200).json({
      result: responseText,
      citations: citations
    });

  } catch (e) {
    if (e.name === "AbortError") return res.status(200).json({ result: "", citations: [], error: "Timeout" });
    return res.status(500).json({ error: e.message });
  }
}
