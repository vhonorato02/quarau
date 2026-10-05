'use client'

import { Container, Section } from '@quarau/ui'
import { useEffect, useRef } from 'react'

import { CMSLink, type LinkData } from '@/components/CMSLink'
import type { StatementBlock as StatementBlockType } from '@/payload-types'

import { isDarkTone, toneToSection } from './SectionHeader'

/** Manifesto-style text whose words light up as the reader scrolls (GSAP ScrollTrigger). */
export function StatementBlock({ block }: { block: StatementBlockType }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (
      !el ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      el?.querySelectorAll('.statement-word').forEach((w) => w.setAttribute('data-on', ''))
      return
    }
    let cleanup = () => {}
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const words = Array.from(el.querySelectorAll<HTMLElement>('.statement-word'))
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'bottom 45%',
        scrub: true,
        onUpdate: (self) => {
          const lit = Math.round(self.progress * words.length)
          words.forEach((w, i) =>
            i < lit ? w.setAttribute('data-on', '') : w.removeAttribute('data-on'),
          )
        },
      })
      cleanup = () => st.kill()
    })()
    return () => cleanup()
  }, [])

  const dark = isDarkTone(block.tone)
  const links = (block.links ?? []) as LinkData[]
  const words = block.text.split(/\s+/)

  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? undefined}>
      <Container className="flex flex-col gap-12">
        {block.eyebrow ? (
          <p className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase opacity-70">
            {block.eyebrow}
          </p>
        ) : null}
        <p ref={ref} className="text-h2 max-w-6xl leading-[1.12] font-medium text-balance">
          <span className="sr-only">{block.text}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="statement-word">
              {w}{' '}
            </span>
          ))}
        </p>
        {links.length ? (
          <div className="flex gap-3">
            {links.map((l, i) => (
              <CMSLink key={i} link={l} tone={dark ? 'dark' : 'light'} />
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
