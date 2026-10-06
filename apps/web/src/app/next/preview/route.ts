import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** Enables draft mode for the CMS live preview / preview button, then redirects to the page. */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const path = req.nextUrl.searchParams.get('path') ?? '/'
  if (secret !== (process.env.PREVIEW_SECRET ?? 'dev-preview-secret')) {
    return new Response('Invalid preview token', { status: 401 })
  }
  // Same-origin paths only: resolving against a dummy origin catches //host, /\\host and the like.
  const target = new URL(path, 'http://preview.invalid')
  if (target.origin !== 'http://preview.invalid' || !path.startsWith('/')) {
    return new Response('Invalid path', { status: 400 })
  }
  ;(await draftMode()).enable()
  redirect(`${target.pathname}${target.search}${target.hash}`)
}
