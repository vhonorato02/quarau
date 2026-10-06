import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { deleteDocuments, upsertDocuments, type SearchDoc } from '../lib/search'
import { docPath, type RoutableCollection } from '../lib/urls'
import { lexicalToText, truncate } from '../utilities/lexical'

export type Indexable = 'pages' | 'projects' | 'services' | 'news'

type AnyDoc = Record<string, unknown> & {
  id: number | string
  slug?: string
  title?: string
  _status?: string
  publishedAt?: string | null
}

/** Collects searchable text from rich text fields and page-builder blocks. */
export function extractText(doc: AnyDoc): string {
  const parts: string[] = []
  const visit = (value: unknown, key?: string) => {
    if (!value) return
    if (typeof value === 'string') {
      if (
        key &&
        [
          'blockType',
          'id',
          'slug',
          'url',
          'tone',
          'variant',
          'layout',
          'mode',
          '_status',
          'blockName',
        ].includes(key)
      )
        return
      if (/^[a-f0-9-]{20,}$/i.test(value)) return
      parts.push(value)
      return
    }
    if (Array.isArray(value)) return value.forEach((v) => visit(v))
    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>
      if ('root' in obj) return void parts.push(lexicalToText(obj))
      if ('mimeType' in obj || 'filename' in obj) return // populated uploads
      for (const [k, v] of Object.entries(obj)) {
        if (
          [
            'meta',
            'createdBy',
            'updatedAt',
            'createdAt',
            'publishedAt',
            'gallery',
            'related',
          ].includes(k)
        )
          continue
        visit(v, k)
      }
    }
  }
  for (const [k, v] of Object.entries(doc)) {
    if (
      ['title', 'slug', 'id', 'meta', '_status', 'createdBy', 'updatedAt', 'createdAt'].includes(k)
    )
      continue
    visit(v, k)
  }
  return parts
    .join('\n')
    .replace(/\n{2,}/g, '\n')
    .slice(0, 20_000)
}

function imageUrl(doc: AnyDoc): string | null {
  const candidate = (doc.heroImage ?? doc.coverImage ?? (doc.meta as AnyDoc | undefined)?.image) as
    { sizes?: { card?: { url?: string } }; url?: string } | undefined
  return candidate?.sizes?.card?.url ?? candidate?.url ?? null
}

export function toSearchDoc(collection: Indexable, doc: AnyDoc, locale = 'pt'): SearchDoc {
  const body = extractText(doc)
  const summary = (doc.summary ?? doc.excerpt ?? (doc.meta as AnyDoc | undefined)?.description) as
    string | undefined
  return {
    id: `${collection}_${doc.id}_${locale}`,
    collection,
    title: String(doc.title ?? ''),
    excerpt: truncate(summary || body, 220),
    body,
    url: docPath(collection as RoutableCollection, doc.slug),
    image: imageUrl(doc),
    locale,
    publishedAt: doc.publishedAt ? Date.parse(doc.publishedAt) : null,
  }
}

export const syncSearch =
  (collection: Indexable): CollectionAfterChangeHook<AnyDoc> =>
  async ({ doc, req }) => {
    if (req.context?.disableSearchSync) return doc
    const locale = typeof req.locale === 'string' && req.locale !== 'all' ? req.locale : 'pt'
    try {
      if (doc._status === 'published' || doc._status === undefined) {
        // Re-read at depth 1 so uploads (cover image) are populated.
        const full = (await req.payload.findByID({
          collection,
          id: doc.id,
          depth: 1,
          locale: locale as 'pt',
          req,
        })) as unknown as AnyDoc
        await upsertDocuments([toSearchDoc(collection, full, locale)])
      } else {
        await deleteDocuments([`${collection}_${doc.id}_${locale}`])
      }
    } catch (err) {
      req.payload.logger.warn(
        { err, collection, id: doc.id },
        'search sync failed (index may be stale)',
      )
    }
    return doc
  }

export const removeFromSearch =
  (collection: Indexable): CollectionAfterDeleteHook<AnyDoc> =>
  async ({ doc, req }) => {
    try {
      await deleteDocuments(['pt', 'en', 'es'].map((l) => `${collection}_${doc.id}_${l}`))
    } catch (err) {
      req.payload.logger.warn({ err }, 'search delete failed')
    }
    return doc
  }
