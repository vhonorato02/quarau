type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] }
type LexicalRoot = { root?: LexicalNode } | null | undefined

const BLOCK_TYPES = new Set(['paragraph', 'heading', 'listitem', 'quote'])

/** Flattens a Lexical rich text value to plain text (search index, excerpts, meta descriptions). */
export function lexicalToText(value: unknown): string {
  const root = (value as LexicalRoot)?.root
  if (!root) return ''
  const out: string[] = []
  const walk = (node: LexicalNode) => {
    if (typeof node.text === 'string') out.push(node.text)
    node.children?.forEach(walk)
    if (node.type && BLOCK_TYPES.has(node.type)) out.push('\n')
  }
  walk(root)
  return out
    .join('')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim()
}

export function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ') > max * 0.6 ? cut.lastIndexOf(' ') : cut.length)}…`
}

/** Builds a minimal Lexical document from plain paragraphs (used by the WP migration). */
export function paragraphsToLexical(
  paragraphs: Array<string | { text: string; bold?: boolean }[]>,
) {
  const textNode = (text: string, bold = false) => ({
    type: 'text',
    text,
    format: bold ? 1 : 0,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  })
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: typeof p === 'string' ? [textNode(p)] : p.map((s) => textNode(s.text, s.bold)),
      })),
    },
  }
}
