// /api/crawl.js — Vercel Serverless Function
// Crawls a website and extracts AEO-relevant signals

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'url is required' });

    // Normalize URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    // Crawl the main page
    const mainPage = await crawlPage(targetUrl);
    // Use the final URL (after redirects) as base for sub-page resolution
    const baseUrl = (mainPage && mainPage.finalUrl) || targetUrl;

    // Try to find and crawl key sub-pages
    const subPages = {};
    const possiblePaths = {
      blog: ['/blog', '/insights', '/resources', '/news', '/articles', '/knowledge'],
      about: ['/about', '/about-us', '/company', '/who-we-are'],
      products: ['/products', '/services', '/solutions', '/offerings', '/what-we-do'],
      faq: ['/faq', '/faqs', '/help', '/support', '/knowledge-base'],
    };

    // Check sub-pages in parallel (2 per category, pick first that works)
    const subChecks = [];
    for (const [category, paths] of Object.entries(possiblePaths)) {
      subChecks.push(
        (async () => {
          for (const path of paths) {
            try {
              const subUrl = new URL(path, baseUrl).toString();
              const result = await crawlPage(subUrl, true); // light crawl
              if (result && !result.error && result.statusCode === 200) {
                subPages[category] = { url: subUrl, ...result };
                return;
              }
            } catch (e) { /* skip */ }
          }
          subPages[category] = null;
        })()
      );
    }
    await Promise.all(subChecks);

    return res.status(200).json({
      url: targetUrl,
      mainPage,
      subPages,
      crawledAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Crawl error:', error);
    return res.status(500).json({ error: 'Crawl failed: ' + error.message });
  }
}

async function crawlPage(url, light = false) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);
    const finalUrl = response.url || url;

    if (!response.ok) {
      return { error: `HTTP ${response.status}`, statusCode: response.status };
    }

    const html = await response.text();
    const statusCode = response.status;

    // === EXTRACT AEO SIGNALS ===

    // 1. Title & Meta
    const title = extractBetween(html, '<title', '</title>') || '';
    const metaDesc = extractMeta(html, 'description');
    const metaKeywords = extractMeta(html, 'keywords');
    const canonical = extractAttr(html, 'link[rel="canonical"]', 'href') || extractAttr(html, 'link rel="canonical"', 'href');
    const ogTitle = extractMeta(html, 'og:title', 'property');
    const ogDesc = extractMeta(html, 'og:description', 'property');

    // 2. Schema / JSON-LD
    const schemas = [];
    const jsonldPattern = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = jsonldPattern.exec(html)) !== null) {
      try {
        const parsed = JSON.parse(match[1].trim());
        const types = Array.isArray(parsed) ? parsed.map(p => p['@type']).filter(Boolean) : [parsed['@type']].filter(Boolean);
        schemas.push(...types);
      } catch (e) { /* malformed JSON-LD */ }
    }

    // 3. Heading structure
    const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map(stripTags).filter(Boolean).slice(0, 5);
    const h2s = extractAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi).map(stripTags).filter(Boolean).slice(0, 10);
    const h3Count = (html.match(/<h3/gi) || []).length;

    // 4. Content signals
    const bodyText = stripTags(extractBetween(html, '<body', '</body>') || '');
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

    // 5. Links
    const internalLinks = (html.match(/<a[^>]*href\s*=\s*["'][^"']*["']/gi) || []).length;
    const hasHreflang = /<link[^>]*hreflang/i.test(html);

    // 6. Technical signals
    const hasRobotsTxt = null; // Would need separate fetch
    const hasSitemap = /<loc>/i.test(html) || html.includes('sitemap');
    const hasAMP = html.includes('amphtml') || html.includes('amp-');
    const hasOpenGraph = /<meta[^>]*property\s*=\s*["']og:/i.test(html);
    const hasTwitterCard = /<meta[^>]*name\s*=\s*["']twitter:/i.test(html);
    const hasFAQMarkup = schemas.includes('FAQPage') || html.includes('FAQPage');
    const hasArticleMarkup = schemas.includes('Article') || schemas.includes('BlogPosting') || schemas.includes('NewsArticle');

    // 7. E-E-A-T signals
    const hasAuthorInfo = /author|byline|written.?by/i.test(html);
    const hasDates = /published|updated|modified|datePublished|dateModified/i.test(html);
    const hasTrustSignals = /certified|accredited|award|partner|iso\s?\d/i.test(html);
    const hasTestimonials = /testimonial|review|client.?say|customer.?say/i.test(html);

    // 8. Content depth
    const hasVideo = /<video|youtube\.com|vimeo\.com|wistia/i.test(html);
    const hasImages = (html.match(/<img/gi) || []).length;
    const hasTables = (html.match(/<table/gi) || []).length;
    const hasLists = (html.match(/<ul|<ol/gi) || []).length;

    if (light) {
      return { statusCode, title: title.slice(0, 100), schemas, wordCount, h1s: h1s.slice(0, 2), finalUrl };
    }

    return {
      finalUrl,
      statusCode,
      title: title.slice(0, 200),
      metaDescription: (metaDesc || '').slice(0, 300),
      metaKeywords: (metaKeywords || '').slice(0, 200),
      ogTitle: (ogTitle || '').slice(0, 200),
      ogDescription: (ogDesc || '').slice(0, 300),
      hasOpenGraph,
      hasTwitterCard,
      schemas,
      headings: { h1s, h2s, h3Count },
      wordCount,
      internalLinks,
      hasHreflang,
      hasFAQMarkup,
      hasArticleMarkup,
      hasAuthorInfo,
      hasDates,
      hasTrustSignals,
      hasTestimonials,
      hasVideo,
      imageCount: hasImages,
      tableCount: hasTables,
      listCount: hasLists,
    };
  } catch (error) {
    return { error: error.message, statusCode: 0 };
  }
}

// Helpers
function extractBetween(html, startTag, endTag) {
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) return null;
  const contentStart = html.indexOf('>', startIdx) + 1;
  const endIdx = html.indexOf(endTag, contentStart);
  if (endIdx === -1) return null;
  return html.slice(contentStart, endIdx);
}

function extractMeta(html, name, attr = 'name') {
  const pattern = new RegExp(`<meta[^>]*${attr}\\s*=\\s*["']${name}["'][^>]*content\\s*=\\s*["']([^"']*)["']`, 'i');
  const match = html.match(pattern);
  if (match) return match[1];
  // Try reversed order
  const pattern2 = new RegExp(`<meta[^>]*content\\s*=\\s*["']([^"']*)["'][^>]*${attr}\\s*=\\s*["']${name}["']`, 'i');
  const match2 = html.match(pattern2);
  return match2 ? match2[1] : null;
}

function extractAttr(html, selector, attr) {
  const pattern = new RegExp(`<${selector}[^>]*${attr}\\s*=\\s*["']([^"']*)["']`, 'i');
  const match = html.match(pattern);
  return match ? match[1] : null;
}

function extractAll(html, pattern) {
  const matches = [];
  let m;
  while ((m = pattern.exec(html)) !== null) matches.push(m[1]);
  return matches;
}

function stripTags(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
}
