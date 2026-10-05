import * as React from 'react'

import { cn } from '../lib/cn'
import { isOdsNumber, ODS, type OdsNumber } from '../lib/ods'

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
        'inline-flex items-stretch overflow-hidden rounded-md border border-line bg-surface text-sm leading-tight text-ink',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid w-9 shrink-0 place-items-center text-base font-bold text-white"
        style={{ backgroundColor: ods.color }}
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
    <ul className={cn('flex flex-wrap gap-2', className)} aria-label="Objetivos de Desenvolvimento Sustentável">
      {valid.map((n) => (
        <li key={n}>
          <OdsChip number={n} />
        </li>
      ))}
    </ul>
  )
}
