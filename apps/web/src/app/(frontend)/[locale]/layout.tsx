import '../globals.css'

import { SkipLink } from '@quarau/ui'
import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ViewTransition } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RevealObserver } from '@/components/motion/Reveal'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { CookieConsent } from '@/components/privacy/CookieConsent'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { barlow } from '@/fonts'
import { htmlLang, routing, type Locale } from '@/i18n/routing'
import { getGlobal } from '@/lib/queries'
import { organizationJsonLd } from '@/lib/seo'

export const dynamicParams = true

/** Pages are rendered on first request and cached (ISR); the build needs no database. */
export function generateStaticParams() {
  return process.env.PRERENDER_AT_BUILD === 'true'
    ? routing.locales.map((locale) => ({ locale }))
    : []
}

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Quarau — Projetos Socioambientais, Educativos e Culturais',
    template: '%s — Quarau',
  },
  description:
    'A Quarau é uma consultoria em projetos educativos, culturais e socioambientais, com atuação em todas as etapas: da concepção à difusão de resultados.',
  applicationName: 'Quarau',
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

export const viewport: Viewport = {
  themeColor: '#0089CF',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const typedLocale = locale as Locale

  const [settings, contact, social, t, tc, { isEnabled: draft }] = await Promise.all([
    getGlobal('site-settings', typedLocale).catch(() => null),
    getGlobal('contact', typedLocale).catch(() => null),
    getGlobal('social', typedLocale).catch(() => null),
    getTranslations('cookies'),
    getTranslations('common'),
    draftMode(),
  ])

  return (
    <html lang={htmlLang[typedLocale]} className={barlow.variable} suppressHydrationWarning>
      <body className="bg-surface text-ink min-h-dvh font-sans antialiased">
        <NextIntlClientProvider>
          <SkipLink>{tc('skipToContent')}</SkipLink>
          <Header locale={typedLocale} />
          <ViewTransition>
            <main id="conteudo" tabIndex={-1} className="outline-none">
              {children}
            </main>
          </ViewTransition>
          <Footer locale={typedLocale} />
          <CookieConsent
            umami={{
              websiteId: settings?.analytics?.umamiWebsiteId,
              scriptUrl: settings?.analytics?.umamiScriptUrl,
            }}
            labels={{
              title: t('title'),
              text: t('text'),
              accept: t('accept'),
              reject: t('reject'),
              learnMore: t('learnMore'),
            }}
          />
        </NextIntlClientProvider>
        <RevealObserver />
        <SmoothScroll />
        {draft ? <LivePreviewListener serverURL={siteUrl} /> : null}
        <JsonLd data={organizationJsonLd({ settings, contact, social })} />
      </body>
    </html>
  )
}
