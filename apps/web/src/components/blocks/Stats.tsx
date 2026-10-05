import { Container, Section } from '@quarau/ui'
import type * as React from 'react'

import { Counter } from '@/components/motion/Counter'
import type { StatsBlock as StatsBlockType } from '@/payload-types'

import { SectionHeader, toneToSection } from './SectionHeader'

export function StatsBlock({ block }: { block: StatsBlockType }) {
  const items = block.items ?? []
  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined} className="overflow-hidden">
      <Container>
        <SectionHeader eyebrow={block.eyebrow} heading={block.heading} />
        <dl className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
          {items.map((it, i) => (
            <div
              key={it.id ?? i}
              data-reveal
              style={{ '--reveal-delay': i * 90 } as React.CSSProperties}
              className="flex flex-col gap-4 border-t border-current/25 pt-6"
            >
              <dt className="order-2 text-lg leading-snug font-medium text-pretty">{it.label}</dt>
              <dd className="order-1 text-[clamp(3rem,2rem+4vw,6rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                <Counter value={it.value} />
              </dd>
              {it.context ? <dd className="order-3 text-sm opacity-75">{it.context}</dd> : null}
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
