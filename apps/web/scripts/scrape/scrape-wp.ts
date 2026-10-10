/**
 * Full scrape of the old WordPress site (quarau.com.br): the source of truth for content, SEO and visual reference.
 *
 *   pnpm --filter @quarau/web scrape:wp                 # everything except video downloads
 *   pnpm --filter @quarau/web scrape:wp --com-videos    # also download the .mp4 files (~1.2 GB)
 *   pnpm --filter @quarau/web scrape:wp --sem-capturas  # skip screenshots
 *
 * What it does:
 *  1. Dumps every public WP REST collection (pages, posts, portfolio, media, taxonomies, users) with Yoast SEO data.
 *  2. Discovers URLs from the Yoast sitemaps, the REST links and by crawling internal links of rendered pages.
 *  3. Renders each page in Chromium (desktop + mobile), extracts metadata, heading outline, the text in reading
 *     order (Markdown), hidden text (tabs/accordions), images (incl. CSS backgrounds), videos, documents, forms,
 *     contacts and social links, and saves full-page screenshots.
 *  4. Builds a media manifest (bytes, dimensions, sha256, alt texts, pages that use each file) and downloads the
 *     files into apps/web/.migrate-cache/uploads (the same cache migrate-wp.ts reads).
 *  5. Checks external links, then writes RELATORIO.md (inventory + problems) and COBERTURA.md (which sentences of
 *     the old site are not in the new seed content yet).
 *
 * Output: content/legacy/scrape/ (versioned). Read-only towards WordPress.
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium, type Browser, type Page } from '@playwright/test'
import sharp from 'sharp'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const ORIGIN = (
  args.find((a) => a.startsWith('--origem='))?.split('=')[1] ?? 'https://quarau.com.br'
).replace(/\/$/, '')
const HOST = new URL(ORIGIN).hostname
const WITH_VIDEOS = args.includes('--com-videos')
const WITH_SCREENSHOTS = !args.includes('--sem-capturas')
const OUT = path.resolve(dirname, '../../../../content/legacy/scrape')
const CACHE = path.resolve(dirname, '../../.migrate-cache/uploads')
const SEED_DIR = path.resolve(dirname, '../content')
const MAX_PAGES = 300
const log = (...a: unknown[]) => console.info('[scrape]', ...a)

// ---------- types ----------
type Img = {
  src: string
  alt: string
  title: string
  w: number
  h: number
  where: string
  kind: 'img' | 'bg'
}
type Extracted = {
  lang: string
  title: string
  meta: Record<string, string>
  canonical: string | null
  jsonLd: unknown[]
  outline: Array<{ level: number; text: string }>
  markdown: string
  hiddenText: string[]
  words: number
  header: { links: Array<{ text: string; href: string }>; logo: string | null }
  footer: { text: string; links: Array<{ text: string; href: string }> }
  links: Array<{ text: string; href: string }>
  images: Img[]
  iframes: string[]
  videos: string[]
  forms: Array<{
    action: string
    fields: Array<{ name: string; type: string; label: string; required: boolean }>
  }>
}
type PageRecord = {
  url: string
  finalUrl: string
  status: number
  slug: string
  source: string[]
  data?: Extracted
  error?: string
}
type MediaRecord = {
  url: string
  rel: string
  mime: string
  wpId?: number
  title?: string
  alt: string[]
  caption?: string
  usedOn: string[]
  bytes?: number
  width?: number
  height?: number
  sha256?: string
  downloaded: boolean
  note?: string
}

// ---------- helpers ----------
async function fetchRetry(url: string, init?: RequestInit, tries = 3): Promise<Response> {
  let last: unknown
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(60_000) })
      if (res.status < 500) return res
      last = new Error(`HTTP ${res.status}`)
    } catch (err) {
      last = err
    }
    await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
  }
  throw last
}

async function restAll(base: string): Promise<unknown[]> {
  const items: unknown[] = []
  for (let page = 1; page < 50; page++) {
    const res = await fetchRetry(`${ORIGIN}/wp-json/wp/v2/${base}?per_page=100&page=${page}`)
    // Closed or blocked endpoints (401/404, or an HTML page from a security plugin) end the listing.
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) break
    const batch = (await res.json().catch(() => [])) as unknown[]
    if (!Array.isArray(batch) || batch.length === 0) break
    items.push(...batch)
    const total = Number(res.headers.get('x-wp-totalpages') ?? 1)
    if (page >= total) break
  }
  return items
}

/** Canonical form for comparing URLs of the old site. */
function normUrl(raw: string, base = ORIGIN): string | null {
  try {
    const u = new URL(raw, base)
    if (!/^https?:$/.test(u.protocol)) return null
    u.hash = ''
    // /contato and /contato/ are the same page on WordPress.
    if (!u.pathname.endsWith('/') && !/\.\w{2,5}$/.test(u.pathname)) u.pathname += '/'
    if (u.hostname === `www.${HOST}`) u.hostname = HOST
    u.protocol = 'https:'
    return u.toString()
  } catch {
    return null
  }
}

const isInternal = (u: string) => new URL(u).hostname === HOST
const DOC_EXT = /\.(pdf|docx?|xlsx?|pptx?|zip|odt)$/i
const MEDIA_EXT = /\.(jpe?g|png|gif|webp|svg|avif|mp4|webm|mov|mp3)$/i
const SKIP_PATH =
  /^\/(wp-admin|wp-login|wp-json|feed|xmlrpc|wp-includes|comments\/feed)|\/feed\/?$|\/embed\/?$/

function crawlable(u: string): boolean {
  const url = new URL(u)
  return (
    isInternal(u) &&
    !SKIP_PATH.test(url.pathname) &&
    !url.search &&
    !DOC_EXT.test(url.pathname) &&
    !MEDIA_EXT.test(url.pathname)
  )
}

function slugOf(u: string): string {
  const p = new URL(u).pathname.replace(/^\/|\/$/g, '')
  return p ? p.replace(/[^\w-]+/g, '__') : 'inicio'
}

/** Strips WordPress size suffixes (-1024x768) to reach the uploaded file. */
function originalUpload(u: string): string {
  return u.replace(/-\d{2,5}x\d{2,5}(?=\.\w+$)/, '')
}

function uploadRel(u: string): string | null {
  const m = new URL(u).pathname.match(/\/wp-content\/uploads\/(.+)$/)
  return m?.[1] ? decodeURIComponent(m[1]) : null
}

const normText = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

async function pool<T>(items: T[], size: number, fn: (item: T) => Promise<void>) {
  let i = 0
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) await fn(items[i++] as T)
    }),
  )
}

// ---------- in-page extraction (runs in the browser) ----------
function extractInPage(): Extracted {
  const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim()
  const abs = (u: string | null) => (u ? new URL(u, location.href).toString() : '')
  const visible = (el: Element) => {
    const cs = getComputedStyle(el)
    return (
      cs.display !== 'none' &&
      cs.visibility !== 'hidden' &&
      (el as HTMLElement).getClientRects().length > 0
    )
  }
  const headerEl =
    document.querySelector('header, .elementor-location-header, #masthead, .site-header') ?? null
  const footerEl =
    document.querySelector('footer, .elementor-location-footer, #colophon, .site-footer') ?? null
  const root =
    document.querySelector(
      'main, #main, #primary, .site-main, [role=main], .elementor[data-elementor-type="wp-page"], .elementor[data-elementor-type="single-post"], .elementor[data-elementor-type="single"], #content',
    ) ?? document.body
  const where = (el: Element) =>
    headerEl?.contains(el)
      ? 'header'
      : footerEl?.contains(el)
        ? 'footer'
        : root.contains(el)
          ? 'main'
          : 'other'

  const meta: Record<string, string> = {}
  document.querySelectorAll('meta[name], meta[property]').forEach((m) => {
    const k = m.getAttribute('name') ?? m.getAttribute('property')
    if (k) meta[k] = m.getAttribute('content') ?? ''
  })
  const jsonLd: unknown[] = []
  document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try {
      jsonLd.push(JSON.parse(s.textContent ?? ''))
    } catch {
      /* invalid JSON-LD on the old site: ignored */
    }
  })

  // Reading-order Markdown of the visible main content.
  const lines: string[] = []
  const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'TEMPLATE', 'IFRAME'])
  const inline = (el: Element): string => {
    let out = ''
    el.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) out += n.textContent
      else if (n instanceof Element && !skip.has(n.tagName)) {
        if (n.tagName === 'A') {
          const t = clean(inline(n))
          out += t ? `[${t}](${abs(n.getAttribute('href'))})` : ''
        } else if (n.tagName === 'STRONG' || n.tagName === 'B') out += `**${clean(inline(n))}** `
        else if (n.tagName === 'EM' || n.tagName === 'I') out += `_${clean(inline(n))}_ `
        else if (n.tagName === 'BR') out += '\n'
        else if (n.tagName === 'IMG') out += ''
        else out += inline(n)
      }
    })
    return out
  }
  const walk = (el: Element) => {
    if (skip.has(el.tagName) || !visible(el)) return
    if (headerEl?.contains(el) && root === document.body) return
    if (footerEl?.contains(el) && root === document.body) return
    const tag = el.tagName
    if (/^H[1-6]$/.test(tag)) {
      const t = clean(inline(el))
      if (t) lines.push(`${'#'.repeat(Number(tag[1]))} ${t}`)
      return
    }
    if (tag === 'P' || tag === 'FIGCAPTION' || tag === 'BLOCKQUOTE') {
      const t = clean(inline(el))
      if (t) lines.push(tag === 'BLOCKQUOTE' ? `> ${t}` : t)
      return
    }
    if (tag === 'LI') {
      const t = clean(inline(el))
      if (t) lines.push(`- ${t}`)
      return
    }
    if (tag === 'IMG') {
      const img = el as HTMLImageElement
      lines.push(`![${clean(img.alt)}](${img.currentSrc || img.src})`)
      return
    }
    const hasBlockChild = [...el.children].some((c) =>
      /^(DIV|SECTION|ARTICLE|P|H[1-6]|UL|OL|LI|FIGURE|BLOCKQUOTE|TABLE|HEADER|FOOTER|NAV|MAIN|ASIDE|IMG)$/.test(
        c.tagName,
      ),
    )
    if (!hasBlockChild) {
      const t = clean(inline(el))
      if (t && t.length > 1) lines.push(t)
      return
    }
    for (const c of el.children) walk(c)
  }
  walk(root)
  const markdown = lines.filter((l, i) => l !== lines[i - 1]).join('\n\n')
  const visibleText = clean(root instanceof HTMLElement ? root.innerText : root.textContent)

  // Text present in the DOM but hidden (tabs, accordions, popups, responsive duplicates).
  const hiddenText: string[] = []
  root.querySelectorAll('div, section, p, li').forEach((el) => {
    if (visible(el) || el.closest('[aria-hidden="true"]')) return
    if ([...el.children].some((c) => !visible(c) && (c.textContent ?? '').length > 40)) return
    const t = clean(el.textContent)
    if (t.length > 40 && !visibleText.includes(t.slice(0, 60))) hiddenText.push(t)
  })

  const linkList = (scope: Element | null) =>
    scope
      ? [...scope.querySelectorAll('a[href]')].map((a) => ({
          text: clean(
            (a as HTMLElement).innerText || a.getAttribute('aria-label') || a.textContent,
          ),
          href: abs(a.getAttribute('href')),
        }))
      : []

  const images: Img[] = []
  document.querySelectorAll('img').forEach((img) => {
    const src = img.currentSrc || img.src || img.getAttribute('data-src') || ''
    const set = img.getAttribute('srcset') ?? img.getAttribute('data-srcset')
    let best = src
    if (set) {
      const cands = set
        .split(',')
        .map((c) => c.trim().split(/\s+/))
        .map(([u, d]) => ({ u, w: parseInt(d ?? '0', 10) || 0 }))
        .sort((a, b) => b.w - a.w)
      if (cands[0]?.u) best = cands[0].u
    }
    if (best && !best.startsWith('data:'))
      images.push({
        src: abs(best),
        alt: clean(img.alt),
        title: clean(img.title),
        w: img.naturalWidth,
        h: img.naturalHeight,
        where: where(img),
        kind: 'img',
      })
  })
  document.querySelectorAll('body *').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage
    const m = bg && bg !== 'none' ? bg.match(/url\(["']?([^"')]+)["']?\)/) : null
    if (m?.[1] && !m[1].startsWith('data:'))
      images.push({ src: abs(m[1]), alt: '', title: '', w: 0, h: 0, where: where(el), kind: 'bg' })
  })

  const forms = [...document.querySelectorAll('form')].map((f) => ({
    action: abs(f.getAttribute('action')),
    fields: [...f.querySelectorAll('input, textarea, select')]
      .filter((i) => (i as HTMLInputElement).type !== 'hidden')
      .map((i) => {
        const id = i.getAttribute('id')
        const label = id ? document.querySelector(`label[for="${id}"]`) : i.closest('label')
        return {
          name: i.getAttribute('name') ?? '',
          type: (i as HTMLInputElement).type || i.tagName.toLowerCase(),
          label: clean(
            label?.textContent ?? i.getAttribute('placeholder') ?? i.getAttribute('aria-label'),
          ),
          required: (i as HTMLInputElement).required,
        }
      }),
  }))

  return {
    lang: document.documentElement.lang,
    title: document.title,
    meta,
    canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? null,
    jsonLd,
    outline: [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .filter(visible)
      .map((h) => ({ level: Number(h.tagName[1]), text: clean(h.textContent) }))
      .filter((h) => h.text),
    markdown,
    hiddenText: [...new Set(hiddenText)],
    words: visibleText.split(/\s+/).filter(Boolean).length,
    header: {
      links: linkList(headerEl),
      logo: (headerEl?.querySelector('img') as HTMLImageElement | null)?.currentSrc ?? null,
    },
    footer: {
      text: clean(footerEl instanceof HTMLElement ? footerEl.innerText : ''),
      links: linkList(footerEl),
    },
    links: linkList(document.body),
    images,
    iframes: [...document.querySelectorAll('iframe')].map((f) =>
      abs(f.getAttribute('src') ?? f.getAttribute('data-src')),
    ),
    videos: [...document.querySelectorAll('video, video source')]
      .map((v) => abs(v.getAttribute('src')))
      .filter(Boolean),
    forms,
  }
}

// ---------- rendering ----------
async function render(
  browser: Browser,
  url: string,
  shotName: string,
): Promise<{ status: number; finalUrl: string; data: Extracted }> {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'pt-BR' })
  const page = await ctx.newPage()
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 })
    await autoScroll(page)
    // tsx/esbuild wraps named functions in __name(); define it in the page so the extractor can run there.
    await page.evaluate('globalThis.__name = (f) => f')
    const data = await page.evaluate(extractInPage)
    if (WITH_SCREENSHOTS) await shoot(page, `${shotName}-desktop`, 1440)
    return { status: res?.status() ?? 0, finalUrl: page.url(), data }
  } finally {
    await ctx.close()
  }
}

async function renderMobile(browser: Browser, url: string, shotName: string) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: 'pt-BR',
  })
  const page = await ctx.newPage()
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 })
    await autoScroll(page)
    await shoot(page, `${shotName}-mobile`, 390)
  } finally {
    await ctx.close()
  }
}

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 150))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(800)
}

async function shoot(page: Page, name: string, width: number) {
  const buf = await page.screenshot({ fullPage: true, timeout: 120_000 })
  await sharp(buf, { limitInputPixels: false })
    .resize({ width: Math.min(width, 1440) })
    .jpeg({ quality: 55, mozjpeg: true })
    .toFile(path.join(OUT, 'capturas', `${name}.jpg`))
}

// ---------- main ----------
async function main() {
  await rm(OUT, { recursive: true, force: true })
  for (const d of ['', 'paginas', 'capturas', 'wp-json'])
    await mkdir(path.join(OUT, d), { recursive: true })

  // 1. REST dump
  log('REST: coleções públicas')
  const restBases = [
    'pages',
    'posts',
    'portfolio',
    'media',
    'categories',
    'tags',
    'portfolio-types',
    'users',
    'comments',
  ]
  const rest: Record<string, Array<Record<string, unknown>>> = {}
  for (const base of restBases) {
    rest[base] = (await restAll(base)) as Array<Record<string, unknown>>
    await writeFile(path.join(OUT, 'wp-json', `${base}.json`), JSON.stringify(rest[base], null, 1))
    log(`  ${base}: ${rest[base].length}`)
  }
  const siteInfo = (await (await fetchRetry(`${ORIGIN}/wp-json/`)).json()) as Record<
    string,
    unknown
  >
  await writeFile(
    path.join(OUT, 'wp-json', 'site.json'),
    JSON.stringify(
      {
        name: siteInfo.name,
        description: siteInfo.description,
        url: siteInfo.url,
        home: siteInfo.home,
      },
      null,
      1,
    ),
  )

  // 2. URL discovery
  const queue = new Map<string, Set<string>>()
  const enqueue = (u: string | null, source: string) => {
    if (!u || !crawlable(u)) return
    if (!queue.has(u)) queue.set(u, new Set())
    queue.get(u)!.add(source)
  }
  enqueue(normUrl('/'), 'home')
  const sitemapImages = new Map<string, string>()
  const index = await (await fetchRetry(`${ORIGIN}/sitemap_index.xml`)).text()
  for (const sm of [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? '')) {
    const xml = await (await fetchRetry(sm)).text()
    for (const block of xml.split('<url>').slice(1)) {
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]
      enqueue(normUrl(loc ?? ''), `sitemap:${path.basename(sm)}`)
      for (const im of block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g))
        sitemapImages.set(im[1] ?? '', loc ?? '')
    }
  }
  for (const base of [
    'pages',
    'posts',
    'portfolio',
    'categories',
    'tags',
    'portfolio-types',
    'users',
  ])
    for (const item of rest[base] ?? []) enqueue(normUrl(String(item.link ?? '')), `rest:${base}`)
  log(`URLs descobertas antes do crawl: ${queue.size}`)

  // 3. Render + crawl
  const browser = await chromium.launch(
    process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  )
  const pages: PageRecord[] = []
  const done = new Set<string>()
  while (pages.length < MAX_PAGES) {
    const next = [...queue.keys()].find((u) => !done.has(u))
    if (!next) break
    done.add(next)
    const slug = slugOf(next)
    const rec: PageRecord = {
      url: next,
      finalUrl: next,
      status: 0,
      slug,
      source: [...(queue.get(next) ?? [])],
    }
    try {
      const r = await render(browser, next, slug)
      Object.assign(rec, { status: r.status, finalUrl: r.finalUrl, data: r.data })
      if (WITH_SCREENSHOTS && r.status === 200) await renderMobile(browser, next, slug)
      for (const l of r.data.links) enqueue(normUrl(l.href), `link:${slug}`)
      log(`${r.status} ${next} (${r.data.words} palavras, ${r.data.images.length} imagens)`)
    } catch (err) {
      rec.error = String(err).slice(0, 300)
      log(`ERRO ${next}: ${rec.error}`)
    }
    pages.push(rec)
  }
  await browser.close()

  for (const p of pages) {
    await writeFile(path.join(OUT, 'paginas', `${p.slug}.json`), JSON.stringify(p, null, 1))
    if (p.data)
      await writeFile(
        path.join(OUT, 'paginas', `${p.slug}.md`),
        [
          `<!-- ${p.finalUrl} · HTTP ${p.status} · ${p.data.words} palavras -->`,
          `# ${p.data.title}`,
          `> ${p.data.meta.description ?? p.data.meta['og:description'] ?? '(sem meta description)'}`,
          p.data.markdown,
          p.data.hiddenText.length
            ? `\n---\n\n## Texto oculto (abas, acordeões, versões mobile)\n\n${p.data.hiddenText.map((t) => `- ${t}`).join('\n')}`
            : '',
        ].join('\n\n'),
      )
  }

  // 4. Media manifest + downloads
  log('Mídias: manifesto e download')
  const media = new Map<string, MediaRecord>()
  const addMedia = (raw: string, patch: Partial<MediaRecord>, usedOn?: string) => {
    const u = normUrl(raw)
    if (!u || !isInternal(u)) return
    const url = originalUpload(u)
    const rel = uploadRel(url)
    if (!rel) return
    const rec =
      media.get(url) ??
      ({ url, rel, mime: '', alt: [], usedOn: [], downloaded: false } satisfies MediaRecord)
    Object.assign(rec, {
      ...patch,
      alt: [...new Set([...rec.alt, ...(patch.alt ?? [])])].filter(Boolean),
    })
    if (usedOn && !rec.usedOn.includes(usedOn)) rec.usedOn.push(usedOn)
    media.set(url, rec)
  }
  for (const m of rest.media ?? []) {
    const title = (m.title as { rendered?: string } | undefined)?.rendered
    const caption = String((m.caption as { rendered?: string } | undefined)?.rendered ?? '')
      .replace(/<[^>]+>/g, '')
      .trim()
    addMedia(String(m.source_url), {
      wpId: Number(m.id),
      mime: String(m.mime_type ?? ''),
      title,
      caption: caption || undefined,
      alt: [String(m.alt_text ?? '')],
    })
  }
  for (const p of pages) {
    for (const img of p.data?.images ?? []) addMedia(img.src, { alt: [img.alt] }, p.slug)
    for (const l of p.data?.links ?? [])
      if (DOC_EXT.test(l.href) || MEDIA_EXT.test(l.href)) addMedia(l.href, {}, p.slug)
    for (const v of p.data?.videos ?? []) addMedia(v, {}, p.slug)
  }
  for (const [im, loc] of sitemapImages)
    addMedia(im, {}, loc ? slugOf(normUrl(loc) ?? loc) : undefined)

  await pool([...media.values()], 4, async (rec) => {
    const isVideo = /\.(mp4|webm|mov)$/i.test(rec.rel)
    const file = path.join(CACHE, rec.rel)
    if (!file.startsWith(CACHE + path.sep)) return
    try {
      if (!(existsSync(file) && (await stat(file)).size > 0)) {
        if (isVideo && !WITH_VIDEOS) {
          const head = await fetchRetry(rec.url, { method: 'HEAD' })
          rec.bytes = Number(head.headers.get('content-length') ?? 0) || undefined
          rec.note = 'vídeo não baixado (use --com-videos)'
          return
        }
        const res = await fetchRetry(rec.url)
        if (!res.ok) {
          rec.note = `HTTP ${res.status}`
          return
        }
        await mkdir(path.dirname(file), { recursive: true })
        await writeFile(file, Buffer.from(await res.arrayBuffer()))
      }
      const buf = await readFile(file)
      rec.bytes = buf.length
      rec.sha256 = createHash('sha256').update(buf).digest('hex')
      rec.downloaded = true
      if (!isVideo && !/\.(pdf|docx?|zip)$/i.test(rec.rel)) {
        const meta = await sharp(buf, { limitInputPixels: false }).metadata()
        rec.width = meta.width
        rec.height = meta.height
      }
    } catch (err) {
      rec.note = String(err).slice(0, 160)
    }
  })
  const mediaList = [...media.values()].sort((a, b) => a.rel.localeCompare(b.rel))
  await writeFile(path.join(OUT, 'midias.json'), JSON.stringify(mediaList, null, 1))

  // 5. External links
  log('Links externos')
  const external = new Map<string, { status: number | string; on: Set<string> }>()
  for (const p of pages)
    for (const l of p.data?.links ?? []) {
      const u = normUrl(l.href)
      if (!u || isInternal(u) || !/^https?:/.test(u)) continue
      if (!external.has(u)) external.set(u, { status: '?', on: new Set() })
      external.get(u)!.on.add(p.slug)
    }
  await pool([...external.keys()], 6, async (u) => {
    try {
      let res = await fetch(u, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(15_000),
      })
      if (res.status >= 400)
        res = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(15_000) })
      external.get(u)!.status = res.status
    } catch (err) {
      external.get(u)!.status = String(err).slice(0, 60)
    }
  })
  const links = [...external].map(([url, v]) => ({ url, status: v.status, on: [...v.on] }))
  await writeFile(path.join(OUT, 'links-externos.json'), JSON.stringify(links, null, 1))

  // 6. Site-level facts
  const home = pages.find((p) => p.slug === 'inicio')?.data
  const allLinks = pages.flatMap((p) => p.data?.links ?? [])
  const allText = pages
    .flatMap((p) => [
      p.data?.markdown ?? '',
      p.data?.footer.text ?? '',
      ...(p.data?.hiddenText ?? []),
    ])
    .join('\n')
  const pick = (re: RegExp) => [...new Set(allLinks.map((l) => l.href).filter((h) => re.test(h)))]
  const site = {
    origem: ORIGIN,
    nome: siteInfo.name,
    descricao: siteInfo.description,
    menu: home?.header.links ?? [],
    logo: home?.header.logo ?? null,
    rodape: home?.footer ?? null,
    emails: pick(/^mailto:/i).map((h) => h.replace(/^mailto:/i, '')),
    telefones: pick(/^tel:/i).map((h) => h.replace(/^tel:/i, '')),
    whatsapp: pick(/wa\.me|api\.whatsapp|whatsapp\.com/i),
    redes: pick(
      /instagram\.com|facebook\.com|linkedin\.com|youtube\.com|youtu\.be|twitter\.com|x\.com\/|tiktok\.com|vimeo\.com/i,
    ).filter((h) => !/sharer|intent\/tweet|shareArticle|share\?/i.test(h)),
    // Contacts written as plain text (the old site does not link most of them).
    emailsNoTexto: [...new Set(allText.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [])],
    telefonesNoTexto: [...new Set(allText.match(/\(?\b\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b/g) ?? [])],
    documentos: pick(DOC_EXT),
  }
  await writeFile(path.join(OUT, 'site.json'), JSON.stringify(site, null, 1))

  // 7. Reports
  await writeFile(path.join(OUT, 'RELATORIO.md'), report(pages, mediaList, links, site, rest))
  await writeFile(path.join(OUT, 'COBERTURA.md'), await coverage(pages))
  log(
    `pronto: ${pages.length} páginas, ${mediaList.length} mídias, ${links.length} links externos → ${OUT}`,
  )
}

function report(
  pages: PageRecord[],
  media: MediaRecord[],
  links: Array<{ url: string; status: number | string; on: string[] }>,
  site: Record<string, unknown>,
  rest: Record<string, unknown[]>,
): string {
  const ok = pages.filter((p) => p.data)
  const mb = (n: number) => `${(n / 1e6).toFixed(1)} MB`
  const sum = (f: (m: MediaRecord) => boolean) =>
    media.filter(f).reduce((s, m) => s + (m.bytes ?? 0), 0)
  const titles = new Map<string, string[]>()
  for (const p of ok) titles.set(p.data!.title, [...(titles.get(p.data!.title) ?? []), p.slug])
  const imgs = media.filter((m) => /\.(jpe?g|png|gif|webp|svg|avif)$/i.test(m.rel))
  const noAlt = imgs.filter((m) => m.alt.length === 0)
  const small = imgs.filter((m) => (m.width ?? 0) > 0 && (m.width ?? 0) < 1200 && m.usedOn.length)
  // 403/429/999 come from anti-bot walls (Instagram, LinkedIn): reachable for people, not for scripts.
  const botWall = (st: number | string) => st === 403 || st === 429 || st === 999
  const broken = links.filter(
    (l) => typeof l.status !== 'number' || (l.status >= 400 && !botWall(l.status)),
  )
  const row = (cells: Array<string | number>) =>
    `| ${cells.map((c) => String(c).replace(/\|/g, '\\|')).join(' | ')} |`
  return (
    [
      `# Raspagem completa de ${site.origem}`,
      `> Gerado por \`apps/web/scripts/scrape/scrape-wp.ts\` em ${new Date().toISOString().slice(0, 10)}. Textos por página em \`paginas/*.md\`, dados brutos em \`paginas/*.json\` e \`wp-json/\`, capturas em \`capturas/\`.`,
      `## Resumo`,
      row(['Item', 'Quantidade']),
      row(['---', '---']),
      row(['Páginas renderizadas', `${ok.length} (${pages.length - ok.length} com erro)`]),
      row(['Palavras (visíveis)', ok.reduce((s, p) => s + p.data!.words, 0)]),
      ...Object.entries(rest).map(([k, v]) => row([`REST \`${k}\``, v.length])),
      row(['Mídias no manifesto', media.length]),
      row(['Imagens', `${imgs.length} (${mb(sum((m) => imgs.includes(m)))})`]),
      row([
        'Vídeos',
        `${media.filter((m) => /\.(mp4|webm|mov)$/i.test(m.rel)).length} (${mb(sum((m) => /\.(mp4|webm|mov)$/i.test(m.rel)))})`,
      ]),
      row(['Documentos', media.filter((m) => DOC_EXT.test(m.rel)).length]),
      row(['Links externos', `${links.length} (${broken.length} quebrados)`]),
      `## Dados institucionais encontrados`,
      '```json',
      JSON.stringify(
        {
          nome: site.nome,
          descricao: site.descricao,
          emails: site.emails,
          emailsNoTexto: site.emailsNoTexto,
          telefones: site.telefones,
          telefonesNoTexto: site.telefonesNoTexto,
          whatsapp: site.whatsapp,
          redes: site.redes,
          documentos: site.documentos,
        },
        null,
        2,
      ),
      '```',
      `## Páginas e SEO`,
      row([
        'Página',
        'HTTP',
        'Palavras',
        'Title (chars)',
        'Meta description (chars)',
        'H1',
        'Imagens',
        'Texto oculto',
      ]),
      row(['---', '---', '---', '---', '---', '---', '---', '---']),
      ...pages.map((p) =>
        p.data
          ? row([
              `[${p.slug}](paginas/${p.slug}.md)`,
              p.status,
              p.data.words,
              `${p.data.title} (${p.data.title.length})`,
              String((p.data.meta.description ?? '').length || '**faltando**'),
              p.data.outline.filter((h) => h.level === 1).length,
              p.data.images.length,
              p.data.hiddenText.length,
            ])
          : row([p.slug, p.status, '—', p.error ?? 'erro', '', '', '', '']),
      ),
      `## Problemas do site antigo (para não repetir)`,
      `- Títulos duplicados: ${
        [...titles]
          .filter(([, v]) => v.length > 1)
          .map(([t, v]) => `"${t}" em ${v.join(', ')}`)
          .join('; ') || 'nenhum'
      }`,
      `- Páginas sem meta description: ${
        ok
          .filter((p) => !p.data!.meta.description)
          .map((p) => p.slug)
          .join(', ') || 'nenhuma'
      }`,
      `- Páginas com 0 ou mais de 1 H1: ${
        ok
          .filter((p) => p.data!.outline.filter((h) => h.level === 1).length !== 1)
          .map((p) => p.slug)
          .join(', ') || 'nenhuma'
      }`,
      `- Imagens sem texto alternativo: ${noAlt.length} de ${imgs.length}`,
      `- Imagens usadas com menos de 1200 px de largura (ficam borradas em telas grandes): ${small.length}`,
      `- Links externos quebrados: ${broken.length ? broken.map((b) => `${b.url} (${b.status})`).join(', ') : 'nenhum'}`,
      `- Links que bloqueiam robôs (conferir à mão): ${
        links
          .filter((l) => botWall(l.status))
          .map((l) => l.url)
          .join(', ') || 'nenhum'
      }`,
      `## Mídias mais pesadas`,
      row(['Arquivo', 'Tamanho', 'Dimensões', 'Usada em']),
      row(['---', '---', '---', '---']),
      ...[...media]
        .sort((a, b) => (b.bytes ?? 0) - (a.bytes ?? 0))
        .slice(0, 15)
        .map((m) =>
          row([
            m.rel,
            m.bytes ? mb(m.bytes) : '?',
            m.width ? `${m.width}×${m.height}` : '—',
            m.usedOn.join(', ') || '(só na biblioteca)',
          ]),
        ),
    ]
      .join('\n\n')
      // Table rows must sit on consecutive lines.
      .replace(/\|\n\n\|/g, '|\n|')
  )
}

/** Which sentences of the old site are not reflected in the new seed content (input for the copy work). */
async function coverage(pages: PageRecord[]): Promise<string> {
  const seed = normText(
    (
      await Promise.all(
        (await readdir(SEED_DIR))
          .filter((f) => f.endsWith('.ts'))
          .map((f) => readFile(path.join(SEED_DIR, f), 'utf8')),
      )
    ).join('\n'),
  )
  const shingles = (s: string) => {
    const w = normText(s).split(' ')
    const out: string[] = []
    for (let i = 0; i + 4 <= w.length; i++) out.push(w.slice(i, i + 4).join(' '))
    return out
  }
  const seedSet = new Set(shingles(seed))
  const out = [
    '# Cobertura do conteúdo antigo no site novo',
    '> Frases (≥ 40 caracteres) do site antigo e se aparecem no conteúdo-semente do site novo (`apps/web/scripts/content/*.ts`). "Não aproveitada" = menos de 50% das sequências de 4 palavras encontradas. Use como checklist na fase de copy: cada frase não aproveitada precisa de uma decisão (reescrever, descartar de propósito ou `[CONFIRMAR]`).',
  ]
  let total = 0
  let used = 0
  for (const p of pages.filter((x) => x.data)) {
    const text = [
      p.data!.markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'),
      ...p.data!.hiddenText,
    ].join('\n')
    const sentences = [
      ...new Set(text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.replace(/^[#>\-*\s]+/, '').trim())),
    ].filter((s) => s.length >= 40)
    const missing = sentences.filter((s) => {
      const sh = shingles(s)
      return sh.length === 0 || sh.filter((x) => seedSet.has(x)).length / sh.length < 0.5
    })
    total += sentences.length
    used += sentences.length - missing.length
    out.push(`## ${p.slug} — ${sentences.length - missing.length}/${sentences.length} aproveitadas`)
    if (missing.length) out.push(missing.map((s) => `- [ ] ${s}`).join('\n'))
  }
  out.splice(
    2,
    0,
    `**Total: ${used} de ${total} frases aproveitadas (${total ? Math.round((used / total) * 100) : 0}%).**`,
  )
  return out.join('\n\n')
}

await main()
process.exit(0)
