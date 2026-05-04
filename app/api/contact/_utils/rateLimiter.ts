// In-memory rate limiter per IP address

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

let rateLimitStore: { [ip: string]: RateLimitEntry } = {};
let cleanupInterval: NodeJS.Timeout | null = null;

const MAX_REQUESTS = 5;
const WINDOW_SIZE = 3600 * 1000; // 1 hour in milliseconds
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function initializeRateLimiter() {
  // Start cleanup interval if not already running
  if (!cleanupInterval) {
    cleanupInterval = setInterval(() => {
      const now = Date.now();
      Object.keys(rateLimitStore).forEach((ip) => {
        if (rateLimitStore[ip].resetTime < now) {
          delete rateLimitStore[ip];
        }
      });
    }, CLEANUP_INTERVAL);

    // Prevent process from exiting due to interval
    if (cleanupInterval.unref) {
      cleanupInterval.unref();
    }
  }
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore[ip];

  // No entry means first request
  if (!entry) {
    return false;
  }

  // Check if hour window has expired
  if (entry.resetTime < now) {
    delete rateLimitStore[ip];
    return false;
  }

  // Check if limit exceeded
  return entry.count >= MAX_REQUESTS;
}

export function recordRequest(ip: string): void {
  const now = Date.now();
  const entry = rateLimitStore[ip];

  if (!entry) {
    // First request from this IP
    rateLimitStore[ip] = {
      count: 1,
      resetTime: now + WINDOW_SIZE,
    };
  } else if (entry.resetTime < now) {
    // Window expired, reset
    rateLimitStore[ip] = {
      count: 1,
      resetTime: now + WINDOW_SIZE,
    };
  } else {
    // Increment within current window
    entry.count++;
  }
}

export function getRateLimitStatus(ip: string): {
  remaining: number;
  resetTime: number;
} {
  const entry = rateLimitStore[ip];

  if (!entry) {
    return {
      remaining: MAX_REQUESTS,
      resetTime: Date.now() + WINDOW_SIZE,
    };
  }

  const now = Date.now();
  if (entry.resetTime < now) {
    return {
      remaining: MAX_REQUESTS,
      resetTime: now + WINDOW_SIZE,
    };
  }

  return {
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    resetTime: entry.resetTime,
  };
}

// Initialize on module load
initializeRateLimiter();
