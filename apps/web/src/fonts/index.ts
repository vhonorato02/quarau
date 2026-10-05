import localFont from 'next/font/local'

/** Barlow — the Quarau brand typeface (OFL), self-hosted and preloaded. */
export const barlow = localFont({
  src: [
    { path: './barlow-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './barlow-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './barlow-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './barlow-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './barlow-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './barlow-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-barlow',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})
