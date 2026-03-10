// api/_auth.js — Shared Supabase auth verification helper

export default async function verifyAuth(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) return null;

  try {
    const response = await fetch(
      (process.env.SUPABASE_URL || "https://kzwouovhgbdledejhuxh.supabase.co") + "/auth/v1/user",
      {
        headers: {
          "Authorization": "Bearer " + token,
          "apikey": process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6d291b3ZoZ2JkbGVkZWpodXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTc4MzcsImV4cCI6MjA4NzM5MzgzN30.GKKtXOclw_5K2VwQW-XYtltzh0QD_wgF0Qgu_JVoDwY"
        }
      }
    );

    if (!response.ok) return null;
    const user = await response.json();
    return user?.id ? user : null;
  } catch (e) {
    return null;
  }
}
