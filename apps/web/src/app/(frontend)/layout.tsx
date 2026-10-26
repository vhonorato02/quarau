import './globals.css'

import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'

import { privacyPath } from '@/components/blocks/ContactForm'
import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { CookieConsent } from '@/components/site/CookieConsent'
import { ErrorTextsProvider } from '@/components/site/ErrorTexts'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { barlow, barlowItalic } from '@/fonts'
import { siteUrl } from '@/lib/platform-env'
import { getGlobal, getTexts } from '@/server/queries'
import { organizationJsonLd, websiteJsonLd } from '@/server/seo'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobal('settings')
  return {
    metadataBase: new URL(siteUrl()),
    title: settings.siteName,
    description: settings.defaultDescription,
    applicationName: settings.siteName,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/brand/apple-touch-icon.png',
    },
    manifest: '/manifest.webmanifest',
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = { themeColor: '#0089CF', width: 'device-width', initialScale: 1 }

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, contact, social, t, { isEnabled: draft }] = await Promise.all([
    getGlobal('settings'),
    getGlobal('contact'),
    getGlobal('social'),
    getTexts(),
    draftMode(),
  ])
  const privacyHref = await privacyPath()
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${barlowItalic.variable}`}>
      <body>
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <ErrorTextsProvider texts={t.error}>{children}</ErrorTextsProvider>
        </main>
        <Footer />
        <CookieConsent texts={t.cookies} privacyHref={privacyHref} />
        {draft ? <LivePreviewListener serverURL={siteUrl()} /> : null}
        <JsonLd
          data={[organizationJsonLd({ settings, contact, social }), websiteJsonLd(settings)]}
        />
      </body>
    </html>
  )
}
