import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

import { tags } from '@/lib/cache-tags'

const ALL = [
  'pages',
  'projects',
  'services',
  'news',
  'jobs',
  'team',
  'partners',
  'documents',
  'media',
  'redirects',
]
const GLOBALS = ['navigation', 'footer', 'contact', 'social', 'site-settings']

/**
 * On-demand revalidation for scripts (WP migration, restores, deploy warm-up).
 * POST /next/revalidate  Authorization: Bearer $REVALIDATE_SECRET  body: { "all": true } | { "tags": [...] }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 })
  }
  const body = (await req.json().catch(() => ({}))) as { all?: boolean; tags?: string[] }
  const list = body.all
    ? [...ALL.map(tags.collection), ...GLOBALS.map(tags.global), tags.sitemap]
    : (body.tags ?? []).filter((t) => typeof t === 'string').slice(0, 100)
  for (const t of list) revalidateTag(t, { expire: 0 })
  if (body.all) revalidatePath('/', 'layout')
  return Response.json({ ok: true, revalidated: list.length })
}
