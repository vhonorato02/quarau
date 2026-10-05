import * as React from 'react'

import { cn } from '../lib/cn'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({
  items,
  className,
  renderLink = (c, children) => <a href={c.href}>{children}</a>,
}: {
  items: Crumb[]
  className?: string
  renderLink?: (crumb: Crumb, children: React.ReactNode) => React.ReactNode
}) {
  return (
    <nav aria-label="Trilha de navegação" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {last || !c.href ? (
                <span aria-current={last ? 'page' : undefined} className="opacity-80">
                  {c.label}
                </span>
              ) : (
                <span className="underline-offset-4 hover:underline">{renderLink(c, c.label)}</span>
              )}
              {!last ? (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
