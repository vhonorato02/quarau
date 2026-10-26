import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/urls'

// Depends on runtime env (SITE_NOINDEX), so it must not be prerendered at build time.
export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  // Temporary domain / staging: block everything until go-live (SITE_NOINDEX=false).
  if (process.env.SITE_NOINDEX !== 'false') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next/', '/busca'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
