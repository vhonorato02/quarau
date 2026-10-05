import type { NextRequest } from 'next/server'

import { getMediaByLegacyPath } from '@/lib/queries'

/**
 * 301 for old WordPress media URLs (/wp-content/uploads/2023/12/foto-1024x683.jpg)
 * to the migrated file. Size suffixes and "-scaled" variants map to the original.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const rel = path.join('/')
  const original = rel.replace(/-\d+x\d+(?=\.\w+$)/, '')
  const candidates = Array.from(new Set([rel, original, original.replace(/-scaled(?=\.\w+$)/, '')]))
  for (const c of candidates) {
    const media = await getMediaByLegacyPath(`%/wp-content/uploads/${c}`).catch(() => null)
    if (media?.url) {
      return new Response(null, { status: 301, headers: { Location: media.url, 'Cache-Control': 'public, max-age=86400' } })
    }
  }
  return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'public, max-age=3600' } })
}
