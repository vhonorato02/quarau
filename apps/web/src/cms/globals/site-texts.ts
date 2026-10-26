import type { Field, GlobalConfig, Tab } from 'payload'

import { anyone, editors } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

/**
 * Every piece of interface text on the site (labels, buttons, errors, cookie banner, 404…).
 * The editor changes them in Configurações → Textos do site. These values are the initial content
 * of the CMS (field defaults + seed); components never contain literal text (lint: react/jsx-no-literals).
 * `{n}`, `{q}`, `{year}`, `{email}`… are replaced at render time.
 */
export const SITE_TEXTS = {
  common: {
    _label: 'Geral',
    skipLink: 'Pular para o conteúdo',
    menuOpen: 'Menu',
    menuClose: 'Fechar',
    navLabel: 'Menu principal',
    breadcrumbLabel: 'Você está em',
    home: 'Início',
    search: 'Buscar',
    readMore: 'Ler mais',
    externalHint: '(abre em nova aba)',
  },
  footer: {
    _label: 'Rodapé',
    navTitle: 'Site',
    contactTitle: 'Contato',
    socialTitle: 'Redes',
    cookiePreferences: 'Preferências de cookies',
    cnpj: 'CNPJ {cnpj}',
    copyright: '© {year} {name}',
  },
  project: {
    _label: 'Projetos',
    territory: 'Território',
    program: 'Programa',
    carriedOutBy: 'Quem realiza',
    role: 'Papel da Quarau',
    period: 'Período',
    since: 'desde {year}',
    areas: 'Áreas de atuação',
    partners: 'Parceiros',
    ods: 'Objetivos de Desenvolvimento Sustentável',
    photos: 'Fotos do projeto',
    next: 'Próximo projeto',
    all: 'Todos os projetos',
    empty: 'Nenhum projeto publicado ainda.',
  },
  gallery: {
    _label: 'Galeria',
    seeAll: 'Ver as {n} fotos',
    close: 'Fechar',
    previous: 'Foto anterior',
    next: 'Próxima foto',
    counter: '{i} de {n}',
    dialogLabel: 'Fotos em tela cheia',
  },
  service: {
    _label: 'Áreas de atuação',
    deliverables: 'O que entregamos',
    relatedProjects: 'Projetos nesta área',
    all: 'Todas as áreas',
  },
  news: {
    _label: 'Notícias',
    publishedOn: 'Publicado em {date}',
    source: 'Ver a publicação original',
    related: 'Projetos relacionados',
    all: 'Todas as notícias',
  },
  form: {
    _label: 'Formulário de contato',
    name: 'Nome',
    email: 'E-mail',
    phone: 'Telefone (opcional)',
    organization: 'Organização (opcional)',
    subject: 'Assunto',
    subjectPlaceholder: 'Escolha um assunto',
    message: 'Mensagem',
    messageHelp: 'Conte o território, o público e o prazo, se já souber.',
    consent: 'Concordo com o uso destes dados para responderem ao meu contato, conforme a',
    privacyLink: 'política de privacidade',
    legalBasis:
      'Base legal: consentimento (LGPD, art. 7º, I). Os dados são usados só para responder e podem ser excluídos a pedido.',
    submit: 'Enviar mensagem',
    sending: 'Enviando…',
    successTitle: 'Mensagem enviada',
    successText: 'Obrigado pelo contato. Vamos responder no e-mail informado.',
    sendAnother: 'Enviar outra mensagem',
    errorSummary: 'Corrija os campos marcados para enviar.',
    required: 'Preencha este campo.',
    emailInvalid: 'Informe um e-mail válido, como nome@exemplo.com.',
    messageShort: 'Escreva pelo menos 10 caracteres.',
    consentRequired: 'Para enviar, marque a concordância com a política de privacidade.',
    rateLimited: 'Muitas tentativas seguidas. Aguarde um minuto e envie de novo.',
    captcha: 'Não foi possível confirmar o envio. Recarregue a página e tente de novo.',
    server:
      'A mensagem não foi enviada por um erro no servidor. Tente de novo ou escreva para {email}.',
  },
  contact: {
    _label: 'Canais de contato',
    email: 'E-mail',
    phone: 'Telefone',
    whatsapp: 'WhatsApp',
    address: 'Endereço',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    youtube: 'YouTube',
  },
  cookies: {
    _label: 'Privacidade e cookies',
    title: 'Sua privacidade',
    text: 'O site usa só o armazenamento essencial para funcionar. Com a sua permissão, também mede a audiência de forma anônima.',
    accept: 'Aceitar medição',
    reject: 'Só o essencial',
    customize: 'Escolher',
    save: 'Salvar escolhas',
    essential: 'Essenciais',
    essentialHelp: 'Guardam a sua escolha de privacidade. Sempre ativos.',
    analytics: 'Medição de audiência',
    analyticsHelp: 'Conta visitas de forma anônima, sem rastrear você entre sites.',
    policy: 'Política de privacidade',
  },
  search: {
    _label: 'Busca',
    title: 'Buscar no site',
    label: 'O que você procura?',
    submit: 'Buscar',
    resultsOne: '1 resultado para “{q}”',
    resultsMany: '{n} resultados para “{q}”',
    empty: 'Nada encontrado para “{q}”. Tente outra palavra ou veja todos os projetos.',
    typeProjects: 'Projeto',
    typePages: 'Página',
    typeServices: 'Área de atuação',
    typeNews: 'Notícia',
  },
  notFound: {
    _label: 'Página não encontrada',
    title: 'Esta página não existe mais',
    text: 'O endereço pode ter mudado. Estes caminhos ajudam a continuar:',
    home: 'Ir para o início',
    projects: 'Ver os projetos',
    contact: 'Falar com a Quarau',
  },
  error: {
    _label: 'Erro',
    title: 'A página não carregou',
    text: 'Houve um erro do nosso lado. Tente de novo em instantes.',
    retry: 'Tentar de novo',
  },
  video: {
    _label: 'Vídeo',
    play: 'Assistir ao vídeo',
  },
} as const

type Dict = typeof SITE_TEXTS
export type TextGroup = keyof Dict
export type SiteTexts = { [G in TextGroup]: { [K in Exclude<keyof Dict[G], '_label'>]: string } }

const tabs: Tab[] = (Object.keys(SITE_TEXTS) as TextGroup[]).map((group) => {
  const { _label, ...entries } = SITE_TEXTS[group] as Record<string, string>
  return {
    name: group,
    label: _label,
    fields: Object.entries(entries).map(([key, value]): Field => {
      const label = value.length > 60 ? `${value.slice(0, 57)}…` : value
      return value.length > 80
        ? { name: key, type: 'textarea', label, defaultValue: value, required: true }
        : { name: key, type: 'text', label, defaultValue: value, required: true }
    }),
  }
})

export const SiteTextsGlobal: GlobalConfig = {
  slug: 'site-texts',
  label: 'Textos do site',
  admin: {
    group: 'Configurações do site',
    description:
      'Rótulos, botões, mensagens de erro, aviso de cookies e outros textos curtos que aparecem em todo o site.',
  },
  access: { read: anyone, update: editors },
  hooks: { afterChange: [revalidateGlobal('site-texts')] },
  fields: [{ type: 'tabs', tabs }],
}

/** Merges what is saved in the CMS over the initial values (a blank field never breaks the page). */
export function mergeTexts(
  saved: Partial<Record<string, Record<string, unknown>>> | null | undefined,
): SiteTexts {
  const out = {} as Record<string, Record<string, string>>
  for (const group of Object.keys(SITE_TEXTS) as TextGroup[]) {
    const { _label: _unused, ...defaults } = SITE_TEXTS[group] as Record<string, string>
    const current = saved?.[group] ?? {}
    out[group] = Object.fromEntries(
      Object.entries(defaults).map(([k, v]) => {
        const s = current[k]
        return [k, typeof s === 'string' && s.trim() ? s : v]
      }),
    )
  }
  return out as SiteTexts
}

/** "Ver as {n} fotos" + { n: 12 } → "Ver as 12 fotos". */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m))
}
