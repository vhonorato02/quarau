import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/urls'

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
