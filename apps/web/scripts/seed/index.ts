/**
 * Seeds the CMS with the initial content (scripts/seed/content.ts).
 *
 *   pnpm --filter @quarau/web seed
 *
 * Idempotent and safe to run on a live site: every document is looked up by its slug (media by
 * the old URL) and is only created when missing. Nothing that exists is ever updated, so edits
 * made in the CMS are never overwritten. Globals are filled only while still empty.
 *
 * SEED_OFFLINE=true (CI) never touches the old WordPress: images not in .migrate-cache/ are
 * replaced by generated placeholders and video blocks are skipped.
 */
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload, type Payload } from 'payload'
import sharp from 'sharp'

import config from '../../src/payload.config'
import { SITE_TEXTS } from '../../src/cms/globals/site-texts'
import { globals, type Img, pages, partners, projects, services } from './content'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE = path.resolve(dirname, '../../.migrate-cache')
const WP = 'https://quarau.com.br/wp-content/uploads/'
const OFFLINE = process.env.SEED_OFFLINE === 'true'

/** Payload mutates the context object during uploads: a new one per call. */
const ctx = () => ({ disableRevalidate: true, seeding: true })

const log = (...a: unknown[]) => console.info('[seed]', ...a)

async function localFile(rel: string): Promise<string> {
  const isVideo = rel.startsWith('video/')
  const file = path.join(CACHE, isVideo ? rel : path.join('uploads', rel))
  if (existsSync(file)) return file
  if (OFFLINE) return placeholder(rel)
  const url = isVideo ? `${WP}2023/12/${path.basename(rel)}` : `${WP}${rel}`
  log('baixando', url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`não foi possível baixar ${url} (${res.status})`)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, Buffer.from(await res.arrayBuffer()))
  return file
}

/** A plain 1600×1000 image standing in for a photo when seeding offline. */
async function placeholder(rel: string): Promise<string> {
  const file = path.join(CACHE, 'offline', `${path.parse(rel).name}.jpg`)
  if (existsSync(file)) return file
  await mkdir(path.dirname(file), { recursive: true })
  await sharp({ create: { width: 1600, height: 1000, channels: 3, background: '#7a8f6b' } })
    .jpeg()
    .toFile(file)
  return file
}

const mediaIds = new Map<string, number>()

async function media(payload: Payload, image: Img): Promise<number> {
  const legacyUrl = image.file.startsWith('video/')
    ? `${WP}2023/12/${path.basename(image.file)}`
    : `${WP}${image.file}`
  const cached = mediaIds.get(legacyUrl)
  if (cached) return cached
  const found = await payload.find({
    collection: 'media',
    where: { legacyUrl: { equals: legacyUrl } },
    limit: 1,
    depth: 0,
  })
  if (found.docs[0]) {
    mediaIds.set(legacyUrl, found.docs[0].id)
    return found.docs[0].id
  }
  const created = await payload.create({
    collection: 'media',
    data: { alt: image.alt, caption: image.caption, legacyUrl, needsReview: true },
    filePath: await localFile(image.file),
    context: ctx(),
  })
  log('mídia', path.basename(image.file))
  mediaIds.set(legacyUrl, created.id)
  return created.id
}

type Collection = 'pages' | 'projects' | 'services' | 'news' | 'partners'

async function findBy(payload: Payload, collection: Collection, field: string, value: string) {
  const res = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
    depth: 0,
    draft: true,
  })
  return res.docs[0] as { id: number } | undefined
}

const isImg = (v: unknown): v is Img =>
  typeof v === 'object' && v !== null && 'file' in v && 'alt' in v

/** Replaces every Img in a block tree by the id of the uploaded media; resolves page links. */
async function resolve(
  payload: Payload,
  value: unknown,
  pageIds: Map<string, number>,
): Promise<unknown> {
  if (isImg(value)) return media(payload, value)
  if (Array.isArray(value)) {
    const out = []
    for (const v of value) {
      if (OFFLINE && (v as { blockType?: string } | null)?.blockType === 'video') continue
      out.push(await resolve(payload, v, pageIds))
    }
    return out
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (obj.type === 'internal' && typeof obj.ref === 'string') {
      const id = pageIds.get(obj.ref)
      if (!id) throw new Error(`página "${obj.ref}" não existe`)
      return { type: 'internal', reference: { relationTo: 'pages', value: id }, label: obj.label }
    }
    if ('root' in obj) return obj // rich text
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(obj)) out[k] = await resolve(payload, v, pageIds)
    return out
  }
  return value
}

async function main() {
  const payload = await getPayload({ config })
  const created: string[] = []

  // Partners
  const partnerIds = new Map<string, number>()
  for (const p of partners) {
    const existing = await findBy(payload, 'partners', 'name', p.name)
    if (existing) {
      partnerIds.set(p.key, existing.id)
      continue
    }
    const { key, ...data } = p
    const doc = await payload.create({ collection: 'partners', data: { ...data }, context: ctx() })
    partnerIds.set(key, doc.id)
    created.push(`parceiro ${p.name}`)
  }

  // Services
  const serviceIds = new Map<string, number>()
  for (const s of services) {
    const existing = await findBy(payload, 'services', 'slug', s.slug)
    if (existing) {
      serviceIds.set(s.slug, existing.id)
      continue
    }
    const doc = await payload.create({
      collection: 'services',
      data: {
        title: s.title,
        slug: s.slug,
        order: s.order,
        summary: s.summary,
        coverImage: await media(payload, s.cover),
        deliverables: s.deliverables.map((item) => ({ item })),
        story: [{ blockType: 'richText', layout: 'narrow', body: s.body }],
        _status: 'published',
      } as never,
      context: ctx(),
    })
    serviceIds.set(s.slug, doc.id)
    created.push(`área ${s.title}`)
  }

  // Projects
  for (const p of projects) {
    if (await findBy(payload, 'projects', 'slug', p.slug)) continue
    const { cover, story, partners: pk, services: sk, ods, ...rest } = p
    await payload.create({
      collection: 'projects',
      data: {
        ...rest,
        coverImage: await media(payload, cover),
        story: (await resolve(payload, story, new Map())) as never,
        partners: pk.map((k) => partnerIds.get(k)).filter((v): v is number => Boolean(v)),
        services: sk.map((k) => serviceIds.get(k)).filter((v): v is number => Boolean(v)),
        ods: ods.map(String) as never,
        _status: 'published',
      } as never,
      context: ctx(),
    })
    created.push(`projeto ${p.title}`)
  }

  // Pages: first create every missing page (links between pages need their ids)…
  const pageIds = new Map<string, number>()
  const fresh = new Set<string>()
  for (const pg of pages) {
    const existing = await findBy(payload, 'pages', 'slug', pg.slug)
    if (existing) {
      pageIds.set(pg.slug, existing.id)
      continue
    }
    const doc = await payload.create({
      collection: 'pages',
      data: {
        title: pg.title,
        slug: pg.slug,
        layout: [{ blockType: 'pageIntro', heading: pg.title }],
        _status: 'draft',
      } as never,
      draft: true,
      context: ctx(),
    })
    pageIds.set(pg.slug, doc.id)
    fresh.add(pg.slug)
  }
  // …then fill only the pages created now.
  for (const pg of pages) {
    if (!fresh.has(pg.slug)) continue
    await payload.update({
      collection: 'pages',
      id: pageIds.get(pg.slug)!,
      data: {
        layout: (await resolve(payload, pg.layout, pageIds)) as never,
        meta: pg.meta ? { ...pg.meta } : undefined,
        _status: pg.status,
      } as never,
      draft: pg.status === 'draft',
      context: ctx(),
    })
    created.push(`página ${pg.title}`)
  }

  // Globals: only while still empty.
  const fillGlobal = async (
    slug: 'navigation' | 'footer' | 'contact' | 'social' | 'settings',
    isEmpty: (g: Record<string, unknown>) => boolean,
    data: unknown,
  ) => {
    const current = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Record<
      string,
      unknown
    >
    if (!isEmpty(current)) return
    await payload.updateGlobal({
      slug,
      data: (await resolve(payload, data, pageIds)) as never,
      context: ctx(),
    })
    created.push(`configuração ${slug}`)
  }
  const emptyArr = (k: string) => (g: Record<string, unknown>) =>
    !Array.isArray(g[k]) || (g[k] as unknown[]).length === 0
  await fillGlobal('navigation', emptyArr('items'), globals.navigation)
  await fillGlobal('footer', emptyArr('links'), globals.footer)
  await fillGlobal('contact', (g) => !g.email, globals.contact)
  await fillGlobal('social', emptyArr('profiles'), globals.social)
  await fillGlobal('settings', (g) => !g.siteName, globals.settings)

  // Interface texts: saved once with the initial values so the editor sees them filled in.
  const texts = (await payload.findGlobal({ slug: 'site-texts', depth: 0 })) as unknown as Record<
    string,
    Record<string, unknown> | undefined
  >
  if (!texts.common?.skipLink) {
    const data = Object.fromEntries(
      Object.entries(SITE_TEXTS).map(([group, entries]) => {
        const { _label: _drop, ...rest } = entries as Record<string, string>
        return [group, rest]
      }),
    )
    await payload.updateGlobal({ slug: 'site-texts', data: data as never, context: ctx() })
    created.push('textos do site')
  }

  log(created.length ? `criado: ${created.join(', ')}` : 'nada a criar (tudo já existe)')
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed] falhou', err)
  process.exit(1)
})
