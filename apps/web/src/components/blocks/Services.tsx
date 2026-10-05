import { Container, Section } from '@quarau/ui'
import Link from 'next/link'
import type * as React from 'react'

import type { Locale } from '@/i18n/routing'
import { listDocs } from '@/lib/queries'
import { docPath } from '@/lib/urls'
import type { Service, ServicesBlock as ServicesBlockType } from '@/payload-types'

import { SectionHeader, toneToSection } from './SectionHeader'
import { ServiceIcon } from './ServiceIcon'

export async function ServicesBlock({ block, locale }: { block: ServicesBlockType; locale: Locale }) {
  const selected = (block.services ?? []).filter((s): s is Service => typeof s === 'object')
  const services = selected.length ? selected : await listDocs('services', { locale, sort: 'order', depth: 0 })
  if (!services.length) return null
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              style={{ '--reveal-delay': i * 80 } as React.CSSProperties}
              className="group relative flex flex-col gap-6 bg-surface p-8 transition-colors duration-500 hover:bg-blue-950 hover:text-white lg:p-12"
            >
              <div className="flex items-start justify-between">
                <ServiceIcon name={s.icon} className="size-12 text-blue-700 transition-colors group-hover:text-brand-green" />
                <span className="text-sm font-semibold tabular-nums opacity-50">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-h3 font-semibold text-balance">
                <Link href={docPath('services', s.slug)} className="after:absolute after:inset-0 after:content-['']">
                  {s.title}
                </Link>
              </h3>
              {s.summary ? <p className="max-w-md text-pretty opacity-80">{s.summary}</p> : null}
              <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">
                Conhecer a área
                <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
