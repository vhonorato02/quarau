/** UN Sustainable Development Goals — official colours and Brazilian Portuguese names. */
export const ODS = {
  1: { name: 'Erradicação da pobreza', color: '#E5243B' },
  2: { name: 'Fome zero e agricultura sustentável', color: '#DDA63A' },
  3: { name: 'Saúde e bem-estar', color: '#4C9F38' },
  4: { name: 'Educação de qualidade', color: '#C5192D' },
  5: { name: 'Igualdade de gênero', color: '#FF3A21' },
  6: { name: 'Água potável e saneamento', color: '#26BDE2' },
  7: { name: 'Energia limpa e acessível', color: '#FCC30B' },
  8: { name: 'Trabalho decente e crescimento econômico', color: '#A21942' },
  9: { name: 'Indústria, inovação e infraestrutura', color: '#FD6925' },
  10: { name: 'Redução das desigualdades', color: '#DD1367' },
  11: { name: 'Cidades e comunidades sustentáveis', color: '#FD9D24' },
  12: { name: 'Consumo e produção responsáveis', color: '#BF8B2E' },
  13: { name: 'Ação contra a mudança global do clima', color: '#3F7E44' },
  14: { name: 'Vida na água', color: '#0A97D9' },
  15: { name: 'Vida terrestre', color: '#56C02B' },
  16: { name: 'Paz, justiça e instituições eficazes', color: '#00689D' },
  17: { name: 'Parcerias e meios de implementação', color: '#19486A' },
} as const satisfies Record<number, { name: string; color: string }>

export type OdsNumber = keyof typeof ODS

export function isOdsNumber(n: number): n is OdsNumber {
  return Number.isInteger(n) && n >= 1 && n <= 17
}
