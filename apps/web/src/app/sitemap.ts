import type { MetadataRoute } from 'next'

import { buildSitemap, type SitemapDoc } from '@/lib/sitemap'
import { siteUrl } from '@/lib/platform-env'
import type { RoutableCollection } from '@/lib/urls'
import { getPayload } from '@/server/payload'

// Runtime: reflects publishing immediately and depends on SITE_URL of the running environment.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload()
    const collections: RoutableCollection[] = ['pages', 'projects', 'services', 'news']
    const docs: SitemapDoc[] = (
      await Promise.all(
        collections.map(async (collection) => {
          const res = await payload.find({
            collection,
            where: { _status: { equals: 'published' } },
            select: { slug: true, updatedAt: true },
            depth: 0,
            limit: 1000,
            pagination: false,
          })
          return res.docs.map((d) => ({
            collection,
            slug: String((d as { slug?: string }).slug ?? ''),
            updatedAt: d.updatedAt,
          }))
        }),
      )
    ).flat()
    const hasNews = docs.some((d) => d.collection === 'news')
    return buildSitemap({ siteUrl: siteUrl(), docs: docs.filter((d) => d.slug), hasNews })
  } catch {
    return []
  }
}
