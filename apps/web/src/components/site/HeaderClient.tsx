'use client'

import { ArrowIcon, Button, cn, Logotype, LogoSymbol } from '@quarau/ui'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Item = { label: string; href: string }

const MobileMenu = dynamic(() => import('./MobileMenu').then((m) => m.MobileMenu), { ssr: false })

function useMenuRequested(open: boolean) {
  const [requested, setRequested] = useState(false)
  useEffect(() => {
    if (open) setRequested(true)
  }, [open])
  return requested
}

export function HeaderClient({
  items,
  cta,
  labels,
}: {
  items: Item[]
  cta: Item
  labels: Record<'home' | 'menu' | 'openMenu' | 'closeMenu' | 'mainNav' | 'search', string>
}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // The menu (Radix Dialog) is downloaded only after the first tap.
  const menuRequested = useMenuRequested(menuOpen)

  useEffect(() => {
    let last = window.scrollY
    const hero = () => document.querySelector('[data-hero-dark]')
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 480 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
      const h = hero()
      setOverDark(Boolean(h) && y < (h?.getBoundingClientRect().height ?? 0) - 72)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const dark = overDark && !scrolled
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color,box-shadow] duration-(--duration-base) ease-(--ease-brand)',
        hidden ? '-translate-y-full' : 'translate-y-0',
        dark ? 'text-white' : 'text-ink',
        scrolled && !overDark
          ? 'bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl'
          : '',
        scrolled && overDark ? 'bg-blue-950/80 text-white backdrop-blur-xl' : '',
      )}
    >
      <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`Quarau — ${labels.home}`}
          className="relative z-10 flex shrink-0 items-center"
        >
          <LogoSymbol
            alt=""
            variant={dark || (scrolled && overDark) ? 'white' : 'color'}
            className="w-10 lg:hidden"
            priority
          />
          <Logotype
            alt=""
            variant={dark || (scrolled && overDark) ? 'white' : 'color'}
            className="hidden w-[188px] lg:block"
            priority
          />
        </Link>

        <nav aria-label={labels.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="group relative inline-flex h-11 items-center px-4 text-[0.975rem] font-medium"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'bg-brand-green absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full transition-[opacity,transform] duration-(--duration-base)',
                      isActive(item.href)
                        ? 'scale-100 opacity-100'
                        : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100',
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/busca"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10"
            aria-label={labels.search}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" strokeLinecap="round" />
            </svg>
          </Link>
          <Button
            asChild
            size="sm"
            variant={dark || (scrolled && overDark) ? 'inverse' : 'primary'}
            className="hidden sm:inline-flex"
          >
            <Link href={cta.href}>
              {cta.label}
              <ArrowIcon />
            </Link>
          </Button>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
            aria-label={labels.openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M4 8h16M4 16h16" strokeLinecap="round" />
            </svg>
          </button>
          {menuRequested ? (
            <MobileMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              items={[{ label: labels.home, href: '/' }, ...items]}
              cta={cta}
              labels={labels}
              isActive={isActive}
            />
          ) : null}
        </div>
      </div>
    </header>
  )
}
