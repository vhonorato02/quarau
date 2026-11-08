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

/** Barlow Condensed (same family as the logo signature): display headings and territory names. */
export const barlowCondensed = localFont({
  src: [{ path: './barlow-condensed-latin-600-normal.woff2', weight: '600', style: 'normal' }],
  variable: '--font-barlow-condensed',
  // Headlines are the LCP on phones. With "swap" they repaint when the face arrives, and that late
  // repaint was the LCP (about 3 s on Lighthouse mobile). Preloaded and small, the face normally
  // lands inside the short block period; on a very slow first visit the fallback stays.
  display: 'optional',
  fallback: ['Arial Narrow', 'system-ui', 'sans-serif'],
  // Size-adjusted Arial while the file loads: no layout shift when the condensed face swaps in.
  adjustFontFallback: 'Arial',
})
