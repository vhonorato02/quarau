import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '../lib/cn'

export const buttonVariants = cva(
  [
    'group/button relative inline-flex items-center justify-center gap-2.5 font-medium whitespace-nowrap select-none',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-(--duration-base) ease-(--ease-brand)',
    'disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
    '[&_svg]:size-[1.1em] [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-blue-700 text-white hover:bg-blue-800',
        secondary:
          'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white',
        ghost: 'text-blue-700 hover:bg-blue-50',
        inverse: 'bg-white text-ink hover:bg-blue-50',
        'outline-inverse':
          'border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink',
        link: 'px-0 text-blue-700 underline-offset-[0.25em] hover:underline',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-[1.0625rem]',
      },
      shape: {
        pill: 'rounded-full',
        square: 'rounded-sm',
      },
    },
    compoundVariants: [{ variant: 'link', className: 'h-auto' }],
    defaultVariants: { variant: 'primary', size: 'md', shape: 'pill' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a Next.js Link) with button styles. */
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...(asChild ? {} : { type: type ?? 'button' })}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

/** Arrow icon used by call-to-action buttons; slides on hover. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={cn(
        'transition-transform duration-(--duration-base) ease-(--ease-brand) group-hover/button:translate-x-1',
        className,
      )}
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
