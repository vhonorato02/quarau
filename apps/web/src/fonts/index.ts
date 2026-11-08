import localFont from 'next/font/local'

/** Barlow — the Quarau brand typeface (OFL), self-hosted and preloaded. Weights used by the design system: 400, 500, 600 (+ 400 italic). */
export const barlow = localFont({
  src: [
    { path: './barlow-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './barlow-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './barlow-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-barlow',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

/** Italic face, used only inside rich text (<em>): not preloaded. */
export const barlowItalic = localFont({
  src: [{ path: './barlow-latin-400-italic.woff2', weight: '400', style: 'italic' }],
  variable: '--font-barlow-italic',
  display: 'swap',
  preload: false,
})

/**
 * Newsreader (Production Type, OFL): the display face for headlines, set light and large
 * (docs/DESIGN.md §4ª execução). Static instances cut from the variable font with fonttools, latin only:
 * 300 at optical size 56 for headlines (here) and 400 at optical size 20 for small headings (below).
 */
export const newsreader = localFont({
  src: [{ path: './newsreader-latin-300-normal.woff2', weight: '300', style: 'normal' }],
  variable: '--font-newsreader',
  // Headlines are the LCP on phones: a late swap repaint became the LCP, so the preloaded face
  // either lands inside the short block period or the size-adjusted fallback stays for that visit.
  display: 'optional',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

/** Newsreader 400 for small headings (news titles in lists): never the LCP, so not preloaded. */
export const newsreaderText = localFont({
  src: [{ path: './newsreader-latin-400-normal.woff2', weight: '400', style: 'normal' }],
  variable: '--font-newsreader-text',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
})
