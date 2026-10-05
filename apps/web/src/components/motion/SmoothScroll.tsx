'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'

/** Lenis smooth scrolling synced with GSAP ScrollTrigger. Off for reduced motion and touch. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    gsap.registerPlugin(ScrollTrigger)
    if (reduce || coarse) return

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, anchors: { offset: -80 } })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
  return null
}
