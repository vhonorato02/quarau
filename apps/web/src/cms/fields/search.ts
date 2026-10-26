import type { Field, FieldHook } from 'payload'

import { lexicalToText } from '../../lib/lexical'
import { normalizeText } from '../../lib/normalize'

/**
 * Hidden, accent-free copy of the searchable text of a document, kept up to date on save.
 * Search runs a plain `like` on it: "patrimonio" finds "Patrimônio" on any Postgres, no extension needed.
 */
export const searchTextField = (sources: string[]): Field => {
  const build: FieldHook = ({ data, originalDoc }) => {
    const doc = { ...originalDoc, ...data } as Record<string, unknown>
    const parts = sources.map((key) => {
      const v = doc[key]
      if (typeof v === 'string') return v
      if (v && typeof v === 'object' && 'root' in v) return lexicalToText(v)
      return ''
    })
    return normalizeText(parts.join(' ')).slice(0, 20_000)
  }
  return {
    name: 'searchText',
    type: 'textarea',
    index: true,
    admin: { hidden: true },
    access: { read: () => true },
    hooks: { beforeChange: [build] },
  }
}
