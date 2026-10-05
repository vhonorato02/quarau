import * as React from 'react'

import { cn } from '../lib/cn'

const sizes = {
  display: 'text-display font-semibold',
  h1: 'text-h1 font-semibold',
  h2: 'text-h2 font-semibold',
  h3: 'text-h3 font-semibold',
  h4: 'text-h4 font-semibold',
} as const

export type HeadingSize = keyof typeof sizes

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  size?: HeadingSize
  /** Append the brand's green full stop, echoing the logotype. */
  dot?: boolean
}

export function Heading({ as = 'h2', size = 'h2', dot = false, className, children, ...props }: HeadingProps) {
  const Comp = as
  return (
    <Comp className={cn(sizes[size], 'text-balance', className)} {...props}>
      {children}
      {dot ? <BrandDot className="ml-[0.08em] inline-block size-[0.17em] align-baseline" /> : null}
    </Comp>
  )
}

export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-eyebrow flex items-center gap-3 font-semibold tracking-(--text-eyebrow--letter-spacing) uppercase',
        className,
      )}
      {...props}
    >
      <BrandDot className="size-2 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-lead text-pretty', className)} {...props} />
}

/** The green dot from the Quarau logotype, used as a decorative brand motif. */
export function BrandDot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('rounded-full bg-brand-green', className)} />
}
