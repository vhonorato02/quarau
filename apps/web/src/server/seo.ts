import type { Metadata } from 'next'

import { absoluteUrl } from '@/lib/urls'
import type { Contact, Media, Setting, Social } from '@/payload-types'

type Meta =
  | { title?: string | null; description?: string | null; image?: number | Media | null }
  | null
  | undefined

const noindexSite = () => process.env.SITE_NOINDEX !== 'false'

/** Page metadata: CMS SEO fields first, then the document, then the site defaults. */
export function buildMetadata({
  title,
  description,
  path,
  meta,
  image,
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
  type?: 'website' | 'article'
  publishedTime?: string | null
  noindex?: boolean
  settings?: Setting | null
}): Metadata {
  const finalTitle = meta?.title || title
  const finalDescription =
    meta?.description || description || settings?.defaultDescription || undefined
  const img =
    (typeof meta?.image === 'object' && meta.image) ||
    (typeof image === 'object' && image) ||
    (typeof settings?.defaultOgImage === 'object' && settings.defaultOgImage) ||
    null
  const imgUrl = img ? (img.sizes?.og?.url ?? img.url) : null
  const ogImageUrl = imgUrl
    ? absoluteUrl(imgUrl)
    : absoluteUrl(`/next/og?title=${encodeURIComponent(finalTitle)}`)
  const canonical = absoluteUrl(path)
  const template = settings?.titleTemplate ?? '%s'
  const fullTitle = path === '/' ? finalTitle : template.replace('%s', finalTitle)
  return {
    title: { absolute: fullTitle },
    description: finalDescription,
    alternates: { canonical },
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description: finalDescription,
      siteName: settings?.siteName ?? undefined,
      locale: 'pt_BR',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: img?.alt ?? finalTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: finalDescription,
      images: [ogImageUrl],
    },
    robots:
      noindex || noindexSite() ? { index: false, follow: false } : { index: true, follow: true },
  }
}

/** schema.org Organization: only confirmed data (blank CMS fields are omitted). */
export function organizationJsonLd({
  settings,
  contact,
  social,
}: {
  settings: Setting
  contact: Contact
  social: Social
}) {
  const url = absoluteUrl('/')
  const a = contact.address
  const hasAddress = Boolean(a?.city || a?.street)
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#organization`,
    name: contact.name,
    ...(contact.legalName ? { legalName: contact.legalName } : {}),
    ...(contact.cnpj ? { taxID: contact.cnpj } : {}),
    url,
    logo: absoluteUrl('/brand/icon-512.png'),
    image: absoluteUrl('/brand/icon-512.png'),
    description: settings.defaultDescription,
    email: contact.email,
    ...(contact.phones?.[0]?.number ? { telephone: contact.phones[0].number } : {}),
    ...(contact.foundingYear ? { foundingDate: String(contact.foundingYear) } : {}),
    ...(hasAddress
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(a?.street ? { streetAddress: a.street } : {}),
            ...(a?.city ? { addressLocality: a.city } : {}),
            ...(a?.state ? { addressRegion: a.state } : {}),
            ...(a?.postalCode ? { postalCode: a.postalCode } : {}),
            addressCountry: 'BR',
          },
        }
      : {}),
    sameAs: (social.profiles ?? []).map((p) => p.url),
  }
}

export function websiteJsonLd(settings: Setting) {
  const url = absoluteUrl('/')
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: settings.siteName,
    url,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${url}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${absoluteUrl('/busca')}?q={q}` },
      'query-input': 'required name=q',
    },
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

export function articleJsonLd(a: {
  type: 'Article' | 'CreativeWork'
  title: string
  description?: string | null
  path: string
  image?: string | null
  published?: string | null
  modified?: string | null
  place?: string | null
}) {
  const url = absoluteUrl('/')
  return {
    '@context': 'https://schema.org',
    '@type': a.type,
    headline: a.title,
    name: a.title,
    ...(a.description ? { description: a.description } : {}),
    url: absoluteUrl(a.path),
    ...(a.image ? { image: absoluteUrl(a.image) } : {}),
    ...(a.published ? { datePublished: a.published } : {}),
    ...(a.modified ? { dateModified: a.modified } : {}),
    ...(a.place ? { spatialCoverage: { '@type': 'Place', name: a.place } } : {}),
    inLanguage: 'pt-BR',
    author: { '@id': `${url}#organization` },
    publisher: { '@id': `${url}#organization` },
  }
}
