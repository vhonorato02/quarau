import { absoluteUrl, docPath, HOME_SLUG, type RoutableCollection } from './urls'

export type SitemapDoc = { collection: RoutableCollection; slug: string; updatedAt?: string | null }
export type SitemapEntry = { url: string; lastModified?: Date; priority: number }

/** Sitemap entries from the published documents (src/app/sitemap.ts feeds it). */
export function buildSitemap({
  siteUrl,
  docs,
  hasNews,
}: {
  siteUrl: string
  docs: SitemapDoc[]
  hasNews: boolean
}): SitemapEntry[] {
  const seen = new Set<string>()
  const entries: SitemapEntry[] = []
  const sorted = [...docs].sort(
    (a, b) =>
      Number(b.slug === HOME_SLUG && b.collection === 'pages') -
      Number(a.slug === HOME_SLUG && a.collection === 'pages'),
  )
  for (const d of sorted) {
    if (
      !hasNews &&
      (d.collection === 'news' || (d.collection === 'pages' && d.slug === 'noticias'))
    )
      continue
    const url = absoluteUrl(docPath(d.collection, d.slug), siteUrl)
    if (seen.has(url)) continue
    seen.add(url)
    const isHome = d.collection === 'pages' && d.slug === HOME_SLUG
    entries.push({
      url,
      lastModified: d.updatedAt ? new Date(d.updatedAt) : undefined,
      priority: isHome ? 1 : d.collection === 'pages' ? 0.8 : 0.6,
    })
  }
  return entries
}

export type Robots = {
  rules: Array<{ userAgent: string; allow?: string; disallow: string | string[] }>
  sitemap?: string
}

export function buildRobots({ siteUrl, noindex }: { siteUrl: string; noindex: boolean }): Robots {
  if (noindex) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next', '/busca'] }],
    sitemap: absoluteUrl('/sitemap.xml', siteUrl),
  }
}
