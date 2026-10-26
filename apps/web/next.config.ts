import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import { legacyRedirects } from './src/lib/redirects'
import { mediaOrigin } from './src/server/storage'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dev = process.env.NODE_ENV === 'development'
const media = mediaOrigin()
const sentryOrigin = process.env.NEXT_PUBLIC_SENTRY_ORIGIN ?? ''
const umamiOrigin = process.env.NEXT_PUBLIC_UMAMI_SRC
  ? new URL(process.env.NEXT_PUBLIC_UMAMI_SRC).origin
  : ''

/**
 * Content-Security-Policy (docs/decisions/0006). A per-request nonce would force every page to
 * render dynamically (no static cache), so scripts are limited to 'self' + inline (Next.js RSC
 * payload); there is no third-party script before consent and nothing else is allowed.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com ${umamiOrigin}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${media}`.trim(),
  "font-src 'self'",
  `media-src 'self' blob: ${media}`.trim(),
  `connect-src 'self' https://challenges.cloudflare.com ${umamiOrigin} ${sentryOrigin}`
    .replace(/\s+/g, ' ')
    .trim(),
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(dev ? [] : ['upgrade-insecure-requests']),
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
  async headers() {
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
    // Every old WordPress address → new page (content/legacy/url-map.json, tested).
    return legacyRedirects()
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
