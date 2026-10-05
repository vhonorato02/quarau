import { Breadcrumbs, Container, Eyebrow, Heading, OdsList, Quote, Section, cn } from '@quarau/ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type * as React from 'react'

import { GalleryGrid } from '@/components/blocks/GalleryGrid'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { VideoPlayer } from '@/components/blocks/VideoPlayer'
import { JsonLd } from '@/components/JsonLd'
import { Media, isMedia, mediaUrl } from '@/components/Media'
import { Counter } from '@/components/motion/Counter'
import { projectPeriod } from '@/components/projects/ProjectCard'
import { RichText } from '@/components/RichText'
import type { Locale } from '@/i18n/routing'
import { applyCmsRedirect } from '@/lib/page-helpers'
import { getDocBySlug, getGlobal, listDocs } from '@/lib/queries'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { absoluteUrl, docPath } from '@/lib/urls'
import type { Media as MediaDoc, Page, Partner, Service } from '@/payload-types'

export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: PageProps<'/[locale]/projetos/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const [project, settings] = await Promise.all([
    getDocBySlug('projects', slug, locale as Locale).catch(() => null),
    getGlobal('site-settings', locale as Locale).catch(() => null),
  ])
  if (!project) return {}
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: docPath('projects', slug),
    meta: project.meta,
    image: project.coverImage,
    locale: locale as Locale,
    type: 'article',
    publishedTime: project.publishedAt,
    settings,
  })
}

const accents = {
  blue: 'bg-brand-blue text-white',
  green: 'bg-brand-green text-ink',
  dark: 'bg-blue-950 text-white',
} as const

export default async function ProjectPage({ params }: PageProps<'/[locale]/projetos/[slug]'>) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const project = await getDocBySlug('projects', slug, locale as Locale)
  if (!project) {
    await applyCmsRedirect(`/projetos/${slug}`)
    notFound()
  }
  const t = await getTranslations('projects')
  const tc = await getTranslations('common')

  const all = await listDocs('projects', { locale: locale as Locale, sort: '-startYear', depth: 1 })
  const idx = all.findIndex((p) => p.id === project.id)
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null

  const period = projectPeriod(project, tc('inProgress'))
  const partners = (project.partners ?? []).filter((p): p is Partner => typeof p === 'object')
  const services = (project.services ?? []).filter((s): s is Service => typeof s === 'object')
  const gallery = (project.gallery ?? []).filter(isMedia) as MediaDoc[]
  const accent = accents[(project.accent as keyof typeof accents) ?? 'blue'] ?? accents.blue

  const facts: Array<[string, React.ReactNode]> = [
    [t('client'), project.client],
    [t('period'), period],
    [t('location'), project.location],
    [t('role'), project.role],
    [t('partners'), partners.length ? partners.map((p) => p.name).join(' · ') : null],
    [
      t('areas'),
      services.length
        ? services.map((s, i) => (
            <span key={s.id}>
              {i > 0 ? ' · ' : ''}
              <Link href={docPath('services', s.slug)} className="underline-offset-4 hover:underline">
                {s.title}
              </Link>
            </span>
          ))
        : null,
    ],
  ].filter(([, v]) => Boolean(v)) as Array<[string, React.ReactNode]>

  return (
    <article>
      {/* Hero */}
      <header data-hero-dark className="on-dark relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-blue-950 text-white">
        <div className="absolute inset-0 -z-10">
          <Media media={project.coverImage} fill priority sizes="100vw" imgClassName="motion-safe:animate-[hero-zoom_14s_var(--ease-brand)_both]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/55 to-blue-950/10" />
        </div>
        <Container className="flex flex-col gap-8 pt-[calc(var(--header-h)+3rem)] pb-[clamp(3rem,6vw,5.5rem)]">
          <Breadcrumbs
            items={[{ label: 'Início', href: '/' }, { label: t('title'), href: '/projetos' }, { label: project.title }]}
            className="text-white/80"
            renderLink={(c, children) => <Link href={c.href ?? '/'}>{children}</Link>}
          />
          <h1 className="max-w-6xl text-h1 font-semibold text-balance motion-safe:animate-[fade-up_1s_var(--ease-brand)_both]">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm font-medium motion-safe:animate-[fade-up_1s_var(--ease-brand)_200ms_both]">
            {project.client ? <span className="rounded-full border border-white/30 px-4 py-2 backdrop-blur">{project.client}</span> : null}
            {period ? <span className="rounded-full border border-white/30 px-4 py-2 tabular-nums backdrop-blur">{period}</span> : null}
            {project.location ? <span className="rounded-full border border-white/30 px-4 py-2 backdrop-blur">{project.location}</span> : null}
          </div>
        </Container>
      </header>

      {/* Summary + fact sheet */}
      <Section>
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {project.summary ? (
              <p data-reveal className="text-h3 leading-snug font-medium text-balance">
                {project.summary}
              </p>
            ) : null}
          </div>
          <dl data-reveal className="grid content-start gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-ink-muted uppercase">{k}</dt>
                <dd className="text-lg font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Results */}
      {project.highlights?.length ? (
        <section className={cn('on-dark py-[calc(var(--spacing-section)*0.6)]', accent)}>
          <Container>
            <h2 className="mb-10 text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase opacity-80">
              {t('results')}
            </h2>
            <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
              {project.highlights.map((h, i) => (
                <div
                  key={h.id ?? i}
                  data-reveal
                  style={{ '--reveal-delay': i * 90 } as React.CSSProperties}
                  className="flex flex-col gap-3 border-t border-current/30 pt-5"
                >
                  <dt className="order-2 text-lg font-medium text-pretty">{h.label}</dt>
                  <dd className="order-1 text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                    <Counter value={h.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {/* Story */}
      {project.body ? (
        <Section>
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow className="lg:sticky lg:top-28">Sobre o projeto</Eyebrow>
            </div>
            <div data-reveal className="lg:col-span-7 lg:col-start-6">
              <RichText data={project.body} className="text-[1.125rem] leading-[1.75]" />
            </div>
          </Container>
        </Section>
      ) : null}

      {project.quote?.text ? (
        <Section tone="alt" spacing="tight">
          <Container className="max-w-5xl">
            <div data-reveal>
              <Quote quote={project.quote.text} author={project.quote.source ?? undefined} />
            </div>
          </Container>
        </Section>
      ) : null}

      {project.chapters?.length ? (
        <RenderBlocks blocks={project.chapters as NonNullable<Page['layout']>} locale={locale as Locale} />
      ) : null}

      {isMedia(project.video) && project.video.url ? (
        <Section tone="dark">
          <Container className="flex flex-col gap-10">
            <Heading size="h2" data-reveal>
              Assista
            </Heading>
            <VideoPlayer
              src={mediaUrl(project.video)!}
              title={`Vídeo: ${project.title}`}
              poster={mediaUrl(gallery[0] ?? project.coverImage, 'wide')}
            />
          </Container>
        </Section>
      ) : null}

      {project.ods?.length ? (
        <Section spacing="tight">
          <Container className="grid gap-8 lg:grid-cols-12">
            <h2 className="text-h4 font-semibold lg:col-span-4">{t('ods')}</h2>
            <div data-reveal className="lg:col-span-8">
              <OdsList numbers={project.ods.map(Number)} />
            </div>
          </Container>
        </Section>
      ) : null}

      {gallery.length ? (
        <Section tone="alt">
          <Container className="flex flex-col gap-12">
            <div className="flex items-end justify-between gap-6">
              <Heading size="h2" data-reveal>
                {t('gallery')}
              </Heading>
              <span className="text-sm text-ink-muted tabular-nums">{gallery.length} fotos</span>
            </div>
            <GalleryGrid images={gallery} />
          </Container>
        </Section>
      ) : null}

      {project.publications?.length ? (
        <Section>
          <Container>
            <Heading size="h2" className="mb-12" data-reveal>
              {t('publications')}
            </Heading>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.publications.map((pub, i) => (
                <li key={pub.id ?? i} data-reveal style={{ '--reveal-delay': i * 80 } as React.CSSProperties}>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full gap-5 rounded-lg border border-line p-5 transition-colors hover:border-blue-700"
                  >
                    {isMedia(pub.cover) ? (
                      <span className="relative block aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-sm bg-surface-sunken shadow-card">
                        <Media media={pub.cover} fill sizes="96px" />
                      </span>
                    ) : null}
                    <span className="flex flex-col justify-between gap-4">
                      <span className="text-lg font-semibold text-balance">{pub.label}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        Ler publicação
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="sr-only">(abre em nova aba)</span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Next project */}
      {next && next.id !== project.id ? (
        <Link href={docPath('projects', next.slug)} className="group on-dark relative isolate block overflow-hidden bg-ink text-white">
          <div className="absolute inset-0 -z-10 opacity-40 transition-[opacity,transform] duration-1000 ease-(--ease-brand) group-hover:scale-105 group-hover:opacity-60">
            <Media media={next.coverImage} fill sizes="100vw" />
          </div>
          <Container className="flex min-h-[60svh] flex-col justify-end gap-6 py-20">
            <span className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase opacity-80">Próximo projeto</span>
            <span className="flex items-end justify-between gap-8">
              <span className="max-w-5xl text-h1 font-semibold text-balance">{next.title}</span>
              <span aria-hidden="true" className="hidden size-20 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-[-45deg] md:grid">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Container>
        </Link>
      ) : null}

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: t('title'), path: '/projetos' },
            { name: project.title, path: docPath('projects', slug) },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.summary ?? undefined,
            url: absoluteUrl(docPath('projects', slug)),
            image: mediaUrl(project.coverImage, 'og') ? absoluteUrl(mediaUrl(project.coverImage, 'og')!) : undefined,
            dateCreated: project.startYear ? String(project.startYear) : undefined,
            locationCreated: project.location ? { '@type': 'Place', name: project.location } : undefined,
            creator: { '@id': `${absoluteUrl('/')}#organization` },
            sponsor: partners.map((p) => ({ '@type': 'Organization', name: p.fullName ?? p.name })),
          },
        ]}
      />
    </article>
  )
}
