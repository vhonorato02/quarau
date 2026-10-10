'use client'

import { ArrowIcon, Button, LogoSymbol, Sheet, SheetClose, SheetContent } from '@quarau/ui'
import Link from 'next/link'

type Item = { label: string; href: string }

/** Full-screen mobile navigation (lazy-loaded by HeaderClient). */
export function MobileMenu({
  open,
  onOpenChange,
  items,
  cta,
  labels,
  isActive,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: Item[]
  cta: Item
  labels: Record<'menu' | 'closeMenu' | 'mainNav', string>
  isActive: (href: string) => boolean
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={labels.menu}>
        <div className="flex h-(--header-h) items-center justify-between px-6">
          <LogoSymbol variant="white" alt="Quarau" className="w-10" />
          <SheetClose asChild>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full hover:bg-white/10"
              aria-label={labels.closeMenu}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </SheetClose>
        </div>
        <nav
          aria-label={labels.mainNav}
          className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pt-6 pb-10"
        >
          <ul className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-white/10">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="text-h3 flex items-center justify-between py-4 font-medium"
                    style={{
                      animation: `slide-in-right 600ms var(--ease-brand) ${80 + i * 40}ms both`,
                    }}
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <span className="bg-brand-green size-2.5 rounded-full" aria-hidden="true" />
                    ) : null}
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
  )
}
