import { getTranslations } from 'next-intl/server'

import { resolveHref, type LinkData } from '@/components/CMSLink'
import type { Locale } from '@/i18n/routing'
import { getGlobal } from '@/lib/queries'

import { HeaderClient } from './HeaderClient'
import { DEFAULT_NAV } from './nav-defaults'

export async function Header({ locale }: { locale: Locale }) {
  const [nav, t] = await Promise.all([getGlobal('navigation', locale).catch(() => null), getTranslations('common')])
  const items =
    nav?.items
      ?.map((i) => ({ label: i.label ?? '', href: resolveHref(i as LinkData) ?? '' }))
      .filter((i) => i.label && i.href) ?? []
  const cta = nav?.cta?.label ? { label: nav.cta.label, href: resolveHref(nav.cta as LinkData) ?? '/contato' } : null

  return (
    <HeaderClient
      items={items.length ? items : DEFAULT_NAV}
      cta={cta ?? { label: t('contactCta'), href: '/contato' }}
      labels={{
        home: t('home'),
        menu: t('menu'),
        openMenu: t('openMenu'),
        closeMenu: t('closeMenu'),
        mainNav: t('mainNav'),
        search: t('search'),
      }}
    />
  )
}
