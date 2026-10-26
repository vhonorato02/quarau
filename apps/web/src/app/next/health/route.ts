import { existsSync } from 'node:fs'

import { logger } from '@/lib/logger'
import { getPayload } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Created by the platform deploy (DRAIN_FILE in /srv/sites/quarau/.env) in the outgoing replica before it stops. */
const DRAIN_FILE = '/tmp/quarau-drain'
const noStore = { 'Cache-Control': 'no-store' }

/** Liveness/readiness probe used by Docker healthcheck, Traefik, deploy script and Uptime Kuma. */
export async function GET() {
  if (existsSync(DRAIN_FILE)) {
    return Response.json({ status: 'draining' }, { status: 503, headers: noStore })
  }
  const started = Date.now()
  try {
    const payload = await getPayload()
    await payload.db.drizzle.execute('select 1')
    return Response.json(
      {
        status: 'ok',
        db: 'ok',
        version: process.env.APP_VERSION ?? 'dev',
        latencyMs: Date.now() - started,
      },
      { headers: noStore },
    )
  } catch (err) {
    logger.error({ err }, 'health check: database unreachable')
    return Response.json({ status: 'error', db: 'unreachable' }, { status: 503, headers: noStore })
  }
}
