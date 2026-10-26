import { ArrowIcon, Button, cn } from '@quarau/ui'
import Link from 'next/link'
import type * as React from 'react'

import { docPath, type RoutableCollection } from '@/lib/urls'

export type LinkData = {
  type?: 'internal' | 'external' | null
  newTab?: boolean | null
  reference?: { relationTo: string; value: number | { slug?: string | null } | null } | null
  url?: string | null
  label?: string | null
  appearance?: 'primary' | 'secondary' | 'link' | null
}

export function resolveHref(link: LinkData): string | null {
  if (link.type === 'external') return link.url ?? null
  const ref = link.reference
  if (ref && typeof ref.value === 'object' && ref.value) {
    return docPath(ref.relationTo as RoutableCollection, ref.value.slug)
  }
  return link.url ?? null
}

export function CMSLink({
  link,
  className,
  tone = 'light',
  size = 'md',
  children,
}: {
  link: LinkData
  className?: string
  tone?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}) {
  const href = resolveHref(link)
  if (!href) return null
  const label = children ?? link.label
  const external = /^https?:\/\//.test(href)
  const targetProps = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const inner = (
    <>
      {label}
      {link.newTab ? <span className="sr-only"> (abre em nova aba)</span> : null}
    </>
  )

  if (!link.appearance || link.appearance === 'link') {
    const cls = cn('underline-offset-4 hover:underline', className)
    return external ? (
      <a href={href} className={cls} {...targetProps}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} {...targetProps}>
        {inner}
      </Link>
    )
  }

  const variant =
    link.appearance === 'primary'
      ? tone === 'dark'
        ? 'inverse'
        : 'primary'
      : tone === 'dark'
        ? 'outline-inverse'
        : 'secondary'

  return (
    <Button asChild variant={variant} size={size} className={className}>
      {external ? (
        <a href={href} {...targetProps}>
          {inner}
          <ArrowIcon />
        </a>
      ) : (
        <Link href={href} {...targetProps}>
          {inner}
          <ArrowIcon />
        </Link>
      )}
    </Button>
  )
}
