import type { Metadata } from 'next'

import { ogLocale, type Locale } from '@/i18n/routing'
import type { Contact, Media, SiteSetting, Social } from '@/payload-types'

import { absoluteUrl } from './urls'

type Meta =
  | { title?: string | null; description?: string | null; image?: number | Media | null }
  | null
  | undefined

export function buildMetadata({
  title,
  description,
  path,
  meta,
  image,
  locale = 'pt',
  type = 'website',
  publishedTime,
  noindex,
  settings,
}: {
  title: string
  description?: string | null
  path: string
  meta?: Meta
  image?: number | Media | null
  locale?: Locale
  type?: 'website' | 'article'
  publishedTime?: string | null
  noindex?: boolean
  settings?: SiteSetting | null
}): Metadata {
  const finalTitle = meta?.title || title
  const finalDescription =
    meta?.description || description || settings?.defaultDescription || undefined
  const img =
    (typeof meta?.image === 'object' && meta.image) || (typeof image === 'object' && image) || null
  const ogImageUrl = img
    ? absoluteUrl(img.sizes?.og?.url ?? img.url ?? '')
    : absoluteUrl(`/next/og?title=${encodeURIComponent(finalTitle)}`)
  const canonical = absoluteUrl(path)
  const siteNoindex = process.env.SITE_NOINDEX !== 'false'
  return {
    title: meta?.title && /quarau/i.test(meta.title) ? { absolute: meta.title } : finalTitle,
    description: finalDescription,
    alternates: { canonical },
    openGraph: {
      type,
      url: canonical,
      title: finalTitle,
      description: finalDescription,
      siteName: settings?.siteName ?? 'Quarau',
      locale: ogLocale[locale],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: img?.alt ?? finalTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImageUrl],
    },
    robots:
      noindex || siteNoindex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export function organizationJsonLd({
  settings,
  contact,
  social,
}: {
  settings?: SiteSetting | null
  contact?: Contact | null
  social?: Social | null
}) {
  const url = absoluteUrl('/')
  const address = contact?.address
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${url}#organization`,
    name: settings?.siteName ?? 'Quarau',
    legalName: settings?.organization?.legalName ?? contact?.companyName ?? undefined,
    url,
    logo: absoluteUrl('/brand/icon-512.png'),
    image: absoluteUrl('/brand/icon-512.png'),
    description:
      settings?.defaultDescription ??
      'Consultoria em projetos educativos, culturais e socioambientais, da concepção à difusão de resultados.',
    email: contact?.email ?? undefined,
    telephone: contact?.phones?.[0]?.number ? `+55 ${contact.phones[0].number}` : undefined,
    foundingDate: settings?.organization?.foundingYear
      ? String(settings.organization.foundingYear)
      : undefined,
    areaServed: settings?.organization?.areaServed ?? 'Brasil',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address?.street ?? undefined,
      addressLocality: address?.city ?? 'São José dos Campos',
      addressRegion: address?.state ?? 'SP',
      postalCode: address?.postalCode ?? undefined,
      addressCountry: 'BR',
    },
    ...(address?.lat && address?.lng
      ? { geo: { '@type': 'GeoCoordinates', latitude: address.lat, longitude: address.lng } }
      : {}),
    sameAs: social?.profiles?.map((p) => p.url).filter(Boolean) ?? [],
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  }
}
