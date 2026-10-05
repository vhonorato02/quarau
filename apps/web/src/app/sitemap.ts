import type { MetadataRoute } from 'next'

import { getSitemapEntries } from '@/lib/queries'
import { absoluteUrl, docPath } from '@/lib/urls'

// Rendered per request; the underlying query is cached and invalidated on publish.
export const dynamic = 'force-dynamic'

const STATIC = ['/', '/projetos', '/atuacao', '/noticias', '/trabalhe-conosco']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries().catch(() => [])
  const seen = new Set<string>()
  const out: MetadataRoute.Sitemap = []
  const push = (path: string, lastModified?: string, priority = 0.6) => {
    if (seen.has(path)) return
    seen.add(path)
    out.push({ url: absoluteUrl(path), lastModified: lastModified ? new Date(lastModified) : undefined, priority })
  }
  STATIC.forEach((p) => push(p, undefined, p === '/' ? 1 : 0.8))
  for (const e of entries) {
    const path = docPath(e.collection, e.slug)
    push(path, e.updatedAt, e.collection === 'projects' ? 0.8 : 0.6)
  }
  return out
}
