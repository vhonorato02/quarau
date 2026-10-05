import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from 'payload'

import { tags } from '../lib/cache-tags'
import { docPath, isRoutable } from '../lib/urls'

/** Immediately expire cached data (publishing must show up at once). */
const expireNow = { expire: 0 } as const

function safely(req: PayloadRequest, fn: () => void) {
  // Revalidation only works inside a Next.js request (not in CLI scripts such as the WP migration).
  if (req.context?.disableRevalidate) return
  try {
    fn()
  } catch (err) {
    req.payload.logger.debug({ err }, 'revalidation skipped (outside Next.js request scope)')
  }
}

function revalidateForDoc(req: PayloadRequest, collection: string, slug?: string | null) {
  safely(req, () => {
    revalidateTag(tags.collection(collection), expireNow)
    revalidateTag(tags.sitemap, expireNow)
    if (slug) revalidateTag(tags.doc(collection, slug), expireNow)
    if (isRoutable(collection) && slug) revalidatePath(docPath(collection, slug))
  })
}

type WithSlug = { id: number | string; slug?: string | null; _status?: string | null }

export const revalidateCollection =
  (collection: string): CollectionAfterChangeHook<WithSlug> =>
  ({ doc, previousDoc, req }) => {
    // Re-render when published, or when a previously published doc changes state/slug.
    if (doc._status === 'published' || previousDoc?._status === 'published' || doc._status === undefined) {
      revalidateForDoc(req, collection, doc.slug)
      if (previousDoc?.slug && previousDoc.slug !== doc.slug) revalidateForDoc(req, collection, previousDoc.slug)
    }
    return doc
  }

export const revalidateCollectionDelete =
  (collection: string): CollectionAfterDeleteHook<WithSlug> =>
  ({ doc, req }) => {
    revalidateForDoc(req, collection, doc?.slug)
    return doc
  }

export const revalidateGlobal =
  (slug: string): GlobalAfterChangeHook =>
  ({ doc, req }) => {
    safely(req, () => {
      revalidateTag(tags.global(slug), expireNow)
      // Globals (menu, footer, contact) appear on every page.
      revalidatePath('/', 'layout')
    })
    return doc
  }
