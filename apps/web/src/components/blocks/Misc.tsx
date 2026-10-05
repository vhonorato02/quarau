import { Accordion, Container, Heading, OdsList, Quote, Section } from '@quarau/ui'
import type * as React from 'react'

import { CMSLink, type LinkData } from '@/components/CMSLink'
import { JsonLd } from '@/components/JsonLd'
import { Media, isMedia, toRelative } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Locale } from '@/i18n/routing'
import { listDocs } from '@/lib/queries'
import type {
  CtaBlock as CtaBlockType,
  Document as DocumentDoc,
  DownloadsBlock as DownloadsBlockType,
  FaqBlock as FaqBlockType,
  OdsBlock as OdsBlockType,
  Partner,
  PartnersBlock as PartnersBlockType,
  Team,
  TeamBlock as TeamBlockType,
  TestimonialsBlock as TestimonialsBlockType,
} from '@/payload-types'
import { lexicalToText } from '@/utilities/lexical'

import { SectionHeader, isDarkTone, toneToSection } from './SectionHeader'

export function TestimonialsBlock({ block }: { block: TestimonialsBlockType }) {
  const items = block.items ?? []
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <div className="grid gap-16 lg:grid-cols-2">
          {items.map((it, i) => (
            <div
              key={it.id ?? i}
              data-reveal
              style={{ '--reveal-delay': i * 100 } as React.CSSProperties}
            >
              <Quote quote={it.quote} author={it.author ?? undefined} role={it.role ?? undefined} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export async function PartnersBlock({
  block,
  locale,
}: {
  block: PartnersBlockType
  locale: Locale
}) {
  const selected = (block.partners ?? []).filter((p): p is Partner => typeof p === 'object')
  const partners = selected.length
    ? selected
    : (await listDocs('partners', { locale, sort: 'order', depth: 1 })).filter(
        (p) => p.showOnHome !== false,
      )
  if (!partners.length) return null
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined} spacing="tight">
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="border-line bg-line grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => {
            const logo = isMedia(p.logo) ? p.logo : null
            const content = logo ? (
              <span className="relative block h-16 w-full max-w-[11rem]">
                <Media
                  media={logo}
                  alt={p.fullName ?? p.name}
                  fill
                  sizes="176px"
                  imgClassName="!object-contain grayscale transition-[filter,opacity] duration-500 group-hover:grayscale-0 group-hover:opacity-100 md:opacity-80"
                />
              </span>
            ) : (
              <span className="text-center font-semibold">{p.name}</span>
            )
            return (
              <li
                key={p.id}
                data-reveal="fade"
                style={{ '--reveal-delay': i * 60 } as React.CSSProperties}
                className="group bg-surface grid aspect-[3/2] place-items-center p-6"
                title={p.fullName ?? p.name}
              >
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid w-full place-items-center"
                  >
                    {content}
                    <span className="sr-only">{p.fullName ?? p.name} (abre em nova aba)</span>
                  </a>
                ) : (
                  content
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

export function OdsBlock({ block }: { block: OdsBlockType }) {
  const goals = (block.goals ?? []).map(Number)
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined} spacing="tight">
      <Container className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <SectionHeader eyebrow={block.eyebrow} heading={block.heading} className="mb-0 lg:mb-0" />
          {block.text ? <p className="text-pretty opacity-80">{block.text}</p> : null}
        </div>
        <div data-reveal className="lg:col-span-7">
          <OdsList numbers={goals} />
        </div>
      </Container>
    </Section>
  )
}

export async function TeamBlock({ block, locale }: { block: TeamBlockType; locale: Locale }) {
  const selected = (block.members ?? []).filter((m): m is Team => typeof m === 'object')
  const members = selected.length
    ? selected
    : await listDocs('team', { locale, sort: 'order', depth: 1 })
  if (!members.length) return null
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <li
              key={m.id}
              data-reveal
              style={{ '--reveal-delay': (i % 4) * 80 } as React.CSSProperties}
              className="flex flex-col gap-4"
            >
              <div className="bg-surface-sunken relative aspect-[4/5] overflow-hidden rounded-lg">
                {m.photo ? (
                  <Media media={m.photo} fill sizes="(min-width: 1024px) 25vw, 50vw" alt={m.name} />
                ) : null}
              </div>
              <div>
                <h3 className="text-h4 font-semibold">{m.name}</h3>
                <p className="opacity-75">{m.role}</p>
              </div>
              {m.bio ? <p className="text-sm text-pretty opacity-80">{m.bio}</p> : null}
              <div className="flex gap-4 text-sm font-semibold">
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    LinkedIn<span className="sr-only"> de {m.name} (abre em nova aba)</span>
                  </a>
                ) : null}
                {m.lattes ? (
                  <a
                    href={m.lattes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    Lattes<span className="sr-only"> de {m.name} (abre em nova aba)</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const formatBytes = (n?: number | null) =>
  n ? `${(n / 1024 / 1024).toFixed(n > 1024 * 1024 ? 1 : 2)} MB` : ''

export async function DownloadsBlock({
  block,
  locale,
}: {
  block: DownloadsBlockType
  locale: Locale
}) {
  const selected = (block.documents ?? []).filter((d): d is DocumentDoc => typeof d === 'object')
  const docs = selected.length
    ? selected
    : await listDocs('documents', { locale, sort: 'order', depth: 0 })
  if (!docs.length) return null
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="divide-line border-line divide-y border-y">
          {docs.map((d) => (
            <li key={d.id}>
              <a
                href={toRelative(d.url) ?? '#'}
                download
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-blue-700"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-h4 font-semibold">{d.title}</span>
                  {d.description ? <span className="text-ink-muted">{d.description}</span> : null}
                </span>
                <span className="text-ink-muted flex shrink-0 items-center gap-3 text-sm">
                  <span className="uppercase">{d.filename?.split('.').pop()}</span>
                  <span>{formatBytes(d.filesize)}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-5 transition-transform group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export function FaqBlock({ block }: { block: FaqBlockType }) {
  const items = block.items ?? []
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        </div>
        <div className="lg:col-span-8">
          <Accordion
            items={items.map((it, i) => ({
              id: it.id ?? String(i),
              question: it.question,
              answer: <RichText data={it.answer} prose={false} />,
            }))}
          />
        </div>
      </Container>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((it) => ({
            '@type': 'Question',
            name: it.question,
            acceptedAnswer: { '@type': 'Answer', text: lexicalToText(it.answer) },
          })),
        }}
      />
    </Section>
  )
}

export function CtaBlock({ block }: { block: CtaBlockType }) {
  const dark = isDarkTone(block.tone)
  return (
    <Section tone={toneToSection(block.tone)} spacing="tight" className="overflow-hidden">
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <Heading size="h1" dot data-reveal>
            {block.heading}
          </Heading>
          {block.text ? (
            <p data-reveal className="text-lead max-w-2xl text-pretty opacity-85">
              {block.text}
            </p>
          ) : null}
        </div>
        <div data-reveal className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          {((block.links ?? []) as LinkData[]).map((l, i) => (
            <CMSLink key={i} link={l} tone={dark ? 'dark' : 'light'} size="lg" />
          ))}
        </div>
      </Container>
    </Section>
  )
}
