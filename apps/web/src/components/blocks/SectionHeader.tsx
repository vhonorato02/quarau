import { cn, Eyebrow, Heading } from '@quarau/ui'
import type * as React from 'react'

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  className,
  align = 'left',
  action,
  as = 'h2',
}: {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  className?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
  as?: 'h1' | 'h2'
}) {
  if (!eyebrow && !heading && !intro) return null
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 lg:mb-16',
        align === 'center' && 'items-center text-center',
        action && 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex max-w-3xl flex-col gap-5', align === 'center' && 'items-center')}>
        {eyebrow ? (
          <Eyebrow data-reveal className="text-current opacity-80">
            {eyebrow}
          </Eyebrow>
        ) : null}
        {heading ? (
          <Heading as={as} size="h2" data-reveal style={{ '--reveal-delay': 80 } as React.CSSProperties}>
            {heading}
          </Heading>
        ) : null}
        {intro ? (
          <p data-reveal className="text-lead text-pretty opacity-80" style={{ '--reveal-delay': 160 } as React.CSSProperties}>
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div data-reveal>{action}</div> : null}
    </div>
  )
}

export const toneToSection = (tone?: string | null) =>
  (tone === 'alt' || tone === 'brand' || tone === 'dark' ? tone : 'default') as 'default' | 'alt' | 'brand' | 'dark'

export const isDarkTone = (tone?: string | null) => tone === 'brand' || tone === 'dark'
