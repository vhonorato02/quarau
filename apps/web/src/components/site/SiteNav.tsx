'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export type NavItem = { href: string; label: string }

const isCurrent = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

/** Desktop navigation + mobile menu (native <dialog>: focus trap, Esc and backdrop for free). */
export function SiteNav({
  items,
  cta,
  labels,
  logo,
}: {
  items: NavItem[]
  cta: NavItem | null
  labels: { nav: string; open: string; close: string }
  logo: React.ReactNode
}) {
  const pathname = usePathname() ?? '/'
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.close()
  }, [pathname])

  const links = (onClick?: () => void) =>
    items.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
          onClick={onClick}
        >
          {item.label}
        </Link>
      </li>
    ))

  return (
    <>
      <nav className="q-nav" aria-label={labels.nav}>
        <ul>{links()}</ul>
      </nav>
      {cta ? (
        <Link className="q-btn q-header__cta" href={cta.href}>
          {cta.label}
        </Link>
      ) : null}
      <button
        type="button"
        className="q-menu-btn"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        {labels.open}
      </button>
      <dialog ref={dialog} className="q-menu" aria-label={labels.nav}>
        <div className="q-wrap">
          <div className="q-menu__top">
            {logo}
            <button type="button" className="q-menu-btn" onClick={() => dialog.current?.close()}>
              {labels.close}
            </button>
          </div>
          <nav aria-label={labels.nav}>
            <ul>{links(() => dialog.current?.close())}</ul>
          </nav>
          {cta ? (
            <Link className="q-btn" href={cta.href} onClick={() => dialog.current?.close()}>
              {cta.label}
            </Link>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
