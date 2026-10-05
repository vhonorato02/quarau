import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Skip Payload (admin/api), Next internals, route handlers under /next, static files and legacy WP paths.
  matcher: ['/((?!api|admin|next|_next|_vercel|brand|fonts|media|stats|wp-content|monitoring|.*\\..*).*)'],
}
