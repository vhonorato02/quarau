import type { Meta, StoryObj } from '@storybook/react-vite'

import { Logotype, LogoSymbol } from '../components/Logo'
import { Heading } from '../components/Typography'

const swatches = [
  ['brand-blue', '#0089CF', 'Primária — logotipo, superfícies, texto grande'],
  ['brand-green', '#39B54A', 'Acento — ponto, marcadores (nunca texto)'],
  ['blue-700', '#006FA8', 'Apoio — links e botões (5,47:1)'],
  ['blue-800', '#005C8C', 'Apoio — hover'],
  ['blue-950', '#04263A', 'Apoio — fundos escuros'],
  ['green-700', '#24792F', 'Apoio — texto verde acessível'],
  ['ink', '#0E1A24', 'Texto'],
  ['ink-muted', '#4A5866', 'Texto secundário'],
  ['surface-alt', '#F4F7F9', 'Fundo alternado'],
] as const

function BrandPage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <Heading size="h3">Logotipo</Heading>
        <div className="flex flex-wrap items-center gap-10">
          <Logotype className="w-96" />
          <div className="bg-brand-blue p-8">
            <Logotype variant="white" className="w-96" />
          </div>
          <LogoSymbol className="w-24" />
          <div className="bg-ink p-6">
            <LogoSymbol variant="white" className="w-24" />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <Heading size="h3">Cores</Heading>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {swatches.map(([name, hex, use]) => (
            <li key={name} className="overflow-hidden rounded-lg border border-line">
              <div className="h-24" style={{ background: hex }} />
              <div className="p-4 text-sm">
                <strong className="block">{name}</strong>
                <code>{hex}</code>
                <p className="text-ink-muted">{use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <Heading size="h3">Tipografia — Barlow</Heading>
        <Heading as="p" size="display" dot>
          Quarau
        </Heading>
        <Heading as="p" size="h1">Projetos que transformam territórios</Heading>
        <Heading as="p" size="h2">Educativos, culturais e socioambientais</Heading>
        <p className="max-w-prose">
          Texto corrido em Barlow 400, 17 px, entrelinha 1,65. A Quarau elabora, junto aos seus parceiros, projetos que
          beneficiam territórios urbanos e rurais.
        </p>
      </section>
    </div>
  )
}

const meta = { title: 'Fundamentos/Marca', component: BrandPage } satisfies Meta<typeof BrandPage>
export default meta
export const Visao: StoryObj<typeof meta> = {}
