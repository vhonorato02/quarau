import 'server-only'

import type { Metadata } from 'next'
import { notFound, permanentRedirect, redirect } from 'next/navigation'

import { matchRedirect } from '@/lib/redirects'
import { docPath, type RoutableCollection } from '@/lib/urls'

import { getDocBySlug, getGlobal, getRedirects } from './queries'
import { buildMetadata } from './seo'

/** Pages are rendered on first request and cached; the build does not need the database. */
export function staticParams() {
  return [] as Array<{ slug: string }>
}

/** Missing document: follow a redirect created in the CMS, otherwise 404. */
export async function notFoundOrRedirect(path: string): Promise<never> {
  const rule = matchRedirect(path, await getRedirects().catch(() => []))
  if (rule) {
    if (rule.type === '302') redirect(rule.to)
    permanentRedirect(rule.to)
  }
  notFound()
}

export async function loadDoc<C extends RoutableCollection>(collection: C, slug: string) {
  const doc = await getDocBySlug(collection, slug)
  if (!doc) return notFoundOrRedirect(docPath(collection, slug))
  return doc
}

type SeoDoc = {
  title: string
  slug?: string | null
  summary?: string | null
  coverImage?: unknown
  publishedAt?: string | null
  meta?: { title?: string | null; description?: string | null; image?: unknown } | null
}

export async function docMetadata(
  collection: RoutableCollection,
  slug: string,
  type: 'website' | 'article' = 'website',
): Promise<Metadata> {
  const [doc, settings] = await Promise.all([getDocBySlug(collection, slug), getGlobal('settings')])
  if (!doc) return { title: settings.siteName, robots: { index: false } }
  const d = doc as unknown as SeoDoc
  return buildMetadata({
    title: d.title,
    description: d.summary,
    path: docPath(collection, d.slug),
    meta: d.meta as never,
    image: d.coverImage as never,
    type,
    publishedTime: type === 'article' ? d.publishedAt : null,
    settings,
  })
}
