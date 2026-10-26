# Direção de design — Quarau

> Fase 2 (2026-10-26). Decisão registrada no [ADR 0016](decisions/0016-direcao-de-design-lente.md).
> Protótipos estáticos em [`docs/design/prototipos/`](design/prototipos/) e capturas (390 px e 1440 px) em
> [`docs/design/capturas/`](design/capturas/). Ferramenta de captura: `node tools/design/shoot.mjs`.

## 1. O assunto antes da forma

A Quarau lê territórios: faz diagnóstico, inventário, mapa, roda de conversa, relatório. O acervo dela é
**fotografia de campo** (plantios, feiras de saberes, congado, casas de farinha, rodas com mapas na mesa) e
**mapas próprios** (Quipá, Ecoe). O símbolo da marca é uma **lupa** (o Q) com um ponto verde. O design parte daí:

- o território vem antes do título (cada projeto é apresentado pelo lugar);
- a fotografia real é o único "ornamento";
- a lupa da marca aparece **uma vez**, como janela de foto no hero da home;
- o resto é tipografia firme em Barlow, branco, tinta e o azul da marca.

## 2. Referências (capturas em [`design/referencias/`](design/referencias/), folha-resumo `folha.jpg`)

| Site | Segmento | Roubar | Evitar |
| --- | --- | --- | --- |
| [Instituto Socioambiental](https://www.socioambiental.org) (`isa.jpg`) | socioambiental BR | vídeo de campo no topo, peso institucional | hero em vídeo escuro que demora a carregar (captura saiu preta) |
| [Fundação Tide Setubal](https://fundacaotidesetubal.org.br) (`tide.jpg`) | social BR | publicações tratadas como produto, com capa | carrossel com três destaques disputando atenção e cookie gigante |
| [Instituto Alana](https://alana.org.br) (`alana.jpg`) | social BR | foto humana em primeiro plano, frase curta | foto de banco de imagem e controles de carrossel |
| [IMS](https://ims.com.br) (`ims.jpg`) | cultural BR | editorial com cor forte e tipografia própria | painel flutuante sobre imagem, leitura difícil |
| [Fundo Casa Socioambiental](https://casa.org.br) (`fundocasa.jpg`) | socioambiental BR | fotografia de comunidade com moldura | molduras e cores de terra genéricas, carrossel |
| [Instituto Arapyaú](https://arapyau.org.br) (`arapyau.jpg`) | socioambiental BR | proposta em uma frase no hero | fundo cinza com linhas decorativas sem significado e palavra em destaque colorida |
| [Gehl](https://www.gehlpeople.com) (`gehl.jpg`) | consultoria urbana/social | foto plena de lugar real, título curto, consultoria que "mostra o lugar" | texto pequeno sobre foto |
| [Forum for the Future](https://www.forumforthefuture.org) (`forum.jpg`) | consultoria de sustentabilidade | clareza da oferta | texto centralizado sobre foto e banner de cookies cobrindo a página |
| [IPHAN](https://www.gov.br/iphan/pt-br) (`iphan.jpg`) | patrimônio, poder público | rigor de fonte e documentos | tudo: pop-ups, camadas, hierarquia confusa (é o anti-modelo) |
| [Fundação Grupo Boticário](https://www.fundacaogrupoboticario.org.br) (`boticario.jpg`) | socioambiental BR | dados geográficos como prova | tipografia gigante cortada, mockup de produto como hero |
| [Ellen MacArthur Foundation](https://www.ellenmacarthurfoundation.org) (`ellen.jpg`) | sustentabilidade | uma frase, um botão, muito espaço | preto chapado sem imagem (fica genérico) |
| [Pentagram](https://www.pentagram.com) (`pentagram.jpg`) | fora do segmento | título que é frase editável ("We design … for …"), índice de trabalhos | carregamento que esconde o conteúdo |
| [The Pudding](https://pudding.cool) (`pudding.jpg`) | fora do segmento | numeração e datas como informação real | cores saturadas aleatórias por item |
| [Are.na Editorial](https://www.are.na/editorial) (`arena.jpg`) | fora do segmento | tipografia contida, coluna de leitura confortável | esqueleto de carregamento visível |
| [It's Nice That](https://www.itsnicethat.com) (`itsnicethat.jpg`) | fora do segmento | índice editorial denso e navegável | publicidade e banners competindo |

**Lições:** os sites do segmento erram por excesso (carrossel, pop-up, banner de cookies cobrindo a página, foto de
banco). Os melhores (Gehl, Pentagram) têm **uma** ideia forte e o resto em silêncio.

## 3. Três direções (protótipos)

| Direção | Ideia | Capturas | Veredito |
| --- | --- | --- | --- |
| **A — Lente** | O anel do Q vira a janela de uma foto de campo no hero. Branco, tinta e azul; índice de projetos por território; banda azul com as 10 etapas do ciclo. | `a-home-*.jpg`, `a-projeto-*.jpg` | **Escolhida**, com o índice e a ficha de B |
| B — Ficha | Foto plena (congado) com título sobre ela; projetos como índice tipográfico com território e período; página de projeto como ficha de inventário. | `b-home-*.jpg`, `b-projeto-*.jpg` | Índice e ficha incorporados em A. O hero de foto plena perde a marca (poderia ser de qualquer instituto). |
| C — Território | Azul da marca como superfície e mapa de coordenadas com os municípios. | `c-home-*.jpg`, `c-projeto-*.jpg` | Descartada: com 3 municípios o mapa fica vazio e decorativo; azul chapado cansa. |

**Por que A:** é a única em que a identidade (a lupa com o ponto) vira estrutura e não carimbo. É reconhecível
como Quarau mesmo sem o logo. Mantém a fotografia real em evidência sem depender de uma foto em alta resolução
de tela cheia (o acervo tem no máximo 1600 px; um círculo de 560 px fica nítido).

## 4. Tokens

Implementados em `packages/ui/src/styles/tokens.css` (fonte única para site e e-mails).

### Cor

| Token | Hex | Uso | Contraste |
| --- | --- | --- | --- |
| `paper` | `#FFFFFF` | fundo | — |
| `ink` | `#0E1A24` | texto e títulos | 17,6:1 |
| `ink-2` | `#4A5866` | texto secundário, legendas | 7,3:1 |
| `line` | `#D5E0E8` | divisores | decorativo |
| `mist` | `#EAF4FA` | faixa de contato, chips | ink 16:1 |
| `blue` | `#0089CF` | anel da lente, números grandes, superfícies com texto ≥ 24 px | 3,8:1 (só texto grande) |
| `blue-700` | `#006FA8` | links, botões, banda do ciclo | 5,5:1 |
| `blue-800` | `#005C8C` | hover e pressionado | 7,2:1 |
| `blue-950` | `#062C44` | rodapé | branco 14:1 |
| `green` | `#39B54A` | **só o ponto** (lente, marcador de página ativa) | nunca texto |
| `green-700` | `#24792F` | mensagem de sucesso | 5,4:1 |
| `danger` | `#B42318` | erros de formulário | 6,5:1 |

### Tipografia

Barlow (self-hosted, OFL), pesos 400, 500, 600 e 400 itálico. Uma família só; a personalidade vem da escala e do
tracking negativo nos títulos, como no H1 do site original.

| Papel | Tamanho | Peso | Entrelinha | Tracking |
| --- | --- | --- | --- | --- |
| Display (hero) | `clamp(3rem, 7.2vw, 6.75rem)` | 600 | 0,94 | −0,035 em |
| H1 de página | `clamp(2.75rem, 6.4vw, 5.75rem)` | 600 | 0,95 | −0,035 em |
| H2 de seção | `clamp(2.25rem, 4.4vw, 3.75rem)` | 600 | 1,0 | −0,025 em |
| H3 | `clamp(1.5rem, 2.4vw, 2.125rem)` | 600 | 1,1 | −0,015 em |
| Lead | `1.3125rem` | 400 | 1,5 | 0 |
| Texto | `1.125rem` (18 px) | 400 | 1,6 | 0 |
| Pequeno / legenda | `0.9375rem` | 400–500 | 1,5 | 0 |

Regras: medida de leitura ≤ 68 caracteres; rótulos em caixa normal (nada de caixa-alta espaçada); números
tabulares em períodos e anos; nenhuma palavra destacada em cor dentro de título.

### Espaço, grade, raio, sombra, movimento

- **Espaço** (base 4 px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Seções: `clamp(4rem, 9vw, 8rem)`.
- **Grade:** 12 colunas, largura máxima 82 rem, calha 1,5 rem, margem 1,25 rem no celular.
- **Raio:** dois valores só. `4px` em imagens; `999px` em botões e chips. Seções e blocos sem raio.
- **Sombra:** nenhuma. O anel da lente é um `box-shadow` sólido (é desenho, não elevação).
- **Movimento:** 160 ms em interface, 600 ms no zoom de foto, curva `cubic-bezier(.2,.7,.2,1)`. **Um** momento
  orquestrado: a lente "abre" (clip-path circular) ao carregar a home. Tudo desliga com `prefers-reduced-motion`.

## 5. Componentes e estados

Documentados em `/design-system` (rota interna, `noindex`, testada com axe) e em `packages/ui/README.md`.

- **Botão** (primário, contorno, texto): hover, foco visível (anel de 3 px `blue-700`), pressionado, desabilitado,
  carregando (rótulo muda para a ação em curso, ex.: "Enviando…").
- **Campo de formulário** (texto, e-mail, telefone, seleção, área de texto, caixa de consentimento): rótulo sempre
  visível, ajuda, erro (texto + borda `danger` + `aria-invalid`), desabilitado.
- **Cabeçalho** com menu móvel (botão "Menu" que abre painel; Esc fecha; foco preso).
- **Hero lente**, **hero de página**, **ficha do projeto**, **índice de projetos**, **número em contexto**,
  **ciclo**, **áreas**, **texto**, **citação**, **figura com legenda**, **mosaico com "ver todas" + lightbox**,
  **chips de ODS** (cores oficiais da ONU), **publicações**, **próximo projeto**, **faixa de contato**, **rodapé**.
- **Estados de conteúdo:** vazio (seção não renderiza; a página nunca mostra "em breve"), carregando (servidor
  renderiza tudo, sem esqueleto), erro (404 e 500 com caminhos úteis).

## 6. Anti-padrões proibidos (checados na crítica de cada página)

Cara de template SaaS; grade de cards iguais; gradientes e blobs; ícones genéricos no lugar de conteúdo; banco de
imagens; texto centralizado em bloco longo; animação de entrada em cada seção; caixa-alta espaçada em rótulos;
metadados com "·"; setas "→" grudadas em links; fonte mono para dados; palavra colorida dentro de título.
