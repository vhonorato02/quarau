import type { NextRequest } from 'next/server'

import { reindexAll } from '@/lib/bootstrap'
import { getPayload } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** POST /next/reindex  Authorization: Bearer $REVALIDATE_SECRET — rebuilds the Meilisearch index. */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 })
  }
  const payload = await getPayload()
  const count = await reindexAll(payload)
  return Response.json({ ok: true, indexed: count })
}
