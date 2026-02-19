export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { brand, website, industry, region } = req.body;
    if (!brand) return res.status(400).json({ error: 'brand is required' });
    const brandEncoded = encodeURIComponent(brand);
    const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

    // Step 1: Crawl brand website to find social links (most reliable method)
    let socialLinks = {};
    if (website) {
      try {
        let siteUrl = website.trim();
        if (!siteUrl.startsWith('http')) siteUrl = 'https://' + siteUrl;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const siteRes = await fetch(siteUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnterRank/1.0)', 'Accept': 'text/html' },
          signal: controller.signal, redirect: 'follow'
        });
        clearTimeout(timeout);
        if (siteRes.ok) {
          const html = await siteRes.text();
          if (/twitter\.com\/|x\.com\//i.test(html)) socialLinks.twitter = true;
          if (/facebook\.com\//i.test(html)) socialLinks.facebook = true;
          if (/instagram\.com\//i.test(html)) socialLinks.instagram = true;
          if (/tiktok\.com\//i.test(html)) socialLinks.tiktok = true;
          if (/linkedin\.com\/company/i.test(html)) socialLinks.linkedin = true;
          if (/youtube\.com\/(channel|c|@|user)/i.test(html)) socialLinks.youtube = true;
          if (/reddit\.com\//i.test(html)) socialLinks.reddit = true;
          if (/threads\.net/i.test(html)) socialLinks.threads = true;
        }
      } catch (e) { /* site crawl failed, proceed with API checks */ }
    }

    // Step 2: Run checks in parallel
    const results = await Promise.all([
      checkWikipedia(brand),
      checkYouTube(brand, brandEncoded, socialLinks),
      makeSocialResult('LinkedIn', socialLinks.linkedin, brandSlug, 'High',
        `https://www.linkedin.com/company/${brandSlug}`,
        'LinkedIn company page detected via website links.',
        'Post thought leadership weekly. Complete company description with keywords.',
        'Create LinkedIn company page — top-3 signal for AI visibility.'),
      makeSocialResult('X (Twitter)', socialLinks.twitter, brand.toLowerCase().replace(/[^a-z0-9]/g, ''), 'Medium',
        `https://x.com/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        'X/Twitter profile linked from website.',
        'Post consistently. Industry conversations feed AI training data.',
        'Create X profile. Discussions on X are indexed by ChatGPT and Gemini.'),
      makeSocialResult('Facebook', socialLinks.facebook, brand.toLowerCase().replace(/[^a-z0-9]/g, ''), 'Low',
        `https://www.facebook.com/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        'Facebook page linked from website.',
        'Maintain regular posting for community engagement.',
        'Create Facebook business page if relevant to audience.'),
      makeSocialResult('Instagram', socialLinks.instagram, brand.toLowerCase().replace(/[^a-z0-9]/g, ''), 'Low',
        `https://www.instagram.com/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        'Instagram profile linked from website.',
        'Share visual content. Captions and alt-text are indexed by AI.',
        'Create Instagram profile for visual brand presence.'),
      makeSocialResult('TikTok', socialLinks.tiktok, brand.toLowerCase().replace(/[^a-z0-9]/g, ''), 'Low',
        `https://www.tiktok.com/@${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        'TikTok profile linked from website.',
        'Create short educational videos. Transcripts feed AI training.',
        'Consider TikTok for short-form educational content.'),
      checkReddit(brand, brandEncoded, socialLinks),
      checkOtherSocial(brand, socialLinks),
      checkReviewSites(brand, brandEncoded),
      checkPressNews(brand, brandEncoded),
      checkDirectories(brand, brandSlug),
    ]);

    return res.status(200).json({ brand, channels: results, verifiedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Channel verification error:', error);
    return res.status(200).json({ brand: req.body?.brand, channels: [], error: error.message });
  }
}

async function safeFetch(url, searchText, timeoutMs = 4000) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)', 'Accept': 'text/html,application/json' },
      signal: controller.signal, redirect: 'follow',
    });
    clearTimeout(timeout);
    if (!response.ok) return { found: false, status: response.status };
    const text = await response.text();
    const hasContent = searchText ? text.toLowerCase().includes(searchText.toLowerCase()) : text.length > 500;
    return { found: true, hasContent, status: response.status, length: text.length };
  } catch (e) { return { found: false, error: e.message }; }
}

function makeSocialResult(channel, foundOnSite, slug, priority, url, activeMsg, activeAction, missingAction) {
  if (foundOnSite) return { channel, status: 'Active', finding: activeMsg, url, priority, action: activeAction };
  return { channel, status: 'Not Verified', finding: `No ${channel} link found on website. Profile may exist but was not detected.`, priority, action: missingAction };
}

async function checkWikipedia(brand) {
  try {
    const r = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(brand)}&format=json&srlimit=3`, { signal: AbortSignal.timeout(4000) });
    const data = await r.json();
    const results = data?.query?.search || [];
    const exact = results.find(x => x.title.toLowerCase().includes(brand.toLowerCase()));
    if (exact) return { channel: 'Wikipedia', status: 'Active', finding: `Article: "${exact.title}"`, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(exact.title.replace(/ /g, '_'))}`, priority: 'High', action: 'Keep article current with latest info.' };
    if (results.length > 0) return { channel: 'Wikipedia', status: 'Needs Work', finding: 'Related pages exist but no dedicated article.', priority: 'High', action: 'Build notability through press coverage first.' };
  } catch (e) {}
  return { channel: 'Wikipedia', status: 'Not Present', finding: 'No Wikipedia article found.', priority: 'High', action: 'Build notability through press and third-party citations.' };
}

async function checkYouTube(brand, brandEncoded, socialLinks) {
  if (socialLinks.youtube) return { channel: 'YouTube', status: 'Active', finding: 'YouTube channel linked from website.', url: `https://www.youtube.com/results?search_query=${brandEncoded}`, priority: 'Medium', action: 'Optimise video titles, descriptions, and add transcripts for AI indexing.' };
  const r = await safeFetch(`https://www.youtube.com/results?search_query=${brandEncoded}+official`, brand);
  if (r.found && r.hasContent) return { channel: 'YouTube', status: 'Active', finding: 'Brand appears in YouTube search.', url: `https://www.youtube.com/results?search_query=${brandEncoded}`, priority: 'Medium', action: 'Optimise video titles and add transcripts.' };
  return { channel: 'YouTube', status: 'Not Verified', finding: 'Could not verify YouTube presence.', priority: 'Medium', action: 'Create YouTube channel with educational content.' };
}

async function checkReddit(brand, brandEncoded, socialLinks) {
  if (socialLinks.reddit) return { channel: 'Reddit', status: 'Active', finding: 'Reddit linked from website.', url: `https://www.reddit.com/search/?q=${brandEncoded}`, priority: 'Medium', action: 'Engage in subreddits. Reddit is heavily indexed by AI engines.' };
  try {
    const r = await safeFetch(`https://www.reddit.com/search.json?q=${brandEncoded}&limit=5&type=link`, null);
    if (r.found && r.length > 300) return { channel: 'Reddit', status: 'Needs Work', finding: 'Brand mentioned in Reddit discussions.', url: `https://www.reddit.com/search/?q=${brandEncoded}`, priority: 'Medium', action: 'Engage in relevant subreddits authentically.' };
  } catch (e) {}
  return { channel: 'Reddit', status: 'Not Present', finding: 'No significant Reddit presence.', priority: 'Low', action: 'Start engaging in industry subreddits.' };
}

async function checkOtherSocial(brand, socialLinks) {
  let found = [];
  if (socialLinks.threads) found.push('Threads');
  if (found.length > 0) return { channel: 'Other Social Platforms', status: 'Active', finding: `Present on: ${found.join(', ')}.`, priority: 'Low', action: 'Answer questions on Quora. Publish on Medium.' };
  return { channel: 'Other Social Platforms', status: 'Needs Work', finding: 'Limited presence on Quora, Medium, Threads.', priority: 'Low', action: 'Answer industry questions on Quora. Republish content on Medium.' };
}

async function checkReviewSites(brand, brandEncoded) {
  const [g2, tp] = await Promise.all([
    safeFetch(`https://www.g2.com/search?utf8=%E2%9C%93&query=${brandEncoded}`, brand),
    safeFetch(`https://www.trustpilot.com/search?query=${brandEncoded}`, brand),
  ]);
  let found = [];
  if (g2.found && g2.hasContent) found.push('G2');
  if (tp.found && tp.hasContent) found.push('Trustpilot');
  if (found.length > 0) return { channel: 'Review Sites (G2/Capterra/Trustpilot)', status: 'Active', finding: `Found on ${found.join(', ')}.`, priority: 'High', action: 'Collect reviews. Respond to all. Aim for 50+ reviews.' };
  return { channel: 'Review Sites (G2/Capterra/Trustpilot)', status: 'Needs Work', finding: 'Limited review platform presence.', priority: 'High', action: 'Claim profiles on G2 and Trustpilot.' };
}

async function checkPressNews(brand, brandEncoded) {
  const r = await safeFetch(`https://news.google.com/search?q=${brandEncoded}&hl=en`, brand);
  if (r.found && r.hasContent) return { channel: 'Press/News Coverage', status: 'Active', finding: 'Brand appears in Google News.', url: `https://news.google.com/search?q=${brandEncoded}`, priority: 'Medium', action: 'Maintain regular press releases.' };
  return { channel: 'Press/News Coverage', status: 'Needs Work', finding: 'Limited press coverage.', priority: 'High', action: 'Develop PR strategy. Distribute via PR Newswire.' };
}

async function checkDirectories(brand, brandSlug) {
  const r = await safeFetch(`https://www.crunchbase.com/organization/${brandSlug}`, brand);
  if (r.found) return { channel: 'Industry Directories', status: 'Active', finding: 'Found on Crunchbase.', url: `https://www.crunchbase.com/organization/${brandSlug}`, priority: 'Medium', action: 'Keep all directory listings complete.' };
  return { channel: 'Industry Directories', status: 'Needs Work', finding: 'Limited directory presence.', priority: 'Medium', action: 'Create Crunchbase and industry directory profiles.' };
}
