import 'server-only'

import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Where } from 'payload'

import { mergeTexts, type SiteTexts } from '../cms/globals/site-texts'
import { tags } from '../lib/cache-tags'
import { normalizeText } from '../lib/normalize'
import type { RoutableCollection } from '../lib/urls'
import type { Config, News, Page, Partner, Project, Service } from '../payload-types'
import { getPayload } from './payload'

type DocFor<C extends RoutableCollection> = C extends 'pages'
  ? Page
  : C extends 'projects'
    ? Project
    : C extends 'services'
      ? Service
      : News

type GlobalSlug = keyof Config['globals']

/** Safety net only: publishing in the CMS revalidates on demand (cms/hooks/revalidate.ts). */
const REVALIDATE = 60 * 60 * 24

async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/** CMS query through Next's data cache (tag-invalidated), bypassed in draft mode (live preview). */
async function cached<T>(
  key: string[],
  cacheTags: string[],
  fn: (draft: boolean) => Promise<T>,
): Promise<T> {
  if (await isDraft()) return fn(true)
  return unstable_cache(() => fn(false), key, { tags: cacheTags, revalidate: REVALIDATE })()
}

const published: Where = { _status: { equals: 'published' } }

export async function getDocBySlug<C extends RoutableCollection>(
  collection: C,
  slug: string,
): Promise<DocFor<C> | null> {
  return cached(
    ['doc', collection, slug],
    [tags.collection(collection), tags.doc(collection, slug), tags.collection('media')],
    async (draft) => {
      const payload = await getPayload()
      const res = await payload.find({
        collection,
        where: { slug: { equals: slug } },
        draft,
        depth: 2,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
      })
      return (res.docs[0] as DocFor<C> | undefined) ?? null
    },
  )
}

/** Slugs for generateStaticParams (published only). */
export async function listSlugs(collection: RoutableCollection): Promise<string[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection,
    where: published,
    select: { slug: true },
    limit: 500,
    pagination: false,
    depth: 0,
  })
  return res.docs.map((d) => (d as { slug?: string }).slug).filter((s): s is string => Boolean(s))
}

export type ProjectSelection = {
  mode?: 'all' | 'featured' | 'manual' | null
  ids?: number[]
  limit?: number | null
}

export async function listProjects(sel: ProjectSelection = {}): Promise<Project[]> {
  const mode = sel.mode ?? 'all'
  return cached(
    ['projects', mode, (sel.ids ?? []).join(','), String(sel.limit ?? '')],
    [tags.collection('projects'), tags.collection('media')],
    async () => {
      const payload = await getPayload()
      if (mode === 'manual') {
        if (!sel.ids?.length) return []
        const res = await payload.find({
          collection: 'projects',
          where: { and: [published, { id: { in: sel.ids } }] },
          depth: 1,
          limit: 100,
          pagination: false,
        })
        const byId = new Map(res.docs.map((d) => [d.id, d]))
        return sel.ids.map((id) => byId.get(id)).filter((d): d is Project => Boolean(d))
      }
      const where: Where =
        mode === 'featured' ? { and: [published, { featured: { equals: true } }] } : published
      const res = await payload.find({
        collection: 'projects',
        where,
        sort: 'order',
        depth: 1,
        limit: sel.limit ?? 100,
        pagination: false,
      })
      return res.docs
    },
  )
}

/** The project that follows this one in the list order (wraps around). */
export async function nextProject(current: Project): Promise<Project | null> {
  const all = await listProjects()
  if (all.length < 2) return null
  const i = all.findIndex((p) => p.id === current.id)
  return all[(i + 1) % all.length] ?? null
}

export async function projectsForService(serviceId: number): Promise<Project[]> {
  const all = await listProjects()
  return all.filter((p) =>
    (p.services ?? []).some((s) => (typeof s === 'object' ? s.id : s) === serviceId),
  )
}

export async function listServices(): Promise<Service[]> {
  return cached(['services'], [tags.collection('services'), tags.collection('media')], async () => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'services',
      where: published,
      sort: 'order',
      depth: 1,
      limit: 50,
      pagination: false,
    })
    return res.docs
  })
}

export async function listNews(limit = 12): Promise<News[]> {
  return cached(
    ['news', String(limit)],
    [tags.collection('news'), tags.collection('media')],
    async () => {
      const payload = await getPayload()
      const res = await payload.find({
        collection: 'news',
        where: published,
        sort: '-publishedAt',
        depth: 1,
        limit,
        pagination: false,
      })
      return res.docs
    },
  )
}

export async function hasPublishedNews(): Promise<boolean> {
  return (await listNews(1)).length > 0
}

export async function listPartners(onlyStrip = true): Promise<Partner[]> {
  return cached(['partners', String(onlyStrip)], [tags.collection('partners')], async () => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'partners',
      where: onlyStrip ? { showOnHome: { equals: true } } : {},
      sort: 'order',
      depth: 0,
      limit: 50,
      pagination: false,
    })
    return res.docs
  })
}

/**
 * The Docker/Vercel build runs without a database (pages render on first visit). The only thing the
 * build prerenders is the generic 404 shell, so there — and only there — globals fall back to empty.
 * At runtime a database error still surfaces (error page, health check), never silently.
 */
const isBuild = () => process.env.NEXT_PHASE === 'phase-production-build'

export async function getGlobal<S extends GlobalSlug>(slug: S): Promise<Config['globals'][S]> {
  try {
    return await cached(
      ['global', slug],
      [tags.global(slug), tags.collection('media')],
      async (draft) => {
        const payload = await getPayload()
        return payload.findGlobal({ slug, depth: 1, draft }) as Promise<Config['globals'][S]>
      },
    )
  } catch (err) {
    if (isBuild()) return {} as Config['globals'][S]
    throw err
  }
}

export async function getTexts(): Promise<SiteTexts> {
  return mergeTexts((await getGlobal('site-texts')) as never)
}

export type RedirectRule = { from: string; to: string; type: '301' | '302' }

export async function getRedirects(): Promise<RedirectRule[]> {
  return cached(['redirects'], [tags.redirects, tags.collection('redirects')], async () => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'redirects',
      depth: 1,
      limit: 1000,
      pagination: false,
    })
    const { resolveRedirectTarget } = await import('../lib/redirects')
    return res.docs.flatMap((r) => {
      const to = resolveRedirectTarget(r.to as never)
      return to ? [{ from: r.from, to, type: (r.type ?? '301') as '301' | '302' }] : []
    })
  })
}

export type SearchHit = {
  collection: RoutableCollection
  slug: string
  title: string
  summary?: string | null
}

/** Accent-insensitive search over published content (field `searchText`, see cms/fields/search.ts). */
export async function search(query: string): Promise<SearchHit[]> {
  const terms = normalizeText(query)
    .split(' ')
    .filter((t) => t.length >= 2)
    .slice(0, 6)
  if (!terms.length) return []
  const payload = await getPayload()
  const where: Where = { and: [published, ...terms.map((t) => ({ searchText: { like: t } }))] }
  const collections: RoutableCollection[] = ['projects', 'services', 'pages', 'news']
  const results = await Promise.all(
    collections.map(async (collection) => {
      const res = await payload.find({
        collection,
        where,
        depth: 0,
        limit: 20,
        pagination: false,
        select: { slug: true, title: true, summary: true } as never,
      })
      return res.docs.map((d) => {
        const doc = d as { slug: string; title: string; summary?: string | null }
        return { collection, slug: doc.slug, title: doc.title, summary: doc.summary }
      })
    }),
  )
  return results.flat()
}

/** Media migrated from WordPress, looked up by its old URL (`legacyUrl LIKE %/wp-content/uploads/<path>`). */
export async function getMediaByLegacyPath(
  pattern: string,
): Promise<{ url?: string | null } | null> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'media',
    where: { legacyUrl: { like: pattern } },
    depth: 0,
    limit: 1,
    pagination: false,
    // url is computed from filename: both are needed.
    select: { url: true, filename: true } as never,
  })
  return (res.docs[0] as { url?: string | null } | undefined) ?? null
}
