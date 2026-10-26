import { NextResponse } from 'next/server'

/** Outside production (SITE_NOINDEX≠false) every response says noindex, read at runtime. */
export default function proxy() {
  const res = NextResponse.next()
  if (process.env.SITE_NOINDEX !== 'false') res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|brand|fonts|favicon.ico).*)'],
}
