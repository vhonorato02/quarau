import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion } from '../components/Accordion'
import { OdsList } from '../components/Badge'
import { Field, Input, Textarea } from '../components/Form'
import { Quote } from '../components/Quote'
import { Stat } from '../components/Stat'
import { Eyebrow, Heading } from '../components/Typography'

function Showcase() {
  return (
    <div className="flex max-w-4xl flex-col gap-16">
      <div>
        <Eyebrow>Projetos</Eyebrow>
        <Heading size="h2" dot>
          Resultados que ficam no território
        </Heading>
      </div>
      <dl className="grid gap-8 md:grid-cols-2">
        <Stat
          value="16 mil"
          label="pessoas mobilizadas na 3ª edição do Ecomuseu"
          context="2021–2023"
        />
        <Stat
          value="1.913"
          label="beneficiários diretos do Projeto Ecoe em um ano"
          context="Atibaia (SP)"
        />
      </dl>
      <OdsList numbers={[4, 11, 12, 13, 16, 17]} />
      <Quote
        quote="A partir da confluência e da interlocução entre a perspectiva desenvolvimentista e as experiências da biointeração."
        author="Projeto Quipá"
      />
      <Accordion
        items={[
          {
            id: 'a',
            question: 'Em quais etapas a Quarau atua?',
            answer: <p>Da concepção à difusão de resultados.</p>,
          },
          {
            id: 'b',
            question: 'Para quem a Quarau trabalha?',
            answer: <p>Empresas, instituições públicas e terceiro setor.</p>,
          },
        ]}
      />
      <form className="grid gap-6">
        <Field id="nome" label="Nome" required>
          {(p) => <Input {...p} autoComplete="name" />}
        </Field>
        <Field id="msg" label="Mensagem" required error="Escreva sua mensagem.">
          {(p) => <Textarea {...p} />}
        </Field>
      </form>
    </div>
  )
}

const meta = { title: 'Componentes/Vitrine', component: Showcase } satisfies Meta<typeof Showcase>
export default meta
export const Todos: StoryObj<typeof meta> = {}
