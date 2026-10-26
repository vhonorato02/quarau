import { cx } from '@quarau/ui'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { docPath, isRoutable } from '@/lib/urls'
import { getTexts } from '@/server/queries'

export type LinkData = {
  type?: 'internal' | 'external' | null
  newTab?: boolean | null
  reference?: { relationTo: string; value: number | { slug?: string | null } | null } | null
  url?: string | null
  label?: string | null
}

export function resolveHref(link: LinkData | null | undefined): string | null {
  if (!link) return null
  if (link.type === 'external') return link.url || null
  const ref = link.reference
  if (ref && typeof ref.value === 'object' && ref.value && isRoutable(ref.relationTo)) {
    return docPath(ref.relationTo, ref.value.slug)
  }
  return null
}

type Variant = 'primary' | 'ghost' | 'light' | 'link' | 'plain'

const variantClass: Record<Variant, string> = {
  primary: 'q-btn',
  ghost: 'q-btn q-btn--ghost',
  light: 'q-btn q-btn--light',
  link: 'q-link',
  plain: '',
}

/** A link configured in the CMS (internal document or external URL). Renders nothing when incomplete. */
export async function CMSLink({
  link,
  variant = 'link',
  className,
  children,
}: {
  link: LinkData | null | undefined
  variant?: Variant
  className?: string
  children?: ReactNode
}) {
  const href = resolveHref(link)
  const label = children ?? link?.label
  if (!href || !label) return null
  const cls = cx(variantClass[variant], className) || undefined
  if (link?.newTab) {
    const t = await getTexts()
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {label}
        <span className="q-sr">{` ${t.common.externalHint}`}</span>
      </a>
    )
  }
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  )
}
