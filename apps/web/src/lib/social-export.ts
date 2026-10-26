/**
 * Parsers for the official data exports of Instagram ("Download your information", JSON) and LinkedIn
 * ("Get a copy of your data", Shares.csv). Pure functions: the CLI in scripts/social/ does the file I/O.
 * Logged-in pages of both networks are not scraped: the exports are complete, original-resolution and allowed.
 */
import { createHash } from 'node:crypto'

export type SocialNetwork = 'instagram' | 'linkedin'

export type SocialPost = {
  id: string
  network: SocialNetwork
  /** ISO date-time of publication. */
  date: string
  text: string
  /** Paths relative to the export root (Instagram) or remote URLs (LinkedIn). */
  media: string[]
  link?: string
  sharedUrl?: string
  hashtags: string[]
  /** Suggested news title (first sentence, no hashtags/emojis/links). */
  title: string
  kind: 'noticia' | 'nota-curta' | 'descartar'
  /** Slugs of portfolio projects the text mentions. */
  projects: string[]
  /** Id of the same post on the other network, if any. */
  duplicateOf?: string
}

/** Meta exports write UTF-8 bytes as Latin-1 code points ("RegiÃ£o" → "Região"). */
export function fixMojibake(s: string): string {
  if (!/[ÃÂâð]/.test(s)) return s
  try {
    const fixed = Buffer.from(s, 'latin1').toString('utf8')
    return fixed.includes('�') ? s : fixed
  } catch {
    return s
  }
}

const EMOJI = /\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|\u{FE0F}|\u{200D}/gu

export function hashtagsOf(text: string): string[] {
  return [
    ...new Set([...text.matchAll(/#([\p{L}\p{N}_]+)/gu)].map((m) => (m[1] ?? '').toLowerCase())),
  ]
}

/** First sentence, without hashtags, mentions, links or emojis, cut at a word boundary. */
export function titleFrom(text: string, max = 80): string {
  const clean = text
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#@][\p{L}\p{N}_.]+/gu, '')
    .replace(EMOJI, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
  const first = (clean.split(/(?<=[.!?])\s|\n/)[0] ?? '').replace(/[.:;,\s]+$/, '').trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max * 0.6)).trim()}…`
}

/** Portfolio projects (seed slugs) and the words that identify them in captions. */
const PROJECT_HINTS: Array<[string, RegExp]> = [
  ['projeto-ecoe-verde', /ecoe/i],
  ['projeto-quipa', /quip[aá]/i],
  ['ecomuseu-dos-campos-de-sao-jose', /ecomuseu/i],
  ['memoria-institucional-museu-do-folclore', /museu do folclore|mem[oó]ria institucional/i],
  ['inventario-cultural-e-dossie-de-registro', /invent[aá]rio|dossi[eê]|congado|samba de bumbo/i],
  ['programa-de-educacao-patrimonial', /educa[cç][aã]o patrimonial|\bPEP\b/i],
]

export function projectsOf(text: string): string[] {
  return PROJECT_HINTS.filter(([, re]) => re.test(text)).map(([slug]) => slug)
}

/** Long or richly illustrated posts can become news; very short ones are usually not worth it. */
export function classify(text: string, mediaCount: number): SocialPost['kind'] {
  const body = text
    .replace(/#[\p{L}\p{N}_]+/gu, '')
    .replace(EMOJI, '')
    .trim()
  if (body.length >= 400 || (body.length >= 200 && mediaCount >= 2)) return 'noticia'
  if (body.length >= 80) return 'nota-curta'
  return 'descartar'
}

const idOf = (network: SocialNetwork, key: string) =>
  `${network}-${createHash('sha1').update(key).digest('hex').slice(0, 10)}`

function finish(p: Omit<SocialPost, 'hashtags' | 'title' | 'kind' | 'projects'>): SocialPost {
  return {
    ...p,
    hashtags: hashtagsOf(p.text),
    title: titleFrom(p.text),
    kind: classify(p.text, p.media.length),
    projects: projectsOf(p.text),
  }
}

type IgMedia = { uri?: string; creation_timestamp?: number; title?: string }
type IgEntry = { media?: IgMedia[]; title?: string; creation_timestamp?: number }

/**
 * Instagram export: `posts_1.json` (array of entries; carousel caption on the entry, single-photo caption on
 * the media) and `reels.json` (`{ ig_reels_media: [...] }`). Accepts the parsed JSON of either file.
 */
export function parseInstagram(json: unknown): SocialPost[] {
  const entries: IgEntry[] = Array.isArray(json)
    ? (json as IgEntry[])
    : ((json as { ig_reels_media?: IgEntry[] })?.ig_reels_media ?? [])
  return entries
    .filter((e) => e.media?.length)
    .map((e) => {
      const media = (e.media ?? []).map((m) => m.uri ?? '').filter(Boolean)
      const text = fixMojibake(e.title || e.media?.find((m) => m.title)?.title || '')
      const ts = e.creation_timestamp ?? e.media?.[0]?.creation_timestamp ?? 0
      return finish({
        id: idOf('instagram', media[0] ?? `${ts}`),
        network: 'instagram',
        date: new Date(ts * 1000).toISOString(),
        text,
        media,
      })
    })
}

/** RFC 4180 CSV (quoted fields, doubled quotes, newlines inside quotes). */
export function parseCsv(input: string): Array<Record<string, string>> {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  // Drop the BOM; Windows line endings (also inside quoted fields) become \n.
  const text = input.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else field += c
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  const [header, ...data] = rows.filter((r) => r.some((v) => v.trim()))
  if (!header) return []
  return data.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), r[i] ?? ''])))
}

/** LinkedIn export `Shares.csv`: Date, ShareLink, ShareCommentary, SharedUrl, MediaUrl, Visibility. */
export function parseLinkedInShares(csv: string): SocialPost[] {
  return parseCsv(csv)
    .filter((r) => (r.ShareCommentary ?? '').trim() || r.MediaUrl)
    .map((r) => {
      const text = (r.ShareCommentary ?? '').replace(/""/g, '"').trim()
      const date = new Date(`${(r.Date ?? '').replace(' ', 'T')}Z`)
      return finish({
        id: idOf('linkedin', r.ShareLink || `${r.Date}${text.slice(0, 40)}`),
        network: 'linkedin',
        date: Number.isNaN(date.getTime()) ? '' : date.toISOString(),
        text,
        media: (r.MediaUrl ?? '').split(/\s+/).filter(Boolean),
        link: r.ShareLink || undefined,
        sharedUrl: r.SharedUrl || undefined,
      })
    })
}

const key = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/#[\w]+|https?:\/\/\S+/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .slice(0, 120)

/** Sorts newest first; the older copy of a text posted on both networks gets `duplicateOf` the newer one. */
export function mergePosts(...lists: SocialPost[][]): SocialPost[] {
  const all = lists.flat().sort((a, b) => b.date.localeCompare(a.date))
  const seen = new Map<string, SocialPost>()
  for (const p of all) {
    const k = key(p.text)
    if (k.length < 40) continue
    const other = seen.get(k)
    if (other && other.network !== p.network) p.duplicateOf = other.id
    else seen.set(k, p)
  }
  return all
}
