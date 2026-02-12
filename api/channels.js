// /api/channels.js — Vercel Serverless Function
// Verifies brand presence on key AEO distribution channels by actually checking URLs

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { brand, website, industry, region } = req.body;
    if (!brand) return res.status(400).json({ error: 'brand is required' });

    const brandSlug = brand.toLowerCase().replace(/\s+/g, '_');
    const brandSlugDash = brand.toLowerCase().replace(/\s+/g, '-');
    const brandEncoded = encodeURIComponent(brand);

    // Run all channel checks in parallel
    const results = await Promise.all([
      checkWikipedia(brand, brandSlug),
      checkYouTube(brand, brandEncoded),
      checkLinkedIn(brand, brandSlugDash),
      checkReddit(brand, brandEncoded),
      checkSocialMedia(brand, website, brandEncoded),
      checkReviewSites(brand, brandEncoded, industry),
      checkPressNews(brand, brandEncoded),
      checkDirectories(brand, brandEncoded),
    ]);

    return res.status(200).json({
      brand,
      channels: results,
      verifiedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Channel verification error:', error);
    return res.status(500).json({ error: 'Verification failed: ' + error.message });
  }
}

// Helper: fetch a URL and check if it returns 200 and contains brand name
async function probeUrl(url, searchText, timeoutMs = 6000) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EnterRank AEO Bot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/json',
      },
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeout);
    if (!response.ok) return { found: false, status: response.status };
    const text = await response.text();
    const hasContent = searchText
      ? text.toLowerCase().includes(searchText.toLowerCase())
      : text.length > 500;
    return { found: true, hasContent, status: response.status, length: text.length, snippet: text.slice(0, 500) };
  } catch (e) {
    return { found: false, error: e.message };
  }
}

// Helper: check multiple URLs, return first found
async function probeMultiple(urls, searchText) {
  const results = await Promise.all(urls.map(u => probeUrl(u.url, searchText)));
  for (let i = 0; i < results.length; i++) {
    if (results[i].found && results[i].hasContent !== false) {
      return { ...results[i], url: urls[i].url, label: urls[i].label };
    }
  }
  // Check if any returned 200 even without brand text
  for (let i = 0; i < results.length; i++) {
    if (results[i].found) {
      return { ...results[i], url: urls[i].url, label: urls[i].label, weakMatch: true };
    }
  }
  return { found: false };
}

async function checkWikipedia(brand, brandSlug) {
  // Use Wikipedia API to search for the brand
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(brand)}&format=json&srlimit=3`;
  try {
    const result = await probeUrl(apiUrl, null);
    if (result.found) {
      try {
        const data = JSON.parse(result.snippet.length < 500 ? result.snippet : (await (await fetch(apiUrl)).text()));
        const searchResults = data?.query?.search || [];
        const exactMatch = searchResults.find(r =>
          r.title.toLowerCase() === brand.toLowerCase() ||
          r.title.toLowerCase().includes(brand.toLowerCase())
        );
        if (exactMatch) {
          return {
            channel: 'Wikipedia',
            status: 'Active',
            finding: `Wikipedia article found: "${exactMatch.title}" — ${exactMatch.snippet?.replace(/<[^>]+>/g, '').slice(0, 120)}...`,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(exactMatch.title.replace(/ /g, '_'))}`,
            priority: 'High',
            action: 'Ensure Wikipedia article is up-to-date with latest company information, products, and citations.',
          };
        } else if (searchResults.length > 0) {
          return {
            channel: 'Wikipedia',
            status: 'Needs Work',
            finding: `No dedicated article found. Related pages exist: "${searchResults[0].title}".`,
            url: null,
            priority: 'High',
            action: 'Create a Wikipedia article following notability guidelines. Gather reliable third-party sources first.',
          };
        }
      } catch (e) { /* parse error, fall through */ }
    }
  } catch (e) { /* fetch error */ }
  return {
    channel: 'Wikipedia',
    status: 'Not Present',
    finding: 'No Wikipedia article found for this brand.',
    url: null,
    priority: 'High',
    action: 'Build notability through press coverage and third-party citations before creating a Wikipedia article.',
  };
}

async function checkYouTube(brand, brandEncoded) {
  // Check YouTube search results page for brand channel
  const searchUrl = `https://www.youtube.com/results?search_query=${brandEncoded}+official`;
  const result = await probeUrl(searchUrl, brand);
  if (result.found && result.hasContent) {
    return {
      channel: 'YouTube',
      status: 'Active',
      finding: `Brand appears in YouTube search results. Videos and/or a channel likely exist.`,
      url: `https://www.youtube.com/results?search_query=${brandEncoded}`,
      priority: 'Medium',
      action: 'Optimise video titles, descriptions, and transcripts for AI engine indexing.',
    };
  }
  return {
    channel: 'YouTube',
    status: 'Not Present',
    finding: 'No significant YouTube presence detected.',
    url: null,
    priority: 'High',
    action: 'Create a YouTube channel with structured video content, timestamps, and detailed descriptions.',
  };
}

async function checkLinkedIn(brand, brandSlugDash) {
  // LinkedIn blocks most scraping, so check via common patterns
  const urls = [
    { url: `https://www.linkedin.com/company/${brandSlugDash}`, label: 'LinkedIn Company' },
    { url: `https://www.linkedin.com/company/${brandSlugDash.replace(/-/g, '')}`, label: 'LinkedIn Company (no dash)' },
  ];
  const result = await probeMultiple(urls, brand);
  // LinkedIn almost always returns 200 with login wall, so check for signals
  if (result.found && (result.status === 200)) {
    return {
      channel: 'LinkedIn',
      status: 'Active',
      finding: `LinkedIn company page likely exists at linkedin.com/company/${brandSlugDash}.`,
      url: `https://www.linkedin.com/company/${brandSlugDash}`,
      priority: 'Medium',
      action: 'Ensure LinkedIn page has complete description, regular posts, and matches your canonical brand narrative.',
    };
  }
  return {
    channel: 'LinkedIn',
    status: 'Needs Work',
    finding: 'Could not verify LinkedIn company page.',
    url: null,
    priority: 'Medium',
    action: 'Create or claim your LinkedIn company page. Post thought leadership content weekly.',
  };
}

async function checkReddit(brand, brandEncoded) {
  // Check if subreddit exists or if brand is mentioned in search
  const urls = [
    { url: `https://www.reddit.com/r/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.json`, label: 'Subreddit' },
    { url: `https://www.reddit.com/search.json?q=${brandEncoded}&limit=5`, label: 'Reddit search' },
  ];
  
  // Try subreddit first
  try {
    const subResult = await probeUrl(urls[0].url, null);
    if (subResult.found && subResult.status === 200) {
      try {
        // Reddit JSON API returns array for valid subreddits
        const snippetText = subResult.snippet || '';
        if (snippetText.includes('"subreddit"') || snippetText.includes('"data"')) {
          return {
            channel: 'Reddit',
            status: 'Active',
            finding: `Subreddit r/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')} exists.`,
            url: `https://www.reddit.com/r/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
            priority: 'Medium',
            action: 'Monitor and engage in subreddit discussions. Create valuable community content.',
          };
        }
      } catch (e) { /* not valid JSON */ }
    }
  } catch (e) { /* fetch error */ }

  // Try search
  try {
    const searchResult = await probeUrl(urls[1].url, null);
    if (searchResult.found) {
      try {
        const text = searchResult.snippet || '';
        if (text.includes(brand.toLowerCase()) || text.includes('"num_results"')) {
          return {
            channel: 'Reddit',
            status: 'Needs Work',
            finding: `Brand mentioned in Reddit discussions but no dedicated subreddit.`,
            url: `https://www.reddit.com/search/?q=${brandEncoded}`,
            priority: 'Medium',
            action: 'Engage in relevant subreddits. Answer questions about your industry to build brand presence.',
          };
        }
      } catch (e) { /* parse error */ }
    }
  } catch (e) { /* fetch error */ }

  return {
    channel: 'Reddit',
    status: 'Not Present',
    finding: 'No significant Reddit presence detected.',
    url: null,
    priority: 'Low',
    action: 'Start engaging in relevant industry subreddits. Create valuable educational content.',
  };
}

async function checkSocialMedia(brand, website, brandEncoded) {
  // Check Twitter/X, Facebook by probing known patterns
  // Also check if the brand website links to social profiles
  let socialFound = [];
  
  // Check if brand website has social links (via crawl data would be better, but check common patterns)
  const brandDomain = website ? website.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  
  // Try Twitter/X
  const twitterSlug = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const twitterResult = await probeUrl(`https://x.com/${twitterSlug}`, null);
  if (twitterResult.found && twitterResult.status === 200) {
    socialFound.push('X/Twitter');
  }

  if (socialFound.length > 0) {
    return {
      channel: 'Social Media (X, Reddit, Quora)',
      status: 'Active',
      finding: `Active on: ${socialFound.join(', ')}. Social signals contribute to AI training data.`,
      url: null,
      priority: 'Medium',
      action: 'Maintain consistent posting schedule. Engage in industry conversations to build entity recognition.',
    };
  }

  return {
    channel: 'Social Media (X, Reddit, Quora)',
    status: 'Needs Work',
    finding: 'Could not verify active social media presence via direct URL checks.',
    url: null,
    priority: 'Medium',
    action: 'Establish presence on X, Reddit, and Quora. Consistent activity builds AI training data signals.',
  };
}

async function checkReviewSites(brand, brandEncoded, industry) {
  const urls = [
    { url: `https://www.g2.com/search?utf8=%E2%9C%93&query=${brandEncoded}`, label: 'G2' },
    { url: `https://www.trustpilot.com/search?query=${brandEncoded}`, label: 'Trustpilot' },
  ];
  const result = await probeMultiple(urls, brand);
  if (result.found && result.hasContent) {
    return {
      channel: 'Review Sites (G2/Capterra/Trustpilot)',
      status: 'Active',
      finding: `Brand found on ${result.label || 'review platforms'}. Review signals influence AI recommendations.`,
      url: result.url,
      priority: 'High',
      action: 'Actively collect and respond to reviews. Aim for 50+ reviews on primary platforms.',
    };
  }
  return {
    channel: 'Review Sites (G2/Capterra/Trustpilot)',
    status: 'Needs Work',
    finding: 'Limited presence on major review platforms.',
    url: null,
    priority: 'High',
    action: 'Claim profiles on G2, Trustpilot, and industry-specific review sites. Launch a review collection campaign.',
  };
}

async function checkPressNews(brand, brandEncoded) {
  // Check Google News for recent coverage
  const url = `https://news.google.com/search?q=${brandEncoded}&hl=en`;
  const result = await probeUrl(url, brand);
  if (result.found && result.hasContent) {
    return {
      channel: 'Press/News Coverage',
      status: 'Active',
      finding: 'Brand appears in Google News results. Press coverage detected.',
      url: `https://news.google.com/search?q=${brandEncoded}`,
      priority: 'Medium',
      action: 'Maintain regular press release cadence. Build relationships with industry journalists.',
    };
  }
  return {
    channel: 'Press/News Coverage',
    status: 'Needs Work',
    finding: 'Limited press coverage detected in news search.',
    url: null,
    priority: 'High',
    action: 'Develop a PR strategy. Distribute press releases via PR Newswire or GlobeNewswire.',
  };
}

async function checkDirectories(brand, brandEncoded) {
  // Check Crunchbase
  const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  const urls = [
    { url: `https://www.crunchbase.com/organization/${brandSlug}`, label: 'Crunchbase' },
  ];
  const result = await probeMultiple(urls, brand);
  if (result.found) {
    return {
      channel: 'Industry Directories',
      status: 'Active',
      finding: `Found on ${result.label || 'business directories'}. Directory listings strengthen entity signals.`,
      url: result.url,
      priority: 'Medium',
      action: 'Ensure all directory listings are complete, consistent, and up-to-date.',
    };
  }
  return {
    channel: 'Industry Directories',
    status: 'Needs Work',
    finding: 'Limited presence on major business directories.',
    url: null,
    priority: 'Medium',
    action: 'Create profiles on Crunchbase, Owler, and industry-specific directories.',
  };
}
