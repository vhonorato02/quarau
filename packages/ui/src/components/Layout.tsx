import * as React from 'react'

import { cn } from '../lib/cn'

type BoxTag = 'div' | 'section' | 'header' | 'footer' | 'article' | 'aside' | 'nav' | 'main'
type BoxProps = React.HTMLAttributes<HTMLElement> & { as?: BoxTag }

export function Container({ as = 'div', className, ...props }: BoxProps) {
  const Comp = as
  return <Comp className={cn('container-site', className)} {...props} />
}

const tones = {
  default: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  /** Brand blue surface in its accessible tone (white text ≥ 4.5:1). See docs/brand.md. */
  brand: 'on-dark bg-blue-700 text-white',
  dark: 'on-dark bg-blue-950 text-white',
  ink: 'on-dark bg-ink text-white',
} as const

export type SectionTone = keyof typeof tones

export function Section({
  as = 'section',
  className,
  tone = 'default',
  spacing = 'default',
  ...props
}: BoxProps & { tone?: SectionTone; spacing?: 'default' | 'tight' | 'none' }) {
  const Comp = as
  return (
    <Comp
      data-tone={tone}
      className={cn(
        'relative',
        tones[tone],
        spacing === 'default' && 'py-(--spacing-section)',
        spacing === 'tight' && 'py-[calc(var(--spacing-section)*0.55)]',
        className,
      )}
      {...props}
    />
  )
}
