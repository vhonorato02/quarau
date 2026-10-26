import Link from 'next/link'

import { resolveHref } from '@/components/CMSLink'
import { getGlobal, getTexts } from '@/server/queries'

import { type NavItem, SiteNav } from './SiteNav'

export async function Header() {
  const [nav, t, contact] = await Promise.all([
    getGlobal('navigation'),
    getTexts(),
    getGlobal('contact'),
  ])
  const items: NavItem[] = (nav.items ?? []).flatMap((item) => {
    const href = resolveHref(item)
    return href && item.label ? [{ href, label: item.label }] : []
  })
  const ctaHref = resolveHref(nav.cta)
  const cta = ctaHref && nav.cta?.label ? { href: ctaHref, label: nav.cta.label } : null
  const logo = (
    <Link href="/" className="q-header__logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/quarau-logotipo.svg" alt={contact.name} width={1295} height={306} />
    </Link>
  )
  return (
    <header className="q-header">
      <a className="q-skip" href="#conteudo">
        {t.common.skipLink}
      </a>
      <div className="q-wrap q-header__bar">
        {logo}
        <SiteNav
          items={items}
          cta={cta}
          logo={logo}
          labels={{ nav: t.common.navLabel, open: t.common.menuOpen, close: t.common.menuClose }}
        />
      </div>
    </header>
  )
}
