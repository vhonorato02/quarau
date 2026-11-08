/**
 * Content revision of 07/11/2026 (docs/PROGRESSO.md): brings an installation seeded before that
 * date up to the expanded texts of content.ts and news.ts.
 *
 *   pnpm --filter @quarau/web exec tsx scripts/seed/revise-2026-11.ts
 *
 * Safe on a live site: a document is only rewritten while nobody has edited it since the first
 * load (updatedAt before REVISED_BEFORE). Anything touched in the panel stays as it is. New
 * stories are created by the regular seed (run it afterwards).
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload, type Payload } from 'payload'

import config from '../../src/payload.config'
import { pages, projects, services } from './content'
import { resolve } from './index'
import { curatedNews, curatedNewsStory } from './news'

/**
 * Documents last changed before this moment still hold the seeded text. A later text fix can be
 * applied with REVISE_BEFORE=<ISO date> after checking that nobody has edited in the panel since.
 */
const REVISED_BEFORE = new Date(process.env.REVISE_BEFORE ?? '2026-11-08T00:00:00Z').getTime()

const ctx = () => ({ disableRevalidate: true, seeding: true })

const PROJECTS = [
  'ecomuseu-dos-campos-de-sao-jose',
  'inventario-cultural-e-dossie-de-registro',
  'projeto-ecoe-verde',
  'memoria-institucional-museu-do-folclore',
]
const NEWS = [
  'jornada-formativa-ecomuseu-quarta-edicao',
  'ecomuseu-mutirao-rio-alambari',
  'samba-de-bumbo-paulista-patrimonio-cultural',
  'cortejo-da-cavalaria-patrimonio-cultural',
]

type Doc = { id: number; updatedAt: string }

async function untouched(
  payload: Payload,
  collection: 'projects' | 'news' | 'pages' | 'services',
  slug: string,
): Promise<Doc | null> {
  const res = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  })
  const doc = res.docs[0] as Doc | undefined
  if (!doc) return null
  if (new Date(doc.updatedAt).getTime() >= REVISED_BEFORE) {
    console.info('[revise] edited in the panel, kept:', collection, slug)
    return null
  }
  return doc
}

export async function revise(payload: Payload): Promise<string[]> {
  const done: string[] = []
  const pageIds = new Map<string, number>()
  for (const pg of pages) {
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pg.slug } },
      limit: 1,
      depth: 0,
      draft: true,
    })
    if (res.docs[0]) pageIds.set(pg.slug, res.docs[0].id)
  }

  for (const slug of PROJECTS) {
    const p = projects.find((x) => x.slug === slug)!
    const doc = await untouched(payload, 'projects', slug)
    if (!doc) continue
    await payload.update({
      collection: 'projects',
      id: doc.id,
      data: {
        summary: p.summary,
        role: p.role,
        endYear: p.endYear,
        lead: p.lead,
        story: (await resolve(payload, p.story, pageIds)) as never,
        _status: 'published',
      } as never,
      context: ctx(),
    })
    done.push(`projeto ${slug}`)
  }

  const heritage = services.find((s) => s.slug === 'patrimonio-cultural-e-pesquisa')!
  const service = await untouched(payload, 'services', heritage.slug)
  if (service) {
    await payload.update({
      collection: 'services',
      id: service.id,
      data: {
        story: [{ blockType: 'richText', layout: 'narrow', body: heritage.body }],
        _status: 'published',
      } as never,
      context: ctx(),
    })
    done.push(`área ${heritage.slug}`)
  }

  const about = pages.find((pg) => pg.slug === 'sobre')!
  const aboutDoc = await untouched(payload, 'pages', 'sobre')
  if (aboutDoc) {
    await payload.update({
      collection: 'pages',
      id: aboutDoc.id,
      data: {
        layout: (await resolve(payload, about.layout, pageIds)) as never,
        _status: 'published',
      } as never,
      context: ctx(),
    })
    done.push('página sobre')
  }

  for (const slug of NEWS) {
    const item = curatedNews.find((n) => n.slug === slug)!
    const doc = await untouched(payload, 'news', slug)
    if (!doc) continue
    await payload.update({
      collection: 'news',
      id: doc.id,
      data: { summary: item.summary, story: curatedNewsStory(item), _status: 'published' } as never,
      context: ctx(),
    })
    done.push(`notícia ${slug}`)
  }
  return done
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isCli) {
  getPayload({ config })
    .then(revise)
    .then((done) => {
      console.info('[revise]', done.length ? done.join(', ') : 'nada a revisar')
      process.exit(0)
    })
    .catch((err) => {
      console.error('[revise] falhou', err)
      process.exit(1)
    })
}
