import type { CollectionBeforeChangeHook, FieldHook } from 'payload'

/** Stamps the creating user (used by author-level access control). */
export const setCreatedBy: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' && req.user && !data.createdBy) {
    data.createdBy = req.user.id
  }
  return data
}

/** Sets publishedAt the first time a document is published. */
export const populatePublishedAt: FieldHook = ({ siblingData, value }) => {
  if (!value && siblingData?._status === 'published') return new Date().toISOString()
  return value
}
