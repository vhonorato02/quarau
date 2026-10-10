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
