export function Welcome() {
  return (
    <div className="quarau-welcome">
      <h2>Bem-vindo ao painel da Quarau</h2>
      <p>
        Aqui você edita todo o conteúdo do site. Cada página é montada com <strong>blocos</strong>{' '}
        prontos e já formatados com a identidade da Quarau, então não é preciso se preocupar com
        cores ou fontes.
      </p>
      <ul>
        <li>
          <strong>Rascunho × Publicado:</strong> as alterações ficam salvas como rascunho até você
          clicar em “Publicar alterações”. Use “Visualizar” para conferir antes.
        </li>
        <li>
          <strong>Agendar:</strong> no botão de publicar, escolha “Agendar publicação” para definir
          data e hora.
        </li>
        <li>
          <strong>Histórico:</strong> a aba “Versões” permite comparar e restaurar versões
          anteriores.
        </li>
        <li>
          <strong>Imagens:</strong> todo arquivo precisa de um texto alternativo descrevendo a
          imagem.
        </li>
      </ul>
      <p>
        Dúvidas? Consulte o guia de uso (docs/cms.md no repositório) ou fale com o administrador do
        site.
      </p>
    </div>
  )
}
