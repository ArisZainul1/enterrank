# EnterRank — AI Engine Optimisation Platform

AEO audit dashboard that measures brand visibility across ChatGPT and Gemini.

## Quick Deploy to Vercel

1. Push this repo to GitHub
2. Import to [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `LOGIN_EMAIL` | Login email address |
| `LOGIN_PASSWORD` | Login password |
| `OPENAI_API_KEY` | OpenAI API key (ChatGPT audit engine) |
| `GOOGLE_AI_KEY` | Google AI API key (Gemini audit engine) |
| `ANTHROPIC_API_KEY` | Anthropic API key (Copilot chatbot) |

4. Deploy

## Architecture

- **Frontend**: React + Vite (single `App.jsx`)
- **Backend**: Vercel Serverless Functions (`/api/`)
  - `/api/openai.js` — ChatGPT engine queries
  - `/api/gemini.js` — Gemini engine queries  
  - `/api/claude.js` — Copilot chatbot (Claude)
  - `/api/crawl.js` — Website crawler for AEO signals
  - `/api/projects.js` — Project CRUD with `/tmp` storage
  - `/api/login.js` — Authentication

## Audit Flow

1. **Login** → Credentials checked against env vars
2. **Project Hub** → New Project or select Existing Project
3. **New Audit** → Enter brand details (persisted to project)
4. **API Calls**: OpenAI + Gemini for visibility scoring, archetypes, intent pathways
5. **Crawler**: Website analysis for structured data, schema, E-E-A-T signals
6. **Results**: Overview → Archetypes → Intent Pathway → AEO Channels → Content Grid → 90-Day Roadmap

## Local Development

```bash
npm install
cp .env.example .env.local  # Add your API keys
npm run dev
```
