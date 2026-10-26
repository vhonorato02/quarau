import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

export const brand = {
  blue: '#0089CF',
  blue700: '#006FA8',
  green: '#39B54A',
  ink: '#0E1A24',
  muted: '#4A5866',
  line: '#DCE3E8',
  bg: '#F4F7F9',
}

const font = "Barlow, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export function Layout({
  preview,
  siteUrl,
  children,
}: {
  preview: string
  siteUrl: string
  children: React.ReactNode
}) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: brand.bg, fontFamily: font, margin: 0, padding: '32px 0' }}>
        <Container
          style={{ backgroundColor: '#fff', maxWidth: 600, borderRadius: 12, overflow: 'hidden' }}
        >
          <Section style={{ padding: '28px 40px', borderBottom: `4px solid ${brand.blue}` }}>
            <Img
              src={`${siteUrl}/brand/quarau-logotipo.png`}
              width="220"
              height="52"
              alt="Quarau — Projetos Socioambientais, Educativos e Culturais"
            />
          </Section>
          <Section style={{ padding: '32px 40px' }}>{children}</Section>
          <Hr style={{ borderColor: brand.line, margin: 0 }} />
          <Section style={{ padding: '20px 40px' }}>
            <Text style={{ color: brand.muted, fontSize: 13, lineHeight: '20px', margin: 0 }}>
              Quarau · Projetos Socioambientais, Educativos e Culturais · São José dos Campos, SP
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const h1 = {
  color: brand.ink,
  fontSize: 24,
  lineHeight: '30px',
  fontWeight: 600,
  margin: '0 0 16px',
}
export const p = { color: brand.ink, fontSize: 16, lineHeight: '26px', margin: '0 0 16px' }
export const label = {
  color: brand.muted,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
}
