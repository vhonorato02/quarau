/**
 * Idempotent migration of quarau.com.br (WordPress) into Payload.
 *
 *   pnpm migrate:wp            # full run
 *   pnpm migrate:wp --dry-run  # only reports what would change
 *
 * - Reads the live WordPress site only (never writes to it).
 * - Media is matched by `legacyUrl`, documents by `slug` and globals are upserted,
 *   so the script can be re-run safely; it updates content in place.
 * - Downloads are cached in apps/web/.migrate-cache. Videos are transcoded to
 *   web-friendly 720p H.264 (≈1.8 Mbps) with ffmpeg when available.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getPayload, type Payload } from 'payload'

import config from '../src/payload.config'
import { projects, type ProjectSeed } from './content/projects'
import { globals, pages, partners, services } from './content/site'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE = path.resolve(dirname, '../.migrate-cache')
const DRY = process.argv.includes('--dry-run')
/** Fresh object per call: Payload mutates `context` during uploads, so it must never be shared. */
const ctx = () => ({ disableRevalidate: true })

const stats = { mediaCreated: 0, mediaReused: 0, mediaRepaired: 0, docsCreated: 0, docsUpdated: 0, globals: 0, warnings: [] as string[] }
const log = (...a: unknown[]) => console.info('[migrate]', ...a)

// ---------- alt text ----------
const ALT_HINTS: Array<[RegExp, string]> = [
  [/Plantio_Florestinha/i, 'Jovens plantam mudas de árvores em ação de plantio comunitário'],
  [/Meliponicultura/i, 'Oficina de meliponicultura (criação de abelhas sem ferrão)'],
  [/IMG_6121/i, 'Participante cuida dos canteiros da horta comunitária do Projeto Ecoe Verde'],
  [/Feira-de-Sabere?s?-e-Fazeres/i, 'Feira de Saberes e Fazeres'],
  [/Roda[-_]de[-_]?[Cc]onversa/i, 'Roda de conversa com a comunidade'],
  [/Visita_Atibaia/i, 'Visita técnica ao Projeto Ecoe Verde, em Atibaia (SP)'],
  [/Museu-Vivo/i, 'Atividade do Museu Vivo no Museu do Folclore de São José dos Campos'],
  [/Terno-de-Congo/i, 'Terno de Congo de Sainhas Irmãos Paiva'],
  [/PEP-\d+/i, 'Ação do Programa de Educação Patrimonial da Fundação Cultural Cassiano Ricardo'],
  [/Horta-Vila-Esmeralda/i, 'Horta comunitária da Vila Esmeralda, em Atibaia (SP)'],
  [/Areas-produtivas/i, 'Mapa das áreas produtivas da horta da Vila Esmeralda'],
  [/Instituicoes-parceiras/i, 'Mapa das instituições parceiras do Projeto Ecoe Verde'],
  [/Projeto-Ecoe-Localizacao/i, 'Mapa de localização do Projeto Ecoe Verde em Atibaia (SP)'],
  [/Mapa-geral-Quipa/i, 'Mapa geral do Projeto Quipá em São João do Piauí (PI)'],
  [/A0\.png$/i, 'Mapa da área de abrangência do Ecomuseu dos Campos de São José'],
  [/Capa-26o-Colecao/i, 'Capa do livro “O Museu do Folclore de São José dos Campos: Uma Breve História”'],
  [/Screenshot-2023-12-13-101801/i, 'Capa da publicação “O Saber e o Fazer no Museu do Folclore”'],
  [/Screenshot-2023-12-13-101601/i, 'Capa da publicação “O Saber e o Fazer no Museu do Folclore II”'],
  [/Screenshot-2023-12-13-101508/i, 'Capa do livro da pesquisa de patrimônio imaterial'],
  [/Untitled-design-3/i, 'Logotipo da Quarau — Projetos Socioambientais, Educativos e Culturais'],
  [/Fachada-do-Museu/i, 'Fachada do Museu do Folclore de São José dos Campos'],
]

function credit(url: string): string | undefined {
  return /Fabio-Bueno/i.test(url) ? 'Fabio Bueno' : undefined
}

function altFor(url: string, context: string): { alt: string; reviewed: boolean } {
  for (const [re, text] of ALT_HINTS) if (re.test(url)) return { alt: text, reviewed: true }
  return { alt: `${context} — registro fotográfico`, reviewed: false }
}

// ---------- downloads ----------
async function download(url: string): Promise<string> {
  const rel = url.replace(/^https?:\/\/[^/]+\/wp-content\/uploads\//, '')
  const file = path.join(CACHE, 'uploads', rel)
  if (existsSync(file) && (await stat(file)).size > 0) return file
  await mkdir(path.dirname(file), { recursive: true })
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(300_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await writeFile(file, Buffer.from(await res.arrayBuffer()))
      return file
    } catch (err) {
      if (attempt === 4) throw new Error(`download failed ${url}: ${String(err)}`)
      await new Promise((r) => setTimeout(r, 2 ** attempt * 1000))
    }
  }
  return file
}

function hasFfmpeg(): boolean {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

async function prepareVideo(url: string): Promise<string> {
  const name = path.basename(url)
  const out = path.join(CACHE, 'video', name)
  if (existsSync(out) && (await stat(out)).size > 0) return out
  const src = await download(url)
  if (!hasFfmpeg()) {
    stats.warnings.push(`ffmpeg ausente: vídeo ${name} enviado sem otimização`)
    return src
  }
  await mkdir(path.dirname(out), { recursive: true })
  log('transcoding', name)
  // 720p, CRF 28 capped at ~1.8 Mbps: good quality in the page player at a fraction of the size.
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', 'scale=-2:720', '-c:v', 'libx264', '-preset', 'medium', '-crf', '28',
    '-maxrate', '1800k', '-bufsize', '3600k', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '112k', '-movflags', '+faststart', `${out}.tmp.mp4`,
  ])
  execFileSync('mv', [`${out}.tmp.mp4`, out])
  return out
}

// ---------- media ----------
const mediaCache = new Map<string, number>()

const s3 =
  process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY_ID
    ? new S3Client({
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION ?? 'us-east-1',
        forcePathStyle: true,
        credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '' },
      })
    : null

/** True when the stored file behind a media document really exists (self-heals partial runs). */
async function fileExists(filename: string | null | undefined): Promise<boolean> {
  if (!filename) return false
  if (!s3) return existsSync(path.resolve(dirname, '../media', filename))
  try {
    await s3.send(new HeadObjectCommand({ Bucket: process.env.S3_BUCKET ?? 'quarau-media', Key: `media/${filename}` }))
    return true
  } catch {
    return false
  }
}

async function ensureMedia(payload: Payload, url: string, context: string, opts: { alt?: string; caption?: string } = {}): Promise<number | null> {
  if (mediaCache.has(url)) return mediaCache.get(url)!
  const existing = await payload.find({ collection: 'media', where: { legacyUrl: { equals: url } }, limit: 1, depth: 0, pagination: false })
  const found = existing.docs[0]
  if (found && (DRY || (await fileExists(found.filename)))) {
    stats.mediaReused++
    mediaCache.set(url, found.id)
    return found.id
  }
  if (found && !DRY && !(/\.(mp4|webm)$/i.test(url) && process.env.MIGRATE_SKIP_VIDEO === '1')) {
    // Document exists but its file is missing in storage: re-upload in place.
    const isVideo = /\.(mp4|webm)$/i.test(url)
    const filePath = isVideo ? await prepareVideo(url) : await download(url)
    const updated = await payload.update({ collection: 'media', id: found.id, data: {}, filePath, context: ctx(), overwriteExistingFiles: true })
    if (!(await fileExists(updated.filename))) stats.warnings.push(`arquivo ainda ausente após reenvio: ${updated.filename}`)
    stats.mediaRepaired++
    mediaCache.set(url, found.id)
    return found.id
  }
  if (DRY) {
    stats.mediaCreated++
    return null
  }
  if (/\.(mp4|webm)$/i.test(url) && process.env.MIGRATE_SKIP_VIDEO === '1') {
    stats.warnings.push(`vídeo adiado (MIGRATE_SKIP_VIDEO=1): ${path.basename(url)}`)
    return null
  }
  try {
    const isVideo = /\.(mp4|webm)$/i.test(url)
    const filePath = isVideo ? await prepareVideo(url) : await download(url)
    const { alt, reviewed } = opts.alt ? { alt: opts.alt, reviewed: true } : altFor(url, context)
    const doc = await payload.create({
      collection: 'media',
      data: { alt, caption: opts.caption, credit: credit(url), legacyUrl: url, needsReview: !reviewed },
      filePath,
      context: ctx(),
    })
    stats.mediaCreated++
    mediaCache.set(url, doc.id)
    return doc.id
  } catch (err) {
    stats.warnings.push(`mídia não migrada: ${url} (${String(err).slice(0, 160)})`)
    return null
  }
}

// ---------- documents ----------
type Slugged = 'pages' | 'services' | 'projects' | 'partners'

async function upsert(payload: Payload, collection: Slugged, where: Record<string, unknown>, data: Record<string, unknown>) {
  const found = await payload.find({ collection, where: where as never, limit: 1, depth: 0, pagination: false, draft: true })
  const withStatus = collection === 'partners' ? data : { ...data, _status: 'published' }
  if (DRY) {
    found.docs[0] ? stats.docsUpdated++ : stats.docsCreated++
    return found.docs[0]?.id ?? 0
  }
  if (found.docs[0]) {
    await payload.update({ collection, id: found.docs[0].id, data: withStatus as never, context: ctx(), draft: false })
    stats.docsUpdated++
    return found.docs[0].id
  }
  const created = await payload.create({ collection, data: withStatus as never, context: ctx(), draft: false })
  stats.docsCreated++
  return created.id
}

async function idBySlug(payload: Payload, collection: Slugged, slug: string): Promise<number | null> {
  const r = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, pagination: false, draft: true })
  return (r.docs[0]?.id as number | undefined) ?? null
}

type SeedLink = { type: string; ref?: { collection: Slugged; slug: string }; url?: string; label: string; appearance?: string }

async function resolveLink(payload: Payload, l: SeedLink) {
  if (l.type === 'internal' && l.ref) {
    const id = await idBySlug(payload, l.ref.collection, l.ref.slug)
    if (id) return { type: 'internal', reference: { relationTo: l.ref.collection, value: id }, label: l.label, appearance: l.appearance }
    stats.warnings.push(`link interno sem destino: ${l.ref.collection}/${l.ref.slug}`)
  }
  return { type: 'external', url: l.url ?? '/', label: l.label, appearance: l.appearance }
}

/** Replace legacy URLs inside a block definition with media IDs and resolve links. */
async function resolveBlock(payload: Payload, block: Record<string, unknown>, context: string) {
  const out: Record<string, unknown> = { ...block }
  for (const key of ['media', 'poster', 'file']) {
    if (typeof out[key] === 'string') out[key] = await ensureMedia(payload, out[key] as string, context)
  }
  if (Array.isArray(out.images)) {
    const ids = []
    for (const u of out.images as string[]) ids.push(await ensureMedia(payload, u, context))
    out.images = ids.filter(Boolean)
  }
  if (Array.isArray(out.links)) {
    out.links = await Promise.all((out.links as SeedLink[]).map((l) => resolveLink(payload, l)))
  }
  return out
}

async function migrateServices(payload: Payload) {
  for (const s of services) {
    const cover = await ensureMedia(payload, s.cover, s.title)
    await upsert(payload, 'services', { slug: { equals: s.slug } }, {
      title: s.title,
      slug: s.slug,
      summary: s.summary,
      icon: s.icon,
      order: s.order,
      coverImage: cover,
      deliverables: s.deliverables.map((item) => ({ item })),
      body: s.body,
      meta: { title: s.title, description: s.summary, image: cover },
    })
    log('service', s.slug)
  }
}

async function migratePartners(payload: Payload) {
  const ids: Record<string, number> = {}
  for (const p of partners) {
    const logo = 'logo' in p && p.logo ? await ensureMedia(payload, p.logo, p.name, { alt: `Logotipo ${p.fullName}` }) : null
    ids[p.key] = await upsert(payload, 'partners', { name: { equals: p.name } }, {
      name: p.name,
      fullName: p.fullName,
      kind: p.kind,
      logo,
      order: p.order,
      showOnHome: 'showOnHome' in p ? p.showOnHome : true,
    })
  }
  log('partners', Object.keys(ids).length)
  return ids
}

async function migrateProjects(payload: Payload, partnerIds: Record<string, number>) {
  for (const pr of projects as ProjectSeed[]) {
    const cover = await ensureMedia(payload, pr.cover, pr.title)
    const gallery: number[] = []
    for (const g of pr.gallery) {
      const id = await ensureMedia(payload, g, pr.title)
      if (id) gallery.push(id)
    }
    const video = pr.video ? await ensureMedia(payload, pr.video, pr.title, { alt: `Vídeo do projeto ${pr.title}` }) : null
    const serviceIds = (await Promise.all(pr.services.map((s) => idBySlug(payload, 'services', s)))).filter(Boolean)
    const publications = []
    for (const pub of pr.publications ?? []) {
      publications.push({ label: pub.label, url: pub.url, cover: pub.cover ? await ensureMedia(payload, pub.cover, pub.label) : null })
    }
    const chapters = []
    for (const c of pr.chapters ?? []) chapters.push(await resolveBlock(payload, c, pr.title))

    await upsert(payload, 'projects', { slug: { equals: pr.slug } }, {
      title: pr.title,
      slug: pr.slug,
      summary: pr.summary,
      coverImage: cover,
      client: pr.client,
      location: pr.location,
      startYear: pr.startYear ?? null,
      endYear: pr.endYear ?? null,
      role: pr.role,
      partners: pr.partners.map((k) => partnerIds[k]).filter(Boolean),
      services: serviceIds,
      ods: pr.ods.map(String),
      featured: pr.featured,
      accent: pr.accent,
      coordinates: pr.coordinates ?? {},
      highlights: pr.highlights ?? [],
      body: pr.body,
      quote: pr.quote ?? {},
      publications,
      chapters,
      video,
      gallery,
      meta: { title: `${pr.title} — Quarau`, description: pr.summary.slice(0, 160), image: cover },
      publishedAt: new Date().toISOString(),
    })
    log('project', pr.slug, `(${gallery.length} fotos)`)
  }
}

async function migratePages(payload: Payload) {
  const order = ['contato', 'privacidade', 'sobre', 'inicio']
  for (const slug of order) {
    const pg = pages.find((x) => x.slug === slug)!
    const layout = []
    for (const b of pg.layout) layout.push(await resolveBlock(payload, b as Record<string, unknown>, pg.title))
    await upsert(payload, 'pages', { slug: { equals: pg.slug } }, {
      title: pg.title,
      slug: pg.slug,
      layout,
      meta: { title: pg.meta.title, description: pg.meta.description },
      publishedAt: new Date().toISOString(),
    })
    log('page', pg.slug)
  }
}

async function migrateGlobals(payload: Payload) {
  const nav = globals.navigation
  const footer = globals.footer
  const settings = globals['site-settings']
  const data = {
    navigation: {
      items: await Promise.all(nav.items.map((l) => resolveLink(payload, l as SeedLink))),
      cta: await resolveLink(payload, nav.cta as SeedLink),
    },
    footer: {
      tagline: footer.tagline,
      columns: await Promise.all(
        footer.columns.map(async (c) => ({ title: c.title, links: await Promise.all(c.links.map((l) => resolveLink(payload, l as SeedLink))) })),
      ),
    },
    contact: globals.contact,
    social: globals.social,
    'site-settings': {
      ...settings,
      defaultOgImage: await ensureMedia(payload, settings.defaultOgImage, 'Quarau'),
    },
  } as const
  for (const [slug, value] of Object.entries(data)) {
    if (!DRY) await payload.updateGlobal({ slug: slug as keyof typeof data, data: value as never, context: ctx() })
    stats.globals++
  }
  log('globals', Object.keys(data).join(', '))
}

/** Ask the running site (if any) to drop its caches so migrated content shows up at once. */
async function revalidateSite() {
  const url = process.env.SITE_URL
  const secret = process.env.REVALIDATE_SECRET
  if (DRY || !url || !secret) return
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/next/revalidate`, {
      method: 'POST',
      headers: { authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
      body: JSON.stringify({ all: true }),
      signal: AbortSignal.timeout(30_000),
    })
    log('site cache revalidated:', res.status)
  } catch {
    stats.warnings.push('site não respondeu à revalidação (rode novamente com o site no ar)')
  }
}

async function main() {
  await mkdir(CACHE, { recursive: true })
  const payload = await getPayload({ config })
  log(DRY ? 'DRY RUN' : 'starting migration')
  await migrateServices(payload)
  const partnerIds = await migratePartners(payload)
  await migrateProjects(payload, partnerIds)
  await migratePages(payload)
  await migrateGlobals(payload)
  await revalidateSite()
  log('done', JSON.stringify({ ...stats, warnings: stats.warnings.length }))
  for (const w of stats.warnings) console.warn('  ⚠', w)
  process.exit(0)
}

main().catch((err) => {
  console.error('[migrate] failed', err)
  process.exit(1)
})
