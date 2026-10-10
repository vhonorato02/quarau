import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quarau — Projetos Socioambientais, Educativos e Culturais',
    short_name: 'Quarau',
    description: 'Consultoria em projetos educativos, culturais e socioambientais.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#0089CF',
    lang: 'pt-BR',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/brand/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      { src: '/brand/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
