import { Container, Section } from '@quarau/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { ProjectsBlock } from '@/components/blocks/Projects'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ServiceIcon } from '@/components/blocks/ServiceIcon'
import { JsonLd } from '@/components/JsonLd'
import { PageHeader } from '@/components/PageHeader'
import { RichText } from '@/components/RichText'
import type { Locale } from '@/i18n/routing'
import { applyCmsRedirect } from '@/lib/page-helpers'
import { getDocBySlug, getGlobal, listDocs } from '@/lib/queries'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { absoluteUrl, docPath } from '@/lib/urls'
import type { Page } from '@/payload-types'

export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: PageProps<'/[locale]/atuacao/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const [s, settings] = await Promise.all([
    getDocBySlug('services', slug, locale as Locale).catch(() => null),
    getGlobal('site-settings', locale as Locale).catch(() => null),
  ])
  if (!s) return {}
  return buildMetadata({ title: s.title, description: s.summary, path: docPath('services', slug), meta: s.meta, image: s.coverImage, locale: locale as Locale, settings })
}

export default async function ServicePage({ params }: PageProps<'/[locale]/atuacao/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const service = await getDocBySlug('services', slug, locale as Locale)
  if (!service) {
    await applyCmsRedirect(`/atuacao/${slug}`)
    notFound()
  }
  const projects = (await listDocs('projects', { locale: locale as Locale, sort: '-startYear', depth: 1 })).filter((p) =>
    (p.services ?? []).some((s) => (typeof s === 'object' ? s.id : s) === service.id),
  )
  return (
    <>
      <PageHeader
        eyebrow="Área de atuação"
        title={service.title}
        lead={service.summary}
        crumbs={[{ label: 'Início', href: '/' }, { label: 'Atuação', href: '/atuacao' }, { label: service.title }]}
      >
        <ServiceIcon name={service.icon} className="size-14 text-blue-700" />
      </PageHeader>
      {service.body || service.deliverables?.length ? (
        <Section tone="alt">
          <Container className="grid gap-14 lg:grid-cols-12">
            <div data-reveal className="lg:col-span-7">
              <RichText data={service.body} className="text-[1.125rem] leading-[1.75]" />
            </div>
            {service.deliverables?.length ? (
              <aside data-reveal className="lg:col-span-4 lg:col-start-9">
                <h2 className="mb-6 text-h4 font-semibold">O que entregamos</h2>
                <ul className="flex flex-col divide-y divide-line border-y border-line">
                  {service.deliverables.map((d, i) => (
                    <li key={d.id ?? i} className="flex gap-4 py-4">
                      <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-brand-green" />
                      {d.item}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </Container>
        </Section>
      ) : null}
      {service.layout?.length ? <RenderBlocks blocks={service.layout as NonNullable<Page['layout']>} locale={locale as Locale} /> : null}
      {projects.length ? (
        <ProjectsBlock
          locale={locale as Locale}
          block={{ blockType: 'projects', mode: 'selected', selected: projects, limit: 6, heading: 'Projetos nesta área', eyebrow: 'Cases', showAllLink: true, tone: 'default' }}
        />
      ) : null}
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Atuação', path: '/atuacao' },
            { name: service.title, path: docPath('services', slug) },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.summary ?? undefined,
            url: absoluteUrl(docPath('services', slug)),
            provider: { '@id': `${absoluteUrl('/')}#organization` },
            areaServed: 'BR',
          },
        ]}
      />
    </>
  )
}
