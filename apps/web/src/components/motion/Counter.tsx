'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates the numeric part of a value ("16 mil", "1.913", "7.652") when it
 * enters the viewport. Renders the final value on the server and for reduced motion.
 */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^(\D*)([\d.]+)(.*)$/)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, prefix = '', num = '', suffix = ''] = match
    const target = Number(num.replace(/\./g, ''))
    if (!Number.isFinite(target) || target === 0) return
    const fmt = (n: number) => (num.includes('.') ? Math.round(n).toLocaleString('pt-BR') : String(Math.round(n)))
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1600
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur)
          const eased = 1 - Math.pow(1 - p, 4)
          setDisplay(`${prefix}${fmt(target * eased)}${suffix}`)
          if (p < 1) raf = requestAnimationFrame(step)
        }
        setDisplay(`${prefix}0${suffix}`)
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
