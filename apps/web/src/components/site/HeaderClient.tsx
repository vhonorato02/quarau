'use client'

import { ArrowIcon, Button, cn, Logotype, LogoSymbol, Sheet, SheetClose, SheetContent, SheetTrigger } from '@quarau/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Item = { label: string; href: string }

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
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color,box-shadow] duration-(--duration-base) ease-(--ease-brand)',
        hidden ? '-translate-y-full' : 'translate-y-0',
        dark ? 'text-white' : 'text-ink',
        scrolled && !overDark ? 'bg-white/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl' : '',
        scrolled && overDark ? 'bg-blue-950/80 text-white backdrop-blur-xl' : '',
      )}
    >
      <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" aria-label={`Quarau — ${labels.home}`} className="relative z-10 flex shrink-0 items-center">
          <LogoSymbol alt="" variant={dark || (scrolled && overDark) ? 'white' : 'color'} className="w-10 lg:hidden" priority />
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
                      'absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand-green transition-[opacity,transform] duration-(--duration-base)',
                      isActive(item.href) ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100',
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
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
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

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
                aria-label={labels.openMenu}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 8h16M4 16h16" strokeLinecap="round" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent title={labels.menu}>
              <div className="flex h-(--header-h) items-center justify-between px-6">
                <LogoSymbol variant="white" alt="Quarau" className="w-10" />
                <SheetClose asChild>
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-full hover:bg-white/10"
                    aria-label={labels.closeMenu}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </SheetClose>
              </div>
              <nav aria-label={labels.mainNav} className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pt-6 pb-10">
                <ul className="flex flex-col">
                  {[{ label: labels.home, href: '/' }, ...items].map((item, i) => (
                    <li key={item.href} className="border-b border-white/10">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          className="flex items-center justify-between py-4 text-h3 font-medium"
                          style={{ animation: `slide-in-right 600ms var(--ease-brand) ${80 + i * 40}ms both` }}
                        >
                          {item.label}
                          {isActive(item.href) ? <span className="size-2.5 rounded-full bg-brand-green" aria-hidden="true" /> : null}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <SheetClose asChild>
                  <Button asChild variant="inverse" size="lg" className="mt-10 w-full">
                    <Link href={cta.href}>
                      {cta.label}
                      <ArrowIcon />
                    </Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
