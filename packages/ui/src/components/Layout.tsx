import * as React from 'react'

import { cn } from '../lib/cn'

type PolymorphicProps<T extends React.ElementType> = {
  as?: T
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'div'
  return <Comp className={cn('container-site', className)} {...props} />
}

const tones = {
  default: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  brand: 'on-dark bg-brand-blue text-white',
  dark: 'on-dark bg-blue-950 text-white',
  ink: 'on-dark bg-ink text-white',
} as const

export type SectionTone = keyof typeof tones

export function Section<T extends React.ElementType = 'section'>({
  as,
  className,
  tone = 'default',
  spacing = 'default',
  ...props
}: PolymorphicProps<T> & { tone?: SectionTone; spacing?: 'default' | 'tight' | 'none' }) {
  const Comp = as ?? 'section'
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
