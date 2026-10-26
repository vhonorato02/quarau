'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type GalleryImage = {
  id: number
  thumb: string
  full: string
  alt: string
  caption: string | null
  width: number
  height: number
  focal: string
}

type Labels = {
  seeAll: string
  close: string
  previous: string
  next: string
  counter: string
  dialog: string
}

const MOSAIC = 5

/** Mosaic + lightbox on a native <dialog> (focus trap and Esc for free); arrows and swipe navigate. */
export function GalleryClient({ images, labels }: { images: GalleryImage[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [current, setCurrent] = useState(0)
  const touchX = useRef<number | null>(null)
  const n = images.length

  const open = (i: number) => {
    setCurrent(i)
    dialog.current?.showModal()
  }
  const go = useCallback((delta: number) => setCurrent((c) => (c + delta + n) % n), [n])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    d.addEventListener('keydown', onKey)
    return () => d.removeEventListener('keydown', onKey)
  }, [go])

  const img = images[current]!
  const counter = labels.counter.replace('{i}', String(current + 1)).replace('{n}', String(n))

  return (
    <>
      <ul className="q-mosaic">
        {images.slice(0, MOSAIC).map((im, i) => (
          <li key={im.id}>
            <button type="button" onClick={() => open(i)} aria-haspopup="dialog">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.thumb}
                alt={im.alt}
                width={im.width}
                height={im.height}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: im.focal }}
              />
            </button>
          </li>
        ))}
      </ul>
      {n > MOSAIC ? (
        <p className="q-mosaic-more">
          <button
            type="button"
            className="q-btn q-btn--ghost"
            onClick={() => open(MOSAIC)}
            aria-haspopup="dialog"
          >
            {labels.seeAll}
          </button>
        </p>
      ) : null}
      <dialog
        ref={dialog}
        className="q-lightbox on-dark"
        aria-label={labels.dialog}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(e) => {
          const start = touchX.current
          const end = e.changedTouches[0]?.clientX
          if (start != null && end != null && Math.abs(end - start) > 50) go(end < start ? 1 : -1)
          touchX.current = null
        }}
      >
        <div className="q-lightbox__in">
          <div className="q-lightbox__bar">
            <span aria-live="polite">{counter}</span>
            <button
              type="button"
              className="q-btn q-btn--light"
              onClick={() => dialog.current?.close()}
            >
              {labels.close}
            </button>
          </div>
          <figure className="q-lightbox__stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.full} alt={img.alt} width={img.width} height={img.height} />
          </figure>
          {img.caption ? <p className="q-lightbox__cap">{img.caption}</p> : null}
          {n > 1 ? (
            <div className="q-lightbox__nav">
              <button type="button" className="q-btn q-btn--light" onClick={() => go(-1)}>
                {labels.previous}
              </button>
              <button type="button" className="q-btn q-btn--light" onClick={() => go(1)}>
                {labels.next}
              </button>
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
