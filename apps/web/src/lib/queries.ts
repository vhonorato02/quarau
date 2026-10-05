import 'server-only'

import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import type { Where } from 'payload'

import type { Locale } from '../i18n/routing'
import type {
  Contact,
  Footer,
  Job,
  Media,
  Navigation,
  News,
  Page,
  Partner,
  Project,
  Service,
  SiteSetting,
  Social,
  Team,
  Document as DocumentDoc,
} from '../payload-types'
import { tags } from './cache-tags'
import { getPayload } from './payload'

type Routable = 'pages' | 'projects' | 'services' | 'news' | 'jobs'
type DocFor<C extends Routable> = C extends 'pages'
  ? Page
  : C extends 'projects'
    ? Project
    : C extends 'services'
      ? Service
      : C extends 'news'
        ? News
        : Job

const REVALIDATE = 60 * 60 * 24 // safety net; publishing revalidates on demand

async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/** Wraps a CMS query with Next's data cache (tag-invalidated) unless draft mode is on. */
async function cached<T>(
  keyParts: string[],
  cacheTags: string[],
  fn: (draft: boolean) => Promise<T>,
): Promise<T> {
  const draft = await isDraft()
  if (draft) return fn(true)
  return unstable_cache(() => fn(false), keyParts, { tags: cacheTags, revalidate: REVALIDATE })()
}

export async function getDocBySlug<C extends Routable>(
  collection: C,
  slug: string,
  locale: Locale = 'pt',
): Promise<DocFor<C> | null> {
  return cached(
    ['doc', collection, slug, locale],
    [tags.collection(collection), tags.doc(collection, slug)],
    async (draft) => {
      const payload = await getPayload()
      const res = await payload.find({
        collection,
        where: { slug: { equals: slug } },
        locale,
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

export async function listDocs<C extends Routable | 'team' | 'partners' | 'documents'>(
  collection: C,
  opts: { locale?: Locale; limit?: number; sort?: string; where?: Where; depth?: number } = {},
) {
  const { locale = 'pt', limit = 100, sort, where, depth = 1 } = opts
  return cached(
    [
      'list',
      collection,
      locale,
      String(limit),
      sort ?? '',
      JSON.stringify(where ?? {}),
      String(depth),
    ],
    [tags.collection(collection)],
    async (draft) => {
      const payload = await getPayload()
      const hasDrafts = ['pages', 'projects', 'services', 'news', 'jobs'].includes(collection)
      const res = await payload.find({
        collection,
        locale,
        limit,
        depth,
        sort,
        draft: hasDrafts ? draft : undefined,
        where:
          hasDrafts && !draft
            ? { and: [{ _status: { equals: 'published' } }, ...(where ? [where] : [])] }
            : where,
        pagination: false,
      })
      return res.docs as unknown as Array<
        C extends Routable
          ? DocFor<C>
          : C extends 'team'
            ? Team
            : C extends 'partners'
              ? Partner
              : DocumentDoc
      >
    },
  )
}

type GlobalMap = {
  navigation: Navigation
  footer: Footer
  contact: Contact
  social: Social
  'site-settings': SiteSetting
}

export async function getGlobal<G extends keyof GlobalMap>(
  slug: G,
  locale: Locale = 'pt',
): Promise<GlobalMap[G]> {
  return cached(['global', slug, locale], [tags.global(slug)], async () => {
    const payload = await getPayload()
    return (await payload.findGlobal({ slug, locale, depth: 1 })) as GlobalMap[G]
  })
}

export async function getRedirects() {
  return cached(['redirects'], [tags.collection('redirects')], async () => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'redirects',
      limit: 1000,
      depth: 1,
      pagination: false,
    })
    return res.docs
  })
}

export async function getMediaByLegacyPath(legacyPath: string): Promise<Media | null> {
  return cached(['legacy-media', legacyPath], [tags.collection('media')], async () => {
    const payload = await getPayload()
    const res = await payload.find({
      collection: 'media',
      where: { legacyUrl: { like: legacyPath } },
      limit: 1,
      depth: 0,
      pagination: false,
    })
    return (res.docs[0] as Media | undefined) ?? null
  })
}

/** Everything the sitemap needs, in one cached call. */
export async function getSitemapEntries() {
  return cached(['sitemap'], [tags.sitemap], async () => {
    const payload = await getPayload()
    const collections: Routable[] = ['pages', 'projects', 'services', 'news', 'jobs']
    const out: Array<{ collection: Routable; slug: string; updatedAt: string }> = []
    for (const collection of collections) {
      const res = await payload.find({
        collection,
        where: { _status: { equals: 'published' } },
        limit: 1000,
        depth: 0,
        pagination: false,
        select: { slug: true, updatedAt: true },
      })
      for (const d of res.docs as Array<{ slug?: string | null; updatedAt: string }>) {
        if (d.slug) out.push({ collection, slug: d.slug, updatedAt: d.updatedAt })
      }
    }
    return out
  })
}
