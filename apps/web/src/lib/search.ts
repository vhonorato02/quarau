import 'server-only'

import { Meilisearch, type Index } from 'meilisearch'

import { env } from './env'

export type SearchDoc = {
  id: string
  collection: 'pages' | 'projects' | 'services' | 'news'
  title: string
  excerpt: string
  body: string
  url: string
  image?: string | null
  locale: string
  publishedAt?: number | null
}

let client: Meilisearch | null | undefined

export function searchClient(): Meilisearch | null {
  if (client !== undefined) return client
  const { MEILI_HOST, MEILI_MASTER_KEY } = env()
  client = MEILI_HOST ? new Meilisearch({ host: MEILI_HOST, apiKey: MEILI_MASTER_KEY }) : null
  return client
}

export function searchIndex(): Index<SearchDoc> | null {
  const c = searchClient()
  return c ? c.index<SearchDoc>(env().MEILI_INDEX) : null
}

let configured = false

/** Idempotent index settings: Portuguese-friendly ranking, filters and highlighting. */
export async function ensureIndex(): Promise<void> {
  const c = searchClient()
  if (!c || configured) return
  const name = env().MEILI_INDEX
  try {
    await c.createIndex(name, { primaryKey: 'id' }).waitTask()
  } catch {
    /* already exists */
  }
  await c
    .index(name)
    .updateSettings({
      searchableAttributes: ['title', 'excerpt', 'body'],
      filterableAttributes: ['collection', 'locale'],
      sortableAttributes: ['publishedAt'],
      displayedAttributes: ['id', 'collection', 'title', 'excerpt', 'url', 'image', 'locale', 'publishedAt'],
      typoTolerance: { minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
      localizedAttributes: [{ attributePatterns: ['title', 'excerpt', 'body'], locales: ['por'] }],
    })
    .waitTask()
  configured = true
}

export async function upsertDocuments(docs: SearchDoc[]): Promise<void> {
  const idx = searchIndex()
  if (!idx || docs.length === 0) return
  await ensureIndex()
  await idx.addDocuments(docs).waitTask()
}

export async function deleteDocuments(ids: string[]): Promise<void> {
  const idx = searchIndex()
  if (!idx || ids.length === 0) return
  await idx.deleteDocuments(ids).waitTask()
}

export type SearchHit = Omit<SearchDoc, 'body'> & { _formatted?: Partial<Record<'title' | 'excerpt', string>> }

export async function search(query: string, { locale = 'pt', limit = 20 } = {}): Promise<{
  hits: SearchHit[]
  total: number
  available: boolean
}> {
  const idx = searchIndex()
  if (!idx) return { hits: [], total: 0, available: false }
  const q = query.trim().slice(0, 120)
  if (!q) return { hits: [], total: 0, available: true }
  const res = await idx.search(q, {
    limit,
    filter: [`locale = "${locale.replace(/"/g, '')}"`],
    attributesToHighlight: ['title', 'excerpt'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    attributesToCrop: ['excerpt'],
    cropLength: 32,
  })
  return { hits: res.hits as SearchHit[], total: res.estimatedTotalHits ?? res.hits.length, available: true }
}
