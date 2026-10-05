'use client'

import { Button } from '@quarau/ui'
import { useState } from 'react'

/** OpenStreetMap embed loaded only on request (privacy + performance). */
export function MapEmbed({ lat, lng, zoom, label }: { lat: number; lng: number; zoom: number; label: string }) {
  const [load, setLoad] = useState(false)
  const d = 0.02 * Math.pow(2, 13 - zoom)
  const bbox = [lng - d, lat - d * 0.6, lng + d, lat + d * 0.6].join(',')
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface-sunken">
      {load ? (
        <iframe src={src} title={label} className="absolute inset-0 size-full" loading="lazy" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_50%,var(--color-blue-100),var(--color-surface-sunken))] p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="relative flex size-6">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-6 rounded-full border-4 border-white bg-brand-green" />
            </span>
            <Button variant="secondary" size="sm" onClick={() => setLoad(true)}>
              Carregar mapa (OpenStreetMap)
            </Button>
            <a
              className="text-sm text-blue-700 underline underline-offset-2"
              href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir em nova aba
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
