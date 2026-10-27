import Link from 'next/link'
import type { Payload } from 'payload'

type Props = { payload: Payload }

async function count(
  payload: Payload,
  collection: 'leads' | 'media' | 'pages' | 'projects' | 'news',
  where?: object,
) {
  try {
    const res = await payload.count({ collection, where: where as never, overrideAccess: true })
    return res.totalDocs
  } catch {
    return 0
  }
}

/**
 * Panel home: what needs attention now, and the shortest path to the most common tasks.
 * Admin-only text lives here (not in "Textos do site", which is the public site).
 */
export async function Dashboard({ payload }: Props) {
  const [newLeads, mediaToReview, draftPages, draftProjects] = await Promise.all([
    count(payload, 'leads', { status: { equals: 'new' } }),
    count(payload, 'media', { needsReview: { equals: true } }),
    count(payload, 'pages', { _status: { equals: 'draft' } }),
    count(payload, 'projects', { _status: { equals: 'draft' } }),
  ])
  const cards = [
    {
      n: newLeads,
      label: 'mensagens novas do formulário',
      href: '/admin/collections/leads?where[status][equals]=new',
    },
    {
      n: draftPages + draftProjects,
      label: 'páginas e projetos em rascunho',
      href: '/admin/collections/projects?where[_status][equals]=draft',
    },
    {
      n: mediaToReview,
      label: 'fotos com descrição para revisar',
      href: '/admin/collections/media?where[needsReview][equals]=true',
    },
  ]
  return (
    <section className="quarau-dash" aria-labelledby="quarau-dash-title">
      <h2 id="quarau-dash-title">Olá! O que você quer fazer hoje?</h2>
      <ul className="quarau-dash__cards">
        {cards.map((c) => (
          <li key={c.label}>
            <Link href={c.href}>
              <strong>{c.n}</strong>
              <span>{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="quarau-dash__actions">
        <Link
          className="btn btn--style-primary btn--size-medium"
          href="/admin/collections/projects/create"
        >
          Novo projeto
        </Link>
        <Link
          className="btn btn--style-secondary btn--size-medium"
          href="/admin/collections/pages/create"
        >
          Nova página
        </Link>
        <Link
          className="btn btn--style-secondary btn--size-medium"
          href="/admin/collections/news/create"
        >
          Nova notícia
        </Link>
        <Link
          className="btn btn--style-secondary btn--size-medium"
          href="/admin/globals/site-texts"
        >
          Textos do site
        </Link>
      </div>
      <details className="quarau-dash__help">
        <summary>Como funciona (2 minutos de leitura)</summary>
        <ol>
          <li>
            <strong>Rascunho e publicação.</strong> <em>Salvar rascunho</em> guarda o que você
            editou sem mudar o site. O site só muda quando você clica em{' '}
            <em>Publicar alterações</em>. O botão <em>Visualizar</em> mostra a página como vai
            ficar.
          </li>
          <li>
            <strong>Agendar.</strong> Na seta ao lado de <em>Publicar alterações</em>, escolha{' '}
            <em>Agendar publicação</em>. A publicação acontece em até 15 minutos após o horário
            escolhido.
          </li>
          <li>
            <strong>Blocos.</strong> Cada página é uma pilha de blocos (abertura, texto, foto,
            galeria, lista de projetos…). Use <em>Adicionar bloco</em>, arraste para reordenar e use
            o menu ⋮ para duplicar ou remover.
          </li>
          <li>
            <strong>Fotos.</strong> Envie a foto original; o site cria as versões otimizadas.
            Escreva o texto alternativo descrevendo o que aparece na imagem.
          </li>
          <li>
            <strong>Errou?</strong> A aba <em>Versões</em> de cada página guarda as versões
            anteriores; abra uma e clique em <em>Restaurar</em>.
          </li>
        </ol>
      </details>
    </section>
  )
}
