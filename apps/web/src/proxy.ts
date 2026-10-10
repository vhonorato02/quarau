import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'

import { routing } from './i18n/routing'

const intl = createMiddleware(routing)

export default function proxy(req: NextRequest) {
  const res = intl(req)
  // Temporary domain / staging: keep search engines out until go-live (SITE_NOINDEX=false).
  if (process.env.SITE_NOINDEX !== 'false') res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = {
  // Skip Payload (admin/api), Next internals, route handlers under /next, static files and legacy WP paths.
  matcher: [
    '/((?!api|admin|next|_next|_vercel|brand|fonts|media|stats|wp-content|monitoring|.*\\..*).*)',
  ],
}
