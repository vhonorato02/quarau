import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

type LegacyMap = { redirects: Array<{ from: string; to: string }> }
const legacy = JSON.parse(
  readFileSync(path.join(dirname, '../../content/legacy/url-map.json'), 'utf8'),
) as LegacyMap

const umamiOrigin = process.env.NEXT_PUBLIC_UMAMI_ORIGIN ?? ''
const sentryOrigin = process.env.NEXT_PUBLIC_SENTRY_ORIGIN ?? ''

/**
 * Content-Security-Policy. Script nonces would force every page to render
 * dynamically (no ISR), so scripts are limited to 'self' + inline (Next.js RSC
 * payload) and everything else is locked down. See docs/decisions/0006.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com ${umamiOrigin}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  `connect-src 'self' https://challenges.cloudflare.com ${umamiOrigin} ${sentryOrigin}`.trim(),
  'frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.openstreetmap.org',
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  // Docker/VPS builds ship the standalone server; Vercel uses its own output.
  output: process.env.VERCEL ? undefined : 'standalone',
  // The OG image route reads the Barlow files at runtime.
  outputFileTracingIncludes: { '/next/og': ['./src/fonts/**/*'] },
  outputFileTracingRoot: path.join(dirname, '../../'),
  transpilePackages: ['@quarau/ui', '@quarau/emails'],
  poweredByHeader: false,
  agentRules: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
    deviceSizes: [480, 828, 1200, 1600, 2048, 2560],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/brand/**' },
      { pathname: '/media/**' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@quarau/ui', 'motion', 'gsap'],
  },
  async headers() {
    // X-Robots-Tag is set at runtime in src/proxy.ts (SITE_NOINDEX can change without a rebuild).
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/brand/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  async redirects() {
    const fromLegacy = legacy.redirects.flatMap(({ from, to }) => {
      const noSlash = from.length > 1 ? from.replace(/\/$/, '') : from
      return Array.from(new Set([from, noSlash]))
        .filter((source) => source.replace(/\/$/, '') !== to.replace(/\/$/, ''))
        .map((source) => ({ source, destination: to, permanent: true }))
    })
    const sitemaps = [
      'sitemap_index.xml',
      'post-sitemap.xml',
      'page-sitemap.xml',
      'portfolio-sitemap.xml',
      'category-sitemap.xml',
      'wp-sitemap.xml',
    ].map((f) => ({ source: `/${f}`, destination: '/sitemap.xml', permanent: true }))
    return [...fromLegacy, ...sitemaps]
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
