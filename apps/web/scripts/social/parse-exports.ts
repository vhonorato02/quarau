/**
 * Reads the official Instagram and LinkedIn data exports and produces a reviewable list of posts.
 *
 *   pnpm --filter @quarau/web social:parse [pasta-das-exportacoes]
 *
 * Input (default content/social/entrada/, never committed: the exports also hold private data):
 *   the extracted Instagram export (any folder containing posts_1.json / reels.json and media/) and the
 *   extracted LinkedIn export (Shares.csv). Both can sit anywhere inside the folder.
 * Output:
 *   content/social/posts.json  normalized posts (newest first), the input of the news import
 *   content/social/POSTS.md    review list: kind (noticia / nota-curta / descartar), suggested title, projects
 *   apps/web/.migrate-cache/social/  copies of the media referenced by the posts (outside git)
 */
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  mergePosts,
  parseInstagram,
  parseLinkedInShares,
  type SocialPost,
} from '../../src/lib/social-export'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(dirname, '../../../..')
const IN = path.resolve(process.argv[2] ?? path.join(REPO, 'content/social/entrada'))
const OUT = path.join(REPO, 'content/social')
const CACHE = path.resolve(dirname, '../../.migrate-cache/social')
const log = (...a: unknown[]) => console.info('[social]', ...a)

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

/** Instagram media URIs are relative to the export root (the folder that contains `media/`). */
async function exportRoot(jsonFile: string): Promise<string> {
  let dir = path.dirname(jsonFile)
  for (let i = 0; i < 6; i++) {
    try {
      if ((await stat(path.join(dir, 'media'))).isDirectory()) return dir
    } catch {
      /* not here: go up */
    }
    dir = path.dirname(dir)
  }
  return path.dirname(jsonFile)
}

async function copyMedia(post: SocialPost, root: string): Promise<string[]> {
  const saved: string[] = []
  for (const [i, uri] of post.media.entries()) {
    const src = path.resolve(root, uri)
    if (!src.startsWith(root)) continue
    const dest = path.join(CACHE, post.network, `${post.id}-${i}${path.extname(uri) || '.jpg'}`)
    try {
      await mkdir(path.dirname(dest), { recursive: true })
      await copyFile(src, dest)
      saved.push(path.relative(path.resolve(CACHE, '..'), dest).replace(/\\/g, '/'))
    } catch {
      log(`mídia não encontrada no export: ${uri}`)
    }
  }
  return saved
}

/** LinkedIn media links are signed URLs that may have expired; failures are reported, not fatal. */
async function downloadMedia(post: SocialPost): Promise<string[]> {
  const saved: string[] = []
  for (const [i, url] of post.media.entries()) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const ext = (res.headers.get('content-type') ?? '').includes('png') ? '.png' : '.jpg'
      const dest = path.join(CACHE, post.network, `${post.id}-${i}${ext}`)
      await mkdir(path.dirname(dest), { recursive: true })
      await writeFile(dest, Buffer.from(await res.arrayBuffer()))
      saved.push(path.relative(path.resolve(CACHE, '..'), dest).replace(/\\/g, '/'))
    } catch (err) {
      log(`mídia do LinkedIn indisponível (${String(err).slice(0, 60)}): ${url.slice(0, 80)}`)
    }
  }
  return saved
}

function review(posts: SocialPost[]): string {
  const count = (k: SocialPost['kind']) =>
    posts.filter((p) => p.kind === k && !p.duplicateOf).length
  const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ')
  return [
    '# Posts das redes sociais — revisão',
    `> Gerado por \`scripts/social/parse-exports.ts\`. ${posts.length} posts; ${count('noticia')} candidatos a notícia, ${count('nota-curta')} notas curtas, ${count('descartar')} para descartar; ${posts.filter((p) => p.duplicateOf).length} repetidos entre redes.`,
    '> Regra: nenhum post vira notícia como está. Os candidatos são reescritos como matéria (título, linha fina, texto com contexto do projeto) a partir **só** dos fatos do post, e entram como rascunho para o gestor aprovar.',
    '',
    '| Data | Rede | Tipo | Título sugerido | Projetos | Mídias |',
    '| --- | --- | --- | --- | --- | --- |',
    ...posts
      .map((p) =>
        [
          p.date.slice(0, 10),
          p.network,
          p.duplicateOf ? `repetido (${p.duplicateOf})` : p.kind,
          esc(p.title || '(sem texto)'),
          p.projects.join(', ') || '—',
          String(p.media.length),
        ].join(' | '),
      )
      .map((r) => `| ${r} |`),
    '',
    '## Textos completos',
    ...posts.map(
      (p) => `### ${p.date.slice(0, 10)} · ${p.network} · ${p.id}\n\n${p.text || '(sem texto)'}\n`,
    ),
  ].join('\n')
}

async function main() {
  const files = await walk(IN).catch(() => {
    throw new Error(
      `Pasta não encontrada: ${IN}. Extraia as exportações do Instagram e do LinkedIn nela.`,
    )
  })
  const lists: SocialPost[][] = []
  for (const f of files) {
    const name = path.basename(f)
    if (/^posts_\d+\.json$/.test(name) || name === 'reels.json') {
      const root = await exportRoot(f)
      const posts = parseInstagram(JSON.parse(await readFile(f, 'utf8')))
      for (const p of posts) p.media = await copyMedia(p, root)
      log(`Instagram ${path.relative(IN, f)}: ${posts.length} posts`)
      lists.push(posts)
    } else if (name === 'Shares.csv') {
      const posts = parseLinkedInShares(await readFile(f, 'utf8'))
      for (const p of posts) p.media = await downloadMedia(p)
      log(`LinkedIn ${path.relative(IN, f)}: ${posts.length} posts`)
      lists.push(posts)
    }
  }
  if (!lists.length) throw new Error(`Nenhum posts_*.json, reels.json ou Shares.csv em ${IN}.`)
  const posts = mergePosts(...lists)
  await mkdir(OUT, { recursive: true })
  await writeFile(path.join(OUT, 'posts.json'), JSON.stringify(posts, null, 1))
  await writeFile(path.join(OUT, 'POSTS.md'), review(posts))
  log(`pronto: ${posts.length} posts → content/social/posts.json e POSTS.md`)
}

await main()
