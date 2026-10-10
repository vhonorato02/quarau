'use client'

import { useEffect } from 'react'

/**
 * Global, dependency-free scroll reveal: observes every [data-reveal] element and
 * flags it once visible. Content is visible by default (no-JS / reduced motion).
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revealed', '')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const scan = () =>
      document
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach((el) => io.observe(el))
    scan()
    // Re-scan after client navigations.
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}
