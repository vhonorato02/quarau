import * as React from 'react'

import { cn } from '../lib/cn'
import { isOdsNumber, ODS, type OdsNumber } from '../lib/ods'

/** Picks ink or white for text on a given background (WCAG contrast). */
function readableOn(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return 1.05 / (lum + 0.05) >= (lum + 0.05) / 0.0618 ? '#ffffff' : '#0e1a24'
}

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1 text-sm font-medium',
        className,
      )}
      {...props}
    />
  )
}

/** A UN Sustainable Development Goal chip using the official number colour. */
export function OdsChip({ number, className }: { number: number; className?: string }) {
  if (!isOdsNumber(number)) return null
  const ods = ODS[number as OdsNumber]
  return (
    <span
      className={cn(
        'border-line bg-surface text-ink inline-flex items-stretch overflow-hidden rounded-md border text-sm leading-tight',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid w-9 shrink-0 place-items-center text-base font-bold"
        style={{ backgroundColor: ods.color, color: readableOn(ods.color) }}
      >
        {number}
      </span>
      <span className="px-3 py-2">
        <span className="sr-only">ODS {number}: </span>
        {ods.name}
      </span>
    </span>
  )
}

export function OdsList({ numbers, className }: { numbers: number[]; className?: string }) {
  const valid = numbers.filter(isOdsNumber)
  if (!valid.length) return null
  return (
    <ul
      className={cn('flex flex-wrap gap-2', className)}
      aria-label="Objetivos de Desenvolvimento Sustentável"
    >
      {valid.map((n) => (
        <li key={n}>
          <OdsChip number={n} />
        </li>
      ))}
    </ul>
  )
}
