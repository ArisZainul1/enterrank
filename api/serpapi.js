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
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const user = await verifyAuth(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!rateLimit(user.id)) return res.status(429).json({ error: "Rate limit exceeded" });

  try {
    const { query, region } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!query) return res.status(400).json({ error: "No query provided" });

    const apiKey = process.env.SERPAPI_API_KEY;
    if (!apiKey) return res.status(200).json({ error: "SERPAPI_API_KEY not configured", result: "", citations: [] });

    // Map region to Google country code
    const regionToGl = {
      "malaysia": "my", "singapore": "sg", "indonesia": "id", "india": "in",
      "united states": "us", "usa": "us", "united kingdom": "uk", "uk": "uk",
      "australia": "au", "germany": "de", "france": "fr", "japan": "jp",
      "south korea": "kr", "brazil": "br", "canada": "ca", "uae": "ae",
      "saudi arabia": "sa", "philippines": "ph", "thailand": "th", "vietnam": "vn",
      "china": "cn", "mexico": "mx", "spain": "es", "italy": "it",
      "netherlands": "nl", "sweden": "se", "norway": "no", "denmark": "dk",
      "finland": "fi", "poland": "pl", "turkey": "tr", "egypt": "eg",
      "south africa": "za", "nigeria": "ng", "kenya": "ke", "new zealand": "nz",
      "ireland": "ie", "portugal": "pt", "belgium": "be", "switzerland": "ch",
      "austria": "at", "czech republic": "cz", "romania": "ro", "taiwan": "tw",
      "hong kong": "hk"
    };

    let gl = "us";
    if (region) {
      const regionLower = region.toLowerCase();
      for (const [key, code] of Object.entries(regionToGl)) {
        if (regionLower.includes(key) || key.includes(regionLower)) {
          gl = code;
          break;
        }
      }
    }

    const params = new URLSearchParams({
      engine: "google_ai_mode",
      q: query,
      gl: gl,
      hl: "en",
      api_key: apiKey
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const response = await fetch("https://serpapi.com/search?" + params.toString(), {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      console.error("SerpApi error:", response.status, errText);
      return res.status(200).json({ error: "SerpApi error: " + response.status, result: "", citations: [] });
    }

    const data = await response.json();

    // Extract text from text_blocks
    let text = "";
    if (data.text_blocks && Array.isArray(data.text_blocks)) {
      text = data.text_blocks.map(block => {
        if (block.snippet) return block.snippet;
        if (block.list && Array.isArray(block.list)) {
          return block.list.map(item => {
            let itemText = item.title ? item.title + ": " : "";
            itemText += item.snippet || "";
            return itemText;
          }).join(" ");
        }
        return "";
      }).filter(t => t).join(" ");
    }

    // Extract citations from references
    const citations = [];
    if (data.references && Array.isArray(data.references)) {
      data.references.forEach(ref => {
        if (ref.link) {
          citations.push({
            url: ref.link,
            title: ref.title || ref.source || ""
          });
        }
      });
    }

    // Also check quick_results for additional citations
    if (data.quick_results && Array.isArray(data.quick_results)) {
      data.quick_results.forEach(qr => {
        if (qr.link && !citations.find(c => c.url === qr.link)) {
          citations.push({
            url: qr.link,
            title: qr.title || qr.source || ""
          });
        }
      });
    }

    return res.status(200).json({
      result: text,
      citations: citations,
      error: data.error || null
    });

  } catch (e) {
    console.error("SerpApi handler error:", e);
    return res.status(200).json({ error: e.message || "Internal error", result: "", citations: [] });
  }
}
