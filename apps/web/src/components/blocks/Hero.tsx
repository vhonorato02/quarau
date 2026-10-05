import { Container, Eyebrow, cn } from '@quarau/ui'
import type * as React from 'react'

import { CMSLink, type LinkData } from '@/components/CMSLink'
import { HeroVisual } from '@/components/hero/HeroVisual'
import { Media } from '@/components/Media'
import type { HeroBlock as HeroBlockType } from '@/payload-types'

/** Splits the headline into words animated in sequence (pure CSS, no JS needed). */
function AnimatedHeading({
  text,
  className,
  size = 'text-display',
}: {
  text: string
  className?: string
  size?: string
}) {
  const words = text.split(/\s+/)
  return (
    <h1 className={cn(size, 'font-semibold text-balance', className)}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <span
            className="inline-block motion-safe:animate-[word-up_1s_var(--ease-brand)_both]"
            style={{ animationDelay: `${120 + i * 70}ms` }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </h1>
  )
}

export function HeroBlock({ block, isFirst }: { block: HeroBlockType; isFirst?: boolean }) {
  const links = (block.links ?? []) as LinkData[]
  const variant = block.variant ?? 'immersive'

  if (variant === 'simple') {
    return (
      <section className="bg-surface pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-[clamp(3rem,6vw,5rem)]">
        <Container className="flex flex-col gap-8">
          {block.eyebrow ? <Eyebrow className="text-blue-700">{block.eyebrow}</Eyebrow> : null}
          <AnimatedHeading text={block.heading} size="text-h1" className="max-w-5xl" />
          {block.lead ? (
            <p className="text-lead text-ink-muted max-w-2xl motion-safe:animate-[fade-up_1s_var(--ease-brand)_400ms_both]">
              {block.lead}
            </p>
          ) : null}
          {links.length ? (
            <div className="flex flex-wrap gap-3">
              {links.map((l, i) => (
                <CMSLink key={i} link={l} size="lg" />
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    )
  }

  const immersive = variant === 'immersive'
  return (
    <section
      data-hero-dark
      className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-blue-950 text-white"
    >
      {block.media ? (
        <div className="absolute inset-0 -z-10">
          <Media
            media={block.media}
            fill
            priority={isFirst}
            sizes="100vw"
            quality={75}
            imgClassName={cn(
              'scale-105 motion-safe:animate-[hero-zoom_14s_var(--ease-brand)_both]',
              immersive && 'opacity-55',
            )}
          />
          <div
            className={cn(
              'absolute inset-0',
              immersive
                ? 'bg-[radial-gradient(120%_90%_at_80%_20%,transparent_0%,rgb(4_38_58/0.55)_45%,rgb(4_38_58/0.96)_100%)]'
                : 'bg-gradient-to-t from-blue-950/95 via-blue-950/40 to-blue-950/10',
            )}
          />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_75%_30%,#0b4a6e_0%,#04263a_70%)]" />
      )}

      {immersive ? (
        <div className="pointer-events-none absolute top-[calc(var(--header-h)+2rem)] right-[2%] hidden w-[min(34vw,30rem)] md:block">
          <HeroVisual />
        </div>
      ) : null}

      <Container className="relative pt-[calc(var(--header-h)+4rem)] pb-[clamp(3rem,7vw,6.5rem)]">
        <div className="flex max-w-6xl flex-col gap-8 md:max-w-[78%] lg:max-w-[72%]">
          {block.eyebrow ? (
            <Eyebrow className="text-white/85 motion-safe:animate-[fade-up_0.9s_var(--ease-brand)_both]">
              {block.eyebrow}
            </Eyebrow>
          ) : null}
          <AnimatedHeading
            text={block.heading}
            size="text-[clamp(2.75rem,1.1rem+4.6vw,6.75rem)] leading-[0.94] tracking-[-0.035em]"
          />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {block.lead ? (
              <p
                className="text-lead max-w-xl text-white/85 motion-safe:animate-[fade-up_1s_var(--ease-brand)_both]"
                style={{ animationDelay: '500ms' } as React.CSSProperties}
              >
                {block.lead}
              </p>
            ) : null}
            {links.length ? (
              <div
                className="flex flex-wrap gap-3 motion-safe:animate-[fade-up_1s_var(--ease-brand)_both]"
                style={{ animationDelay: '650ms' }}
              >
                {links.map((l, i) => (
                  <CMSLink key={i} link={l} tone="dark" size="lg" />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="block h-12 w-px overflow-hidden bg-white/20">
          <span className="bg-brand-green block h-1/2 w-px motion-safe:animate-[scroll-hint_2s_var(--ease-in-out-brand)_infinite]" />
        </span>
      </div>
    </section>
  )
}
