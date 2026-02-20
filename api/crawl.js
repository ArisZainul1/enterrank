// /api/crawl.js — Vercel Serverless Function
// Crawls a website using Jina AI Reader + raw HTML for deep AEO analysis

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { url } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const baseUrl = url.startsWith("http") ? url : "https://" + url;
    const domain = new URL(baseUrl).hostname;

    // Helper: fetch via Jina Reader (returns clean markdown + metadata)
    async function jinaFetch(targetUrl, timeoutMs = 12000) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const r = await fetch("https://r.jina.ai/" + targetUrl, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.JINA_API_KEY}`,
            "X-Timeout": "10",
            "X-With-Links-Summary": "true",
            "X-With-Images-Summary": "true"
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (!r.ok) return null;
        const data = await r.json();
        return data.data || null;
      } catch (e) {
        clearTimeout(timeout);
        return null;
      }
    }

    // Helper: fetch raw HTML for technical signal extraction
    async function rawFetch(targetUrl, timeoutMs = 8000) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const r = await fetch(targetUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; EnterRankBot/1.0)" },
          signal: controller.signal,
          redirect: "follow"
        });
        clearTimeout(timeout);
        if (!r.ok) return "";
        const text = await r.text();
        return text.slice(0, 200000);
      } catch (e) {
        clearTimeout(timeout);
        return "";
      }
    }

    // ── 1. Fetch homepage via both Jina (content) and raw (technical signals) ──
    const [homepageJina, homepageRaw] = await Promise.all([
      jinaFetch(baseUrl),
      rawFetch(baseUrl)
    ]);

    // ── 2. Extract technical signals from raw HTML ──
    function extractTechnicalSignals(html) {
      if (!html) return {};
      const h = html;
      const lh = h.toLowerCase();

      // Schema/JSON-LD
      const schemaMatches = h.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
      const schemas = [];
      schemaMatches.forEach(m => {
        try {
          const json = m.replace(/<\/?script[^>]*>/gi, "").trim();
          const parsed = JSON.parse(json);
          const types = Array.isArray(parsed) ? parsed.map(p => p["@type"]).filter(Boolean) : [parsed["@type"]].filter(Boolean);
          types.forEach(t => { if (!schemas.includes(t)) schemas.push(t); });
        } catch (e) {}
      });

      // Meta tags
      const metaDesc = (h.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i) || [])[1] || "";
      const ogTitle = (h.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)/i) || [])[1] || "";
      const ogDesc = (h.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)/i) || [])[1] || "";
      const twitterCard = (h.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)/i) || [])[1] || "";

      // Heading structure
      const h1s = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []).map(m => m.replace(/<[^>]*>/g, "").trim()).filter(Boolean);
      const h2s = (h.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).map(m => m.replace(/<[^>]*>/g, "").trim()).filter(Boolean);
      const h3s = (h.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || []).map(m => m.replace(/<[^>]*>/g, "").trim()).filter(Boolean);

      // Content signals
      const bodyText = h.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      const wordCount = bodyText.split(/\s+/).length;

      // Links
      const internalLinks = (h.match(new RegExp('href=["\']/[^"\']*["\']', 'gi')) || []).length;
      const externalLinks = (h.match(/href=["']https?:\/\/[^"']*/gi) || []).filter(l => !l.includes(domain)).length;

      // Specific AEO signals
      const hasFAQSchema = schemas.some(s => s === "FAQPage" || s === "Question");
      const hasArticleSchema = schemas.some(s => ["Article", "NewsArticle", "BlogPosting", "TechArticle"].includes(s));
      const hasProductSchema = schemas.some(s => s === "Product");
      const hasOrgSchema = schemas.some(s => ["Organization", "LocalBusiness", "Corporation"].includes(s));
      const hasHowToSchema = schemas.some(s => s === "HowTo");
      const hasBreadcrumb = schemas.some(s => s === "BreadcrumbList") || lh.includes("breadcrumb");
      const hasSpeakable = lh.includes('"speakable"') || lh.includes("speakable");
      const hasVideo = lh.includes("<video") || lh.includes("youtube.com/embed") || lh.includes("vimeo.com") || schemas.some(s => s === "VideoObject");
      const hasAuthorInfo = lh.includes("author") && (lh.includes("schema.org") || lh.includes("rel=\"author\"") || lh.includes("class=\"author"));
      const hasTrustSignals = lh.includes("award") || lh.includes("certified") || lh.includes("partnership") || lh.includes("accredit") || lh.includes("iso ");
      const hasTestimonials = lh.includes("testimonial") || lh.includes("review") || lh.includes("rating") || lh.includes("stars");
      const hasOpenGraph = !!ogTitle || !!ogDesc;
      const hasTwitterCard = !!twitterCard;
      const tableCount = (h.match(/<table/gi) || []).length;
      const listCount = (h.match(/<(?:ul|ol)/gi) || []).length;
      const imageCount = (h.match(/<img/gi) || []).length;
      const hasCanonical = lh.includes('rel="canonical"') || lh.includes("rel='canonical'");
      const hasHreflang = lh.includes("hreflang");
      const hasSitemap = lh.includes("sitemap");
      const hasRobotsMeta = lh.includes('name="robots"');

      return {
        schemas, metaDescription: metaDesc, ogTitle, ogDesc,
        h1s, h2s, h3s, h1Count: h1s.length, h2Count: h2s.length, h3Count: h3s.length,
        wordCount, internalLinks, externalLinks, imageCount, tableCount, listCount,
        hasFAQSchema, hasArticleSchema, hasProductSchema, hasOrgSchema, hasHowToSchema,
        hasBreadcrumb, hasSpeakable, hasVideo, hasAuthorInfo, hasTrustSignals,
        hasTestimonials, hasOpenGraph, hasTwitterCard, hasCanonical, hasHreflang, hasSitemap, hasRobotsMeta
      };
    }

    const technicalSignals = extractTechnicalSignals(homepageRaw);

    // ── 3. Discover sub-pages from homepage links ──
    const subPagePaths = ["/blog", "/about", "/faq", "/resources", "/help", "/support", "/knowledge", "/learn", "/insights", "/news", "/articles", "/guides"];
    let discoveredSubPages = [];

    if (homepageJina && homepageJina.links) {
      const allLinks = Object.values(homepageJina.links || {});
      discoveredSubPages = allLinks
        .filter(link => {
          try {
            const u = new URL(link, baseUrl);
            if (u.hostname !== domain) return false;
            const path = u.pathname.toLowerCase();
            return subPagePaths.some(sp => path.includes(sp));
          } catch (e) { return false; }
        })
        .slice(0, 3);
    }

    // If Jina didn't find sub-pages, try common paths
    if (discoveredSubPages.length === 0) {
      discoveredSubPages = ["/blog", "/about", "/faq"]
        .map(p => baseUrl.replace(/\/+$/, "") + p);
    }

    // ── 4. Fetch sub-pages via Jina (content only, parallel) ──
    const subPageResults = await Promise.all(
      discoveredSubPages.slice(0, 3).map(async (spUrl) => {
        const data = await jinaFetch(spUrl, 10000);
        if (!data || !data.content || data.content.length < 100) return null;
        return {
          url: spUrl,
          title: data.title || "",
          wordCount: (data.content || "").split(/\s+/).length,
          content: (data.content || "").slice(0, 3000)
        };
      })
    );

    const subPages = subPageResults.filter(Boolean);

    // ── 5. Build comprehensive crawl result ──
    const result = {
      url: baseUrl,
      domain,
      title: homepageJina?.title || technicalSignals.h1s?.[0] || "",
      description: technicalSignals.metaDescription || homepageJina?.description || "",

      // Homepage content from Jina (clean markdown, capped for token limits)
      homepageContent: (homepageJina?.content || "").slice(0, 5000),
      homepageWordCount: technicalSignals.wordCount || 0,

      // Sub-pages
      subPages,
      totalPagesAnalyzed: 1 + subPages.length,
      totalWordCount: technicalSignals.wordCount + subPages.reduce((a, sp) => a + sp.wordCount, 0),

      // Technical signals (from raw HTML)
      ...technicalSignals,

      // Content structure summary
      contentStructure: {
        hasH1: technicalSignals.h1Count > 0,
        h1Count: technicalSignals.h1Count,
        h2Count: technicalSignals.h2Count,
        h3Count: technicalSignals.h3Count,
        hasProperHierarchy: technicalSignals.h1Count > 0 && technicalSignals.h2Count > 0,
        imageCount: technicalSignals.imageCount,
        tableCount: technicalSignals.tableCount,
        listCount: technicalSignals.listCount
      },

      // AEO readiness signals
      aeoSignals: {
        schemaMarkup: technicalSignals.schemas.length > 0,
        schemaTypes: technicalSignals.schemas,
        faqSchema: technicalSignals.hasFAQSchema,
        articleSchema: technicalSignals.hasArticleSchema,
        productSchema: technicalSignals.hasProductSchema,
        orgSchema: technicalSignals.hasOrgSchema,
        howToSchema: technicalSignals.hasHowToSchema,
        breadcrumbs: technicalSignals.hasBreadcrumb,
        speakable: technicalSignals.hasSpeakable,
        video: technicalSignals.hasVideo,
        authorInfo: technicalSignals.hasAuthorInfo,
        trustSignals: technicalSignals.hasTrustSignals,
        testimonials: technicalSignals.hasTestimonials,
        openGraph: technicalSignals.hasOpenGraph,
        twitterCard: technicalSignals.hasTwitterCard,
        canonical: technicalSignals.hasCanonical,
        hreflang: technicalSignals.hasHreflang,
        contentDepth: technicalSignals.wordCount >= 1000,
        internalLinking: technicalSignals.internalLinks >= 20,
        hasBlog: subPages.some(sp => sp.url.toLowerCase().includes("blog")),
        hasFaqPage: subPages.some(sp => sp.url.toLowerCase().includes("faq") || sp.url.toLowerCase().includes("help")),
      }
    };

    return res.status(200).json(result);

  } catch (e) {
    return res.status(200).json({ error: e.message, url: req.body?.url || "" });
  }
}
