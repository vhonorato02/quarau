/**
 * Vercel build: apply database migrations, import the quarau.com.br content on the very first
 * deploy (empty database only, so CMS edits are never overwritten), then build Next.js.
 * Videos are skipped by default on the free tier (MIGRATE_SKIP_VIDEO=1); add them in the CMS.
 */
import { execFileSync } from 'node:child_process'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const run = (args: string[], extraEnv: Record<string, string> = {}) =>
  execFileSync('pnpm', args, { stdio: 'inherit', env: { ...process.env, ...extraEnv } })

run(['payload', 'migrate'])

const payload = await getPayload({ config })
const { totalDocs } = await payload.count({ collection: 'projects', overrideAccess: true })
if (totalDocs === 0) {
  console.info('[vercel-build] empty database: importing content from quarau.com.br')
  run(['migrate:wp'], {
    MIGRATE_SKIP_VIDEO: process.env.MIGRATE_SKIP_VIDEO ?? '1',
    PAYLOAD_JOBS_AUTORUN: 'false',
  })
} else {
  console.info(`[vercel-build] content already present (${totalDocs} projects): import skipped`)
}

run(['exec', 'next', 'build'])
process.exit(0)
