// api/_rateLimit.js — Simple in-memory rate limiter

const rateLimits = {};

export default function rateLimit(userId, limit = 100, windowMs = 60000) {
  const now = Date.now();
  const key = userId || "anonymous";

  if (!rateLimits[key]) {
    rateLimits[key] = { count: 0, resetAt: now + windowMs };
  }

  if (now > rateLimits[key].resetAt) {
    rateLimits[key] = { count: 0, resetAt: now + windowMs };
  }

  rateLimits[key].count++;

  if (rateLimits[key].count > limit) {
    return false;
  }

  return true;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimits).forEach(key => {
    if (now > rateLimits[key].resetAt + 300000) delete rateLimits[key];
  });
}, 300000);
