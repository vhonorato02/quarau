import { Container, Section } from '@quarau/ui'
import type * as React from 'react'

import type { TimelineBlock as TimelineBlockType } from '@/payload-types'

import { SectionHeader, toneToSection } from './SectionHeader'

export function TimelineBlock({ block }: { block: TimelineBlockType }) {
  const items = block.items ?? []
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-[0.6rem] right-0 left-0 hidden h-px bg-current/20 lg:block"
          />
          {items.map((it, i) => (
            <li
              key={it.id ?? i}
              data-reveal
              style={{ '--reveal-delay': i * 80 } as React.CSSProperties}
              className="relative flex flex-col gap-3 border-l border-current/20 pl-6 lg:border-l-0 lg:pt-10 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="bg-brand-green absolute top-1.5 -left-[0.4rem] size-3 rounded-full ring-4 ring-current/5 lg:top-0 lg:left-0"
              />
              <span className="text-sm font-semibold tracking-wide tabular-nums opacity-70">
                {it.period}
              </span>
              <h3 className="text-h4 font-semibold">{it.title}</h3>
              {it.description ? <p className="text-pretty opacity-80">{it.description}</p> : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
