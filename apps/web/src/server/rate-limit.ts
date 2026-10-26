/**
 * Fixed-window rate limiter behind an interface (docs/decisions/0018). The in-memory version is
 * enough for one long-running process (VPS) and is a best-effort guard per serverless instance
 * (Vercel); a Postgres or Valkey implementation can replace it without touching the callers.
 */
export interface RateLimiter {
  hit(key: string, limit: number, windowSec: number): Promise<{ ok: boolean; remaining: number }>
}

export function createMemoryRateLimiter(now: () => number = Date.now): RateLimiter {
  const windows = new Map<string, { count: number; reset: number }>()
  return {
    async hit(key, limit, windowSec) {
      const t = now()
      if (windows.size > 10_000) for (const [k, w] of windows) if (w.reset < t) windows.delete(k)
      const w = windows.get(key)
      if (!w || w.reset <= t) {
        windows.set(key, { count: 1, reset: t + windowSec * 1000 })
        return { ok: limit >= 1, remaining: Math.max(0, limit - 1) }
      }
      w.count += 1
      return { ok: w.count <= limit, remaining: Math.max(0, limit - w.count) }
    },
  }
}

/** Shared limiter for this process. */
export const rateLimiter: RateLimiter = createMemoryRateLimiter()
