/**
 * Map "Onde atuamos" (08/11/2026): brings an installation seeded before that date up to the map.
 *
 *   pnpm --filter @quarau/web exec tsx scripts/seed/territories-2026-11.ts
 *
 * Safe on a live site and idempotent:
 * - fills latitude/longitude only on projects that have none (coordinates from content.ts);
 * - adds the map block to the home page, after the project list, only if the page has none, and
 *   in that same step turns the home's project list into the compact index.
 * Nothing else in those documents changes. Restart the site (or wait for revalidation) afterwards.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload, type Payload } from 'payload'

import config from '../../src/payload.config'
import { pages, projects } from './content'

const ctx = () => ({ disableRevalidate: true, seeding: true })

export async function addTerritories(payload: Payload): Promise<string[]> {
  const done: string[] = []

  for (const seed of projects) {
    if (typeof seed.latitude !== 'number' || typeof seed.longitude !== 'number') continue
    const res = await payload.find({
      collection: 'projects',
      where: { slug: { equals: seed.slug } },
      limit: 1,
      depth: 0,
    })
    const doc = res.docs[0]
    if (!doc || typeof doc.latitude === 'number') continue
    await payload.update({
      collection: 'projects',
      id: doc.id,
      data: { latitude: seed.latitude, longitude: seed.longitude, _status: 'published' },
      context: ctx(),
    })
    done.push(`coordenadas ${seed.slug}`)
  }

  const homeSeed = pages.find((p) => p.slug === 'inicio')
  const mapSeed = homeSeed?.layout.find(
    (b) => (b as { blockType?: string }).blockType === 'territories',
  )
  const homeRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'inicio' } },
    limit: 1,
    depth: 0,
  })
  const home = homeRes.docs[0]
  const layout = home?.layout ?? []
  if (home && mapSeed && !layout.some((b) => b.blockType === 'territories')) {
    const at = layout.findIndex((b) => b.blockType === 'projectIndex')
    // Same round: the home's project list becomes the compact index (the map sits right after it).
    const next = layout.map((b, i) => (i === at ? { ...b, display: 'index' as const } : b))
    next.splice(at >= 0 ? at + 1 : next.length, 0, mapSeed as (typeof layout)[number])
    await payload.update({
      collection: 'pages',
      id: home.id,
      data: { layout: next, _status: 'published' },
      context: ctx(),
    })
    done.push('mapa na home')
  }
  return done
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isCli) {
  getPayload({ config })
    .then(addTerritories)
    .then((done) => {
      console.info('[territories]', done.length ? done.join(', ') : 'nada a fazer')
      process.exit(0)
    })
    .catch((err) => {
      console.error('[territories] falhou', err)
      process.exit(1)
    })
}
