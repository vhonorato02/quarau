import { Button, Section, Text } from '@react-email/components'
import * as React from 'react'

import { brand, h1, label, Layout, p } from './components'

export interface LeadNotificationProps {
  siteUrl: string
  adminUrl: string
  name: string
  email: string
  phone?: string
  organization?: string
  subject?: string
  message: string
  sourcePath?: string
}

export function LeadNotification(props: LeadNotificationProps) {
  const rows: Array<[string, string | undefined]> = [
    ['Nome', props.name],
    ['E-mail', props.email],
    ['Telefone', props.phone],
    ['Organização', props.organization],
    ['Assunto', props.subject],
    ['Página de origem', props.sourcePath],
  ]
  return (
    <Layout preview={`Nova mensagem de ${props.name} pelo site`} siteUrl={props.siteUrl}>
      <Text style={h1}>Nova mensagem pelo site</Text>
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <Section key={k} style={{ marginBottom: 12 }}>
            <Text style={label}>{k}</Text>
            <Text style={{ ...p, margin: 0 }}>{v}</Text>
          </Section>
        ))}
      <Section
        style={{ margin: '20px 0', padding: 20, backgroundColor: brand.bg, borderRadius: 8 }}
      >
        <Text style={{ ...p, whiteSpace: 'pre-wrap', margin: 0 }}>{props.message}</Text>
      </Section>
      <Button
        href={props.adminUrl}
        style={{
          backgroundColor: brand.blue700,
          color: '#fff',
          padding: '12px 22px',
          borderRadius: 999,
          fontWeight: 600,
        }}
      >
        Abrir no painel
      </Button>
    </Layout>
  )
}

LeadNotification.PreviewProps = {
  siteUrl: 'https://quarau.com.br',
  adminUrl: 'https://quarau.com.br/admin/collections/leads/1',
  name: 'Maria Souza',
  email: 'maria@example.org',
  organization: 'Instituto Exemplo',
  subject: 'Elaboração de projeto',
  message: 'Olá! Gostaríamos de conversar sobre um projeto de educação patrimonial.',
  sourcePath: '/contato',
} satisfies LeadNotificationProps

export default LeadNotification
