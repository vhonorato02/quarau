import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

import { tags } from '@/lib/cache-tags'

const COLLECTIONS = ['pages', 'projects', 'services', 'news', 'partners', 'media', 'redirects']
const GLOBALS = ['navigation', 'footer', 'contact', 'social', 'settings', 'site-texts']

/**
 * On-demand revalidation for scripts (seed, restores, deploy warm-up).
 * POST /next/revalidate  Authorization: Bearer $REVALIDATE_SECRET  body: { "all": true } | { "tags": [...] }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 })
  }
  const body = (await req.json().catch(() => ({}))) as { all?: boolean; tags?: unknown }
  const list = body.all
    ? [
        ...COLLECTIONS.map(tags.collection),
        ...GLOBALS.map(tags.global),
        tags.redirects,
        tags.sitemap,
      ]
    : (Array.isArray(body.tags) ? body.tags : [])
        .filter((t): t is string => typeof t === 'string')
        .slice(0, 100)
  for (const t of list) revalidateTag(t, { expire: 0 })
  if (body.all) revalidatePath('/', 'layout')
  return Response.json({ ok: true, revalidated: list.length })
}
