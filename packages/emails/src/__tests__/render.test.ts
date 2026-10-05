import { describe, expect, it } from 'vitest'

import { renderLeadConfirmation, renderLeadNotification } from '../index'

describe('emails', () => {
  it('renders the lead notification with all provided fields', async () => {
    const { html, text } = await renderLeadNotification({
      siteUrl: 'https://quarau.com.br',
      adminUrl: 'https://quarau.com.br/admin/collections/leads/1',
      name: 'Maria <script>',
      email: 'maria@example.org',
      message: 'Linha 1\nLinha 2',
    })
    expect(html).toContain('Nova mensagem pelo site')
    expect(html).not.toContain('<script>')
    expect(text).toContain('maria@example.org')
  })

  it('greets with the first name', async () => {
    const { text } = await renderLeadConfirmation({
      siteUrl: 'https://quarau.com.br',
      name: 'Ana Paula Lima',
    })
    expect(text).toContain('Olá, Ana.')
  })
})
