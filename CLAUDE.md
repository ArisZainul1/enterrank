# CLAUDE.md — Project Instructions for Claude Code

## Project Overview

EnterRank is a GEO (Generative Engine Optimization) audit dashboard built as a React SPA. It analyzes brand visibility across AI engines (ChatGPT, Gemini) and provides actionable insights.

- **Frontend**: Single-file React app at `src/App.jsx` (inline styles, no CSS files)
- **Backend**: Vercel serverless functions in `api/`
- **Hosting**: Vercel (connected via GitHub)
- **APIs**: OpenAI (gpt-4o-mini), Google Gemini (2.0-flash)

## Git & Deployment

### Auto-commit and push after every change

After completing each task, ALWAYS:

1. Stage all changes: `git add -A`
2. Commit with a conventional commit message (see format below)
3. Push to main: `git push origin main`

**Do NOT ask for confirmation before pushing.** Just push.

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description
```

Types:
- `feat` — new feature or functionality
- `fix` — bug fix
- `refactor` — code restructuring without behavior change
- `style` — visual/UI/formatting changes (not CSS — we use inline styles)
- `perf` — performance improvement
- `chore` — build config, dependencies, tooling
- `docs` — documentation only

Scope = affected area: `dashboard`, `audit`, `sidebar`, `api`, `auth`, `charts`, `crawl`, `intent`, `channels`

Examples:
```
feat(dashboard): add system diagnostics section
fix(api): increase max_tokens to prevent truncated responses
refactor(sidebar): replace avatar with logout button
style(global): reduce heading font weights to 500
feat(audit): add sentiment analysis step
fix(crawl): store raw competitor crawl data in apiData
```

Keep descriptions under 72 characters. Lowercase. No period at end.

## Code Standards

### Architecture
- Everything lives in `src/App.jsx` — single file, all components
- Serverless API routes in `api/*.js` — one function per file
- No external UI libraries (no MUI, no Chakra, no Tailwind)
- Charts are pure SVG — no chart libraries

### Styling
- Inline styles ONLY — no CSS files, no styled-components
- Use the `C` color system object defined at the top of App.jsx
- Fonts: `'Outfit'` for headings, `'Plus Jakarta Sans'` for body
- Headings: fontWeight 500 (medium), letterSpacing "-.02em"
- Data numbers/percentages: fontWeight 700-800 is acceptable
- Never use fontWeight 700+ on text headings — this is non-negotiable

### Patterns
- API calls go through `callOpenAI()` / `callGemini()` with `callWithRetry()` wrapper
- JSON parsing always through `safeJSON()` — never raw JSON.parse on API responses
- All API prompts end with "Return JSON only" and specify exact schema
- Components receive data via props from the results object `r`
- Navigation via `setStep()` — steps map to sidebar nav items

### Error Handling
- API callers return `null` on failure (never throw)
- `safeJSON()` returns `null` on parse failure
- Always provide fallback defaults: `safeJSON(raw) || { sensible defaults }`
- Crawl functions return gracefully on timeout (200 with error field, not 500)

### Vercel Serverless Functions
- Max timeout configured at 60s in vercel.json
- All functions set CORS headers
- All functions handle OPTIONS preflight
- OpenAI uses gpt-4o-mini, temperature 0.2, max_tokens 4000
- Gemini uses gemini-2.0-flash, temperature 0.2, maxOutputTokens 4000

## Environment Variables (Vercel)

```
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AI...
LOGIN_EMAIL=...
LOGIN_PASSWORD=...
```

No .env file in repo. All secrets are in Vercel dashboard.

## Testing

After each change:
1. Check balanced braces/parens: `node -e "const c=require('fs').readFileSync('src/App.jsx','utf8');console.log((c.match(/{/g)||[]).length,(c.match(/}/g)||[]).length)"`
2. Verify no syntax errors: `npx vite build` (or just check the dev server doesn't crash)
3. Do NOT run `npm test` — there are no test files

## File Structure

```
├── api/
│   ├── openai.js       # OpenAI proxy (gpt-4o-mini)
│   ├── gemini.js        # Gemini proxy (2.0-flash)
│   ├── crawl.js         # Website crawler
│   ├── channels.js      # AEO channel verification
│   ├── login.js         # Auth
│   └── projects.js      # Project CRUD
├── src/
│   ├── App.jsx          # Entire app (all components)
│   └── main.jsx         # React entry point
├── vercel.json          # Vercel config + function timeouts
├── CLAUDE.md            # This file
└── package.json
```

## Important Constraints

- Never create separate CSS files
- Never add npm dependencies without explicit instruction
- Never split App.jsx into multiple files unless explicitly told to
- Never use localStorage in components (Vercel deployment, not local)
- Never hardcode API keys — they come from environment variables via serverless functions
- Always preserve existing components when refactoring — move, don't delete
