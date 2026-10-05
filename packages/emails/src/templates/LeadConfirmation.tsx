import { Text } from '@react-email/components'
import * as React from 'react'

import { h1, Layout, p } from './components'

export interface LeadConfirmationProps {
  siteUrl: string
  name: string
}

export function LeadConfirmation({ siteUrl, name }: LeadConfirmationProps) {
  const first = name.trim().split(/\s+/)[0] ?? name
  return (
    <Layout preview="Recebemos sua mensagem" siteUrl={siteUrl}>
      <Text style={h1}>Olá, {first}.</Text>
      <Text style={p}>
        Recebemos sua mensagem e agradecemos o contato. Nossa equipe vai analisá-la e responder pelo
        e-mail informado.
      </Text>
      <Text style={p}>Equipe Quarau</Text>
    </Layout>
  )
}

LeadConfirmation.PreviewProps = {
  siteUrl: 'https://quarau.com.br',
  name: 'Maria Souza',
} satisfies LeadConfirmationProps

export default LeadConfirmation
