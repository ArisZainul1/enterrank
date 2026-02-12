# EnterRank by Entermind

## Quick Deploy to Vercel

### Step 1: Push to GitHub

```bash
# In terminal, navigate to this folder
cd enterrank-deploy

# Initialize git
git init
git add .
git commit -m "EnterRank v3 — AEO Dashboard"

# Create a repo on GitHub (github.com/new), then:
git remote add origin https://github.com/YOUR_USERNAME/enterrank.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `enterrank` repository
4. Vercel auto-detects Vite — just click **"Deploy"**
5. Wait ~60 seconds for the build

### Step 3: Add your API Key

1. In your Vercel project, go to **Settings → Environment Variables**
2. Add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Your Anthropic API key (get one at https://console.anthropic.com/)
3. Click **Save**
4. Go to **Deployments** → click the **three dots** on the latest deployment → **Redeploy**

### Done!

Your EnterRank dashboard is now live at `https://enterrank.vercel.app` (or whatever Vercel assigns).

---

## How it works

- **Frontend:** React + Vite (static, served by Vercel CDN)
- **API Proxy:** `/api/claude.js` is a Vercel Serverless Function that forwards requests to the Anthropic API with your key
- **No database needed** — all data is generated per-audit session

## Project Structure

```
enterrank-deploy/
├── api/
│   └── claude.js          # Serverless API proxy (keeps API key secure)
├── src/
│   ├── App.jsx            # The entire dashboard (single-file React app)
│   └── main.jsx           # React entry point
├── index.html             # HTML shell
├── package.json           # Dependencies
├── vite.config.js         # Build config
├── vercel.json            # Vercel routing config
├── .env.example           # Environment variable template
└── .gitignore
```

## Local Development

```bash
npm install
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > .env.local
npm run dev
```

Note: For local dev, you'll need to update the API proxy to read from `.env.local`. The current setup reads from Vercel environment variables.

## Future: Adding OpenAI + Gemini Keys

To call ChatGPT and Gemini directly (instead of having Claude estimate), you'd:

1. Add `OPENAI_API_KEY` and `GOOGLE_AI_KEY` to Vercel environment variables
2. Create `/api/openai.js` and `/api/gemini.js` serverless functions
3. Update the audit flow to call all 3 APIs in parallel

This is the recommended path for production accuracy.
