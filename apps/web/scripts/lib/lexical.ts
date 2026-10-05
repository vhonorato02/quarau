/** Minimal Lexical document builders for seeding rich text. */
type Seg = string | { text: string; bold?: boolean; italic?: boolean }

const text = (s: Seg) => {
  const t = typeof s === 'string' ? { text: s } : s
  return {
    type: 'text',
    text: t.text,
    format: (t.bold ? 1 : 0) | (t.italic ? 2 : 0),
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

const base = { format: '', indent: 0, version: 1, direction: 'ltr' as const }

export const p = (...segs: Seg[]) => ({ type: 'paragraph', ...base, textFormat: 0, children: segs.map(text) })
export const h = (tag: 'h2' | 'h3' | 'h4', s: string) => ({ type: 'heading', tag, ...base, children: [text(s)] })
export const ul = (items: Seg[][]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  ...base,
  children: items.map((segs, i) => ({ type: 'listitem', value: i + 1, ...base, children: segs.map(text) })),
})
export const quote = (s: string) => ({ type: 'quote', ...base, children: [text(s)] })

export const doc = (...children: unknown[]) => ({ root: { type: 'root', ...base, children } })
