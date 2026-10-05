import { Breadcrumbs, Container, Eyebrow, cn } from '@quarau/ui'
import Link from 'next/link'
import type * as React from 'react'

/** Inner-page header used by listing pages (projects, news, search…). */
export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  lead?: string | null
  crumbs?: Array<{ label: string; href?: string }>
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'bg-surface pt-[calc(var(--header-h)+clamp(2.5rem,7vw,6rem))] pb-[clamp(2.5rem,5vw,4.5rem)]',
        className,
      )}
    >
      <Container className="flex flex-col gap-8">
        {crumbs ? (
          <Breadcrumbs
            items={crumbs}
            className="text-ink-muted"
            renderLink={(c, children) => <Link href={c.href ?? '/'}>{children}</Link>}
          />
        ) : null}
        {eyebrow ? <Eyebrow className="text-blue-700">{eyebrow}</Eyebrow> : null}
        <h1 className="text-h1 max-w-5xl font-semibold text-balance motion-safe:animate-[fade-up_0.9s_var(--ease-brand)_both]">
          {title}
        </h1>
        {lead ? (
          <p className="text-lead text-ink-muted max-w-3xl text-pretty motion-safe:animate-[fade-up_1s_var(--ease-brand)_150ms_both]">
            {lead}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  )
}
