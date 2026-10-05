import { getPayload } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Liveness/readiness probe used by Docker healthcheck, deploy script and Uptime Kuma. */
export async function GET() {
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
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    return Response.json(
      {
        status: 'error',
        db: 'unreachable',
        message: err instanceof Error ? err.message : 'unknown',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
