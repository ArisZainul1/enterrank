// /api/login.js — Vercel Serverless Function
// Validates credentials against environment variables

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password } = req.body;

    const validEmail = process.env.LOGIN_EMAIL;
    const validPassword = process.env.LOGIN_PASSWORD;

    if (!validEmail || !validPassword) {
      return res.status(500).json({ error: 'Login credentials not configured in environment variables' });
    }

    if (email === validEmail && password === validPassword) {
      // Generate a simple session token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
