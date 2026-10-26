import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { getPayload } from '@/server/payload'

/**
 * Turns on draft mode for the CMS live preview and the "Visualizar" button.
 * Only a logged-in editor (Payload session cookie) can see drafts; no secret in the URL.
 */
export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path') ?? '/'
  // Same-origin paths only: resolving against a dummy origin catches //host, /\host and the like.
  const target = new URL(path, 'http://preview.invalid')
  if (target.origin !== 'http://preview.invalid' || !path.startsWith('/')) {
    return new Response('Invalid path', { status: 400 })
  }
  const payload = await getPayload()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Login required', { status: 401 })
  ;(await draftMode()).enable()
  redirect(`${target.pathname}${target.search}`)
}
