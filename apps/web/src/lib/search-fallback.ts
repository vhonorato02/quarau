import type { Where } from 'payload'

import { toSearchDoc, type Indexable } from '@/hooks/search'
import { getPayload } from '@/lib/payload'
import type { SearchHit } from '@/lib/search'

const SOURCES: { collection: Indexable; fields: string[] }[] = [
  { collection: 'projects', fields: ['title', 'summary'] },
  { collection: 'services', fields: ['title', 'summary'] },
  { collection: 'news', fields: ['title', 'summary'] },
  { collection: 'pages', fields: ['title'] },
]

/**
 * Database search (title and summary) for servers that run without Meilisearch, such as the
 * 2 GB VPS. Only published documents, through the public access rules.
 */
export async function searchDatabase(
  query: string,
  { locale = 'pt', limit = 20 } = {},
): Promise<{ hits: SearchHit[]; total: number; available: boolean }> {
  const q = query.trim().slice(0, 120)
  if (!q) return { hits: [], total: 0, available: true }
  const payload = await getPayload()
  const groups = await Promise.all(
    SOURCES.map(async ({ collection, fields }) => {
      const where: Where = {
        and: [
          { or: fields.map((f) => ({ [f]: { like: q } })) },
          { _status: { equals: 'published' } },
        ],
      }
      const res = await payload.find({
        collection,
        where,
        locale: locale as 'pt',
        depth: 1,
        limit,
        overrideAccess: false,
      })
      return res.docs.map((doc) => toSearchDoc(collection, doc as never, locale))
    }),
  )
  const hits = groups
    .flat()
    .slice(0, limit)
    .map(({ body: _body, ...hit }) => hit)
  return { hits, total: hits.length, available: true }
}
