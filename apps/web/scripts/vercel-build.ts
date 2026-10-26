/**
 * Vercel build: apply pending database migrations, then build Next.js.
 * Content is never imported here (it would slow every deploy and could overwrite edits):
 * run `pnpm seed` once against the production database (docs/MIGRACAO-VPS.md §Primeira carga).
 */
import { execFileSync } from 'node:child_process'

import { databaseUrl } from '../src/lib/platform-env'

if (!databaseUrl()) {
  console.error(
    '[vercel-build] DATABASE_URL (or POSTGRES_URL) is missing: connect the Neon database to this project',
  )
  process.exit(1)
}

const run = (args: string[]) => execFileSync('pnpm', args, { stdio: 'inherit', env: process.env })

run(['payload', 'migrate'])
run(['exec', 'next', 'build'])
