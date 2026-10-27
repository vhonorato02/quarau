import { existsSync } from 'node:fs'
import { access } from 'node:fs/promises'
import path from 'node:path'

import { HeadBucketCommand, S3Client } from '@aws-sdk/client-s3'

import { mediaStatic } from '@/lib/platform-env'
import { logger } from '@/server/logger'
import { getPayload } from '@/server/payload'
import { storageConfig } from '@/server/storage'

export const dynamic = 'force-dynamic'

/** Created by the platform deploy in the outgoing replica before it stops. */
const DRAIN_FILE = '/tmp/quarau-drain'
const noStore = { 'Cache-Control': 'no-store' }

async function checkStorage(): Promise<'ok' | 'static' | 'error'> {
  // Temporary deployment: photos are static files of the deployment itself.
  if (mediaStatic()) return 'static'
  const cfg = storageConfig()
  try {
    if (cfg) {
      await new S3Client(cfg.client).send(new HeadBucketCommand({ Bucket: cfg.bucket }))
    } else {
      await access(path.resolve(process.env.MEDIA_DIR ?? 'media'))
    }
    return 'ok'
  } catch (err) {
    logger.error({ err }, 'health check: storage unreachable')
    return 'error'
  }
}

/** GET /api/health — database and media storage. Used by Docker, Caddy/`site` and uptime checks. */
export async function GET() {
  if (existsSync(DRAIN_FILE)) return Response.json({ status: 'draining' }, { status: 503, headers: noStore })
  const started = Date.now()
  let db: 'ok' | 'error' = 'ok'
  try {
    const payload = await getPayload()
    await payload.db.drizzle.execute('select 1')
  } catch (err) {
    logger.error({ err }, 'health check: database unreachable')
    db = 'error'
  }
  const storage = await checkStorage()
  const ok = db === 'ok' && storage !== 'error'
  return Response.json(
    { status: ok ? 'ok' : 'error', db, storage, version: process.env.APP_VERSION ?? 'dev', latencyMs: Date.now() - started },
    { status: ok ? 200 : 503, headers: noStore },
  )
}
