import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import { cx } from '@quarau/ui'

import { docPath, isRoutable } from '@/lib/urls'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc
  if (!doc || typeof doc.value !== 'object' || !isRoutable(doc.relationTo)) return '/'
  return docPath(doc.relationTo, (doc.value as { slug?: string }).slug)
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

/**
 * Lexical rich text → React. The editor only offers semantic formatting (cms/fields/richText.ts),
 * so content is rendered as React elements: no raw HTML, nothing to sanitize.
 */
export function RichText({ data, className }: { data: unknown; className?: string }) {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      converters={converters}
      disableContainer={false}
      className={cx('q-prose', className)}
    />
  )
}
