import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/platform-env'
import { buildRobots } from '@/lib/sitemap'

// Depends on runtime env (SITE_NOINDEX), so it is not prerendered.
export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  return buildRobots({ siteUrl: siteUrl(), noindex: process.env.SITE_NOINDEX !== 'false' })
}
