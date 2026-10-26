import * as React from 'react'

import { cn } from '../lib/cn'

export interface StatProps {
  value: string
  label: string
  /** Short source / context line (e.g. "Ecomuseu, 2021–2023"). */
  context?: string
  className?: string
}

export function Stat({ value, label, context, className }: StatProps) {
  return (
    <div className={cn('flex flex-col gap-3 border-t border-current/20 pt-6', className)}>
      <dt className="order-2 text-lg leading-snug font-medium text-pretty">{label}</dt>
      <dd className="text-h1 order-1 font-semibold tabular-nums" data-stat-value={value}>
        {value}
      </dd>
      {context ? <dd className="order-3 text-sm opacity-75">{context}</dd> : null}
    </div>
  )
}
