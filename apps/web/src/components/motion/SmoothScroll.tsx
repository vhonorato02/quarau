'use client'

import { useEffect } from 'react'

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger — desktop only.
 * Both libraries are loaded on demand so they never weigh on mobile or on
 * first paint; reduced-motion and touch users keep native scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return
    let destroy = () => {}
    let cancelled = false
    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, anchors: { offset: -80 } })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      destroy = () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    }
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
    idle(() => void start())
    return () => {
      cancelled = true
      destroy()
    }
  }, [])
  return null
}
