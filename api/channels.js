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
    const results = await Promise.all([
      checkWikipedia(brand, brandSlug),
      checkYouTube(brand, brandEncoded),
      checkLinkedIn(brand, brandSlugDash),
      checkTwitterX(brand),
      checkFacebook(brand),
      checkInstagram(brand),
      checkTikTok(brand),
      checkReddit(brand, brandEncoded),
      checkOtherSocial(brand, brandEncoded),
      checkReviewSites(brand, brandEncoded, industry),
      checkPressNews(brand, brandEncoded),
      checkDirectories(brand, brandEncoded),
    ]);
    return res.status(200).json({ brand, channels: results, verifiedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Channel verification error:', error);
    return res.status(500).json({ error: 'Verification failed: ' + error.message });
  }
}

async function probeUrl(url, searchText, timeoutMs = 6000) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnterRank AEO Bot/1.0)', 'Accept': 'text/html,application/xhtml+xml,application/json' },
      signal: controller.signal, redirect: 'follow',
    });
    clearTimeout(timeout);
    if (!response.ok) return { found: false, status: response.status };
    const text = await response.text();
    const hasContent = searchText ? text.toLowerCase().includes(searchText.toLowerCase()) : text.length > 500;
    return { found: true, hasContent, status: response.status, length: text.length, snippet: text.slice(0, 500) };
  } catch (e) { return { found: false, error: e.message }; }
}

async function checkWikipedia(brand) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(brand)}&format=json&srlimit=3`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const results = data?.query?.search || [];
    const exact = results.find(r => r.title.toLowerCase().includes(brand.toLowerCase()));
    if (exact) return { channel: "Wikipedia", status: "Active", finding: `Article found: "${exact.title}"`, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(exact.title.replace(/ /g, '_'))}`, priority: "High", action: "Keep Wikipedia article current with latest company info." };
    if (results.length > 0) return { channel: "Wikipedia", status: "Needs Work", finding: `Related pages exist but no dedicated article.`, priority: "High", action: "Build notability through press coverage, then create article." };
  } catch (e) {}
  return { channel: "Wikipedia", status: "Not Present", finding: "No Wikipedia article found.", priority: "High", action: "Build notability through press and third-party citations first." };
}

async function checkYouTube(brand, brandEncoded) {
  const r = await probeUrl(`https://www.youtube.com/results?search_query=${brandEncoded}+official`, brand);
  if (r.found && r.hasContent) return { channel: "YouTube", status: "Active", finding: "Brand appears in YouTube search results.", url: `https://www.youtube.com/results?search_query=${brandEncoded}`, priority: "Medium", action: "Optimise video titles, descriptions, and transcripts for AI indexing." };
  return { channel: "YouTube", status: "Not Present", finding: "No significant YouTube presence detected.", priority: "High", action: "Create YouTube channel with structured video content and transcripts." };
}

async function checkLinkedIn(brand, brandSlugDash) {
  const r = await probeUrl(`https://www.linkedin.com/company/${brandSlugDash}`, null);
  if (r.found && r.status === 200) return { channel: "LinkedIn", status: "Active", finding: `LinkedIn company page likely exists.`, url: `https://www.linkedin.com/company/${brandSlugDash}`, priority: "Medium", action: "Post thought leadership content weekly. Ensure complete company description." };
  return { channel: "LinkedIn", status: "Needs Work", finding: "Could not verify LinkedIn page.", priority: "Medium", action: "Create or claim LinkedIn company page." };
}

async function checkTwitterX(brand) {
  const slug = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const r = await probeUrl(`https://x.com/${slug}`, null);
  if (r.found && r.status === 200 && r.length > 1000) return { channel: "X (Twitter)", status: "Active", finding: `X/Twitter profile likely exists @${slug}.`, url: `https://x.com/${slug}`, priority: "Medium", action: "Post consistently. Engage in industry conversations to build AI training signals." };
  return { channel: "X (Twitter)", status: "Needs Work", finding: "Could not verify X/Twitter profile.", priority: "Medium", action: "Create X profile. Engage in industry discussions regularly." };
}

async function checkFacebook(brand) {
  const slug = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const r = await probeUrl(`https://www.facebook.com/${slug}`, brand);
  if (r.found && r.hasContent) return { channel: "Facebook", status: "Active", finding: "Facebook page detected.", url: `https://www.facebook.com/${slug}`, priority: "Low", action: "Maintain regular posting. Use Facebook for community engagement." };
  return { channel: "Facebook", status: "Needs Work", finding: "Could not verify Facebook page.", priority: "Low", action: "Create Facebook business page if relevant to your audience." };
}

async function checkInstagram(brand) {
  const slug = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const r = await probeUrl(`https://www.instagram.com/${slug}/`, null);
  if (r.found && r.status === 200 && r.length > 2000) return { channel: "Instagram", status: "Active", finding: `Instagram profile likely exists @${slug}.`, url: `https://www.instagram.com/${slug}`, priority: "Low", action: "Share visual content and behind-the-scenes. Link to authoritative content." };
  return { channel: "Instagram", status: "Needs Work", finding: "Could not verify Instagram profile.", priority: "Low", action: "Create Instagram profile for visual brand presence." };
}

async function checkTikTok(brand) {
  const slug = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const r = await probeUrl(`https://www.tiktok.com/@${slug}`, null);
  if (r.found && r.status === 200 && r.length > 2000) return { channel: "TikTok", status: "Active", finding: `TikTok profile likely exists @${slug}.`, url: `https://www.tiktok.com/@${slug}`, priority: "Low", action: "Create short educational videos. TikTok content increasingly feeds AI training data." };
  return { channel: "TikTok", status: "Needs Work", finding: "Could not verify TikTok profile.", priority: "Low", action: "Consider TikTok for short-form educational content." };
}

async function checkReddit(brand, brandEncoded) {
  const sub = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  try {
    const r = await probeUrl(`https://www.reddit.com/r/${sub}.json`, null);
    if (r.found && r.status === 200 && r.snippet && r.snippet.includes('"subreddit"')) return { channel: "Reddit", status: "Active", finding: `Subreddit r/${sub} exists.`, url: `https://www.reddit.com/r/${sub}`, priority: "Medium", action: "Engage in subreddit. Reddit discussions are heavily indexed by AI engines." };
  } catch (e) {}
  try {
    const r = await probeUrl(`https://www.reddit.com/search.json?q=${brandEncoded}&limit=5`, null);
    if (r.found && r.snippet && r.snippet.includes('"data"')) return { channel: "Reddit", status: "Needs Work", finding: "Brand mentioned in Reddit discussions.", url: `https://www.reddit.com/search/?q=${brandEncoded}`, priority: "Medium", action: "Engage in relevant subreddits. Answer industry questions." };
  } catch (e) {}
  return { channel: "Reddit", status: "Not Present", finding: "No significant Reddit presence.", priority: "Low", action: "Start engaging in industry subreddits." };
}

async function checkOtherSocial(brand, brandEncoded) {
  // Quora, Medium, Pinterest — grouped as "Other Social Platforms"
  let found = [];
  const quoraR = await probeUrl(`https://www.quora.com/topic/${brandEncoded}`, brand);
  if (quoraR.found && quoraR.hasContent) found.push("Quora");
  if (found.length > 0) return { channel: "Other Social Platforms", status: "Active", finding: `Present on: ${found.join(", ")}. These platforms contribute to AI training data.`, priority: "Low", action: "Answer questions on Quora. Publish on Medium. Share infographics on Pinterest." };
  return { channel: "Other Social Platforms", status: "Needs Work", finding: "Limited presence on Quora, Medium, Pinterest.", priority: "Low", action: "Answer industry questions on Quora. Republish content on Medium." };
}

async function checkReviewSites(brand, brandEncoded, industry) {
  const g2 = await probeUrl(`https://www.g2.com/search?utf8=%E2%9C%93&query=${brandEncoded}`, brand);
  const tp = await probeUrl(`https://www.trustpilot.com/search?query=${brandEncoded}`, brand);
  if ((g2.found && g2.hasContent) || (tp.found && tp.hasContent)) {
    const platform = g2.found && g2.hasContent ? "G2" : "Trustpilot";
    return { channel: "Review Sites (G2/Capterra/Trustpilot)", status: "Active", finding: `Brand found on ${platform}.`, url: g2.found ? `https://www.g2.com/search?query=${brandEncoded}` : `https://www.trustpilot.com/search?query=${brandEncoded}`, priority: "High", action: "Actively collect reviews. Respond to all reviews. Aim for 50+ reviews." };
  }
  return { channel: "Review Sites (G2/Capterra/Trustpilot)", status: "Needs Work", finding: "Limited review platform presence.", priority: "High", action: "Claim profiles on G2, Trustpilot. Launch review collection campaign." };
}

async function checkPressNews(brand, brandEncoded) {
  const r = await probeUrl(`https://news.google.com/search?q=${brandEncoded}&hl=en`, brand);
  if (r.found && r.hasContent) return { channel: "Press/News Coverage", status: "Active", finding: "Brand appears in Google News.", url: `https://news.google.com/search?q=${brandEncoded}`, priority: "Medium", action: "Maintain regular press releases. Build journalist relationships." };
  return { channel: "Press/News Coverage", status: "Needs Work", finding: "Limited press coverage.", priority: "High", action: "Develop PR strategy. Distribute via PR Newswire or GlobeNewswire." };
}

async function checkDirectories(brand, brandEncoded) {
  const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  const r = await probeUrl(`https://www.crunchbase.com/organization/${slug}`, brand);
  if (r.found) return { channel: "Industry Directories", status: "Active", finding: "Found on Crunchbase.", url: `https://www.crunchbase.com/organization/${slug}`, priority: "Medium", action: "Keep all directory listings complete and consistent." };
  return { channel: "Industry Directories", status: "Needs Work", finding: "Limited directory presence.", priority: "Medium", action: "Create profiles on Crunchbase, Owler, and industry-specific directories." };
}
