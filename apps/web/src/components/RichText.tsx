import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import { cn } from '@quarau/ui'

import { docPath, type RoutableCollection } from '@/lib/urls'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc
  if (!doc || typeof doc.value !== 'object') return '/'
  return docPath(doc.relationTo as RoutableCollection, (doc.value as { slug?: string }).slug)
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

export function RichText({
  data,
  className,
  prose = true,
}: {
  data: SerializedEditorState | null | undefined | Record<string, unknown>
  className?: string
  prose?: boolean
}) {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      converters={converters}
      disableContainer={false}
      className={cn(prose && 'prose-quarau', className)}
    />
  )
}
