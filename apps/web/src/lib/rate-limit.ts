import Redis from 'iovalkey'

import { env } from './env'

let client: Redis | null | undefined
const memory = new Map<string, { count: number; reset: number }>()

function redis(): Redis | null {
  if (client !== undefined) return client
  const url = env().REDIS_URL
  client = url ? new Redis(url, { maxRetriesPerRequest: 1, enableOfflineQueue: false, lazyConnect: false }) : null
  client?.on('error', () => {
    /* fall back to memory on connection errors */
  })
  return client
}

/**
 * Fixed-window rate limiter backed by Valkey (shared across containers) with an
 * in-memory fallback so the site keeps working if Valkey is down.
 */
export async function rateLimit(key: string, limit: number, windowSec: number): Promise<{ ok: boolean; remaining: number }> {
  const k = `rl:${key}`
  const r = redis()
  if (r && r.status === 'ready') {
    try {
      const count = await r.incr(k)
      if (count === 1) await r.expire(k, windowSec)
      return { ok: count <= limit, remaining: Math.max(0, limit - count) }
    } catch {
      /* fall through */
    }
  }
  const now = Date.now()
  const entry = memory.get(k)
  if (!entry || entry.reset < now) {
    memory.set(k, { count: 1, reset: now + windowSec * 1000 })
    return { ok: true, remaining: limit - 1 }
  }
  entry.count += 1
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count) }
}

export function _resetMemoryLimiter() {
  memory.clear()
}
