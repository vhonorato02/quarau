'use client'

import { useRowLabel } from '@payloadcms/ui'

import { BLOCK_LABELS, type BlockSlug } from '../blocks/labels'

type Data = {
  blockType?: BlockSlug
  heading?: string
  value?: string
  text?: string
  source?: string
}

/** Block header in the editor: "Texto com foto — Do território à instituição" instead of "Sem título". */
export function BlockLabel() {
  const { data, rowNumber } = useRowLabel<Data>()
  const name = (data.blockType && BLOCK_LABELS[data.blockType]) || 'Bloco'
  const detail =
    data.heading ||
    data.value ||
    (typeof data.text === 'string' ? data.text : '') ||
    data.source ||
    ''
  const short = detail.length > 60 ? `${detail.slice(0, 59)}…` : detail
  return (
    <span>
      {String((rowNumber ?? 0) + 1).padStart(2, '0')} {name}
      {short ? ` — ${short}` : ''}
    </span>
  )
}
