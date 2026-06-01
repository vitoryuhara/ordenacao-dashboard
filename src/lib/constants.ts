import type { Modalidade, NotaConceito, StatusCandidato, StatusEntrega } from '../types'

// ── Grupos de entregas por modalidade ─────────────────────────────────────────

export interface GrupoEntregas {
  label: string
  secoes: string[]
}

export const GRUPOS_PRESBITERAL: GrupoEntregas[] = [
  {
    label: 'Teologia Sistemática',
    secoes: [
      'Teologia Sistemática — Paterologia',
      'Teologia Sistemática — Cristologia',
      'Teologia Sistemática — Pneumatologia',
      'Teologia Sistemática — Soteriologia',
      'Teologia Sistemática — Eclesiologia',
      'Teologia Sistemática — Antropologia Cristã',
      'Teologia Sistemática — Escatologia',
    ],
  },
  {
    label: 'Princípios da Doutrina Cristã',
    secoes: [
      'Doutrina Cristã — Arrependimento de Obras Mortas',
      'Doutrina Cristã — Fé em Deus (Justificação)',
      'Doutrina Cristã — Doutrina dos Batismos',
      'Doutrina Cristã — Imposição de Mãos',
      'Doutrina Cristã — Ressurreição dos Mortos',
      'Doutrina Cristã — Juízo Eterno',
    ],
  },
  {
    label: 'História da Igreja',
    secoes: [
      'História da Igreja — Declaração de Cristo e Pentecostes',
      'História da Igreja — A Igreja Primitiva',
      'História da Igreja — O Cristianismo Católico',
      'História da Igreja — O Cânon Bíblico',
      'História da Igreja — A Reforma Protestante',
      'História da Igreja — Grandes Moveres de Avivamento',
      'História da Igreja — Azusa e o Movimento Pentecostal',
      'História da Igreja — O Pentecostalismo no Brasil',
    ],
  },
  {
    label: 'Análise Pessoal',
    secoes: [
      'Análise Pessoal — Testemunho Pessoal (mín. 8 páginas)',
      'Análise Pessoal — Biografia de Líder Histórico (mín. 8 páginas)',
    ],
  },
  {
    label: 'Leitura de Livros',
    secoes: [
      'Livro — Uma história da fidelidade de Deus (Sarah Hayashi)',
      'Livro — Em guarda (William Lane Craig)',
      'Livro — O Reino inabalável (Teófilo Hayashi)',
      'Livro — Cristianismo puro e simples (C.S. Lewis)',
      'Livro — Plano mestre de evangelismo (Robert Coleman)',
      'Livro — Quando o céu invade a terra (Bill Johnson)',
      'Livro — O Espírito na Igreja (Craig Keener)',
    ],
  },
  {
    label: 'Cosmovisão Bíblica',
    secoes: [
      'Cosmovisão — Marxismo Cultural',
      'Cosmovisão — Aborto',
      'Cosmovisão — Racismo',
      'Cosmovisão — LGBTQI+',
      'Cosmovisão — Hipergraça',
      'Cosmovisão — Feminismo',
    ],
  },
  {
    label: 'Etapas Finais',
    secoes: [
      'Jejum e Oração (21 dias)',
      'Sabatina com a Banca Pastoral',
    ],
  },
]

export const GRUPOS_PASTORAL: GrupoEntregas[] = [
  {
    label: 'Teologia Sistemática',
    secoes: [
      'Teologia Sistemática — Paterologia',
      'Teologia Sistemática — Cristologia',
      'Teologia Sistemática — Pneumatologia',
      'Teologia Sistemática — Soteriologia',
      'Teologia Sistemática — Eclesiologia',
      'Teologia Sistemática — Antropologia Cristã',
      'Teologia Sistemática — Escatologia',
      'Teologia Sistemática — Hermenêutica e Homilética',
      'Teologia Sistemática — Hamartiologia',
      'Teologia Sistemática — Angelologia',
      'Teologia Sistemática — Bibliologia',
    ],
  },
  {
    label: 'Princípios da Doutrina Cristã',
    secoes: [
      'Doutrina Cristã — Arrependimento de Obras Mortas',
      'Doutrina Cristã — Fé em Deus (Justificação)',
      'Doutrina Cristã — Doutrina dos Batismos',
      'Doutrina Cristã — Imposição de Mãos',
      'Doutrina Cristã — Ressurreição dos Mortos',
      'Doutrina Cristã — Juízo Eterno',
    ],
  },
  {
    label: 'História da Igreja',
    secoes: [
      'História da Igreja — Declaração de Cristo e Pentecostes',
      'História da Igreja — A Igreja Primitiva',
      'História da Igreja — O Cristianismo Católico',
      'História da Igreja — O Cânon Bíblico',
      'História da Igreja — A Reforma Protestante',
      'História da Igreja — Grandes Moveres de Avivamento',
      'História da Igreja — Azusa e o Movimento Pentecostal',
      'História da Igreja — O Pentecostalismo no Brasil',
    ],
  },
  {
    label: 'Análise Pessoal',
    secoes: [
      'Análise Pessoal — Testemunho Pessoal (mín. 10 páginas)',
      'Análise Pessoal — Biografia de Líder Histórico (mín. 8 páginas)',
    ],
  },
  {
    label: 'Leitura de Livros',
    secoes: [
      'Livro — Surpreendido pelo poder do Espírito (Jack Deere)',
      'Livro — O Espírito Santo: uma introdução (John Bevere)',
      'Livro — O conhecimento de Deus (J.I. Packer)',
      'Livro — Celebração da disciplina (Richard Foster)',
      'Livro — Oração intercessória (Dutch Sheets)',
      'Livro — Disciplina na igreja (Russell Shedd)',
      'Livro — As 21 irrefutáveis leis da liderança (John Maxwell)',
      'Livro — Simplesmente Jesus (N.T. Wright)',
      'Livro — The Historical and Biblical Defense of the Modern-Day Charismatic Apostolate (Vitor Yuhara)',
      'Livro — Quebrando correntes (Neil Anderson)',
      'Livro — À procura de Deus (A.W. Tozer)',
      'Livro — O que é uma igreja saudável? (Mark Dever)',
      'Livro — A quarta dimensão (David Yonggi Cho)',
      'Livro — O pastor aprovado (Richard Baxter)',
      'Livro — O homem espiritual (Watchman Nee)',
      'Livro — Discipulando nações (Darrow Miller e Stan Guthrie)',
    ],
  },
  {
    label: 'Cosmovisão Bíblica',
    secoes: [
      'Cosmovisão — Relativismo Moral',
      'Cosmovisão — Ética e Identidade Sexual',
      'Cosmovisão — Autoridade da Bíblia',
      'Cosmovisão — Educação Cristã',
      'Cosmovisão — Neopentecostalismo',
      'Cosmovisão — Justiça Social',
    ],
  },
  {
    label: 'Etapas Finais',
    secoes: [
      'Jejum e Oração (40 dias)',
      'Sabatina com a Banca Pastoral',
    ],
  },
]

export const GRUPOS_POR_MODALIDADE: Record<Modalidade, GrupoEntregas[]> = {
  presbiteral: GRUPOS_PRESBITERAL,
  pastoral: GRUPOS_PASTORAL,
}

export const SECOES_POR_MODALIDADE: Record<Modalidade, string[]> = {
  presbiteral: GRUPOS_PRESBITERAL.flatMap(g => g.secoes),
  pastoral: GRUPOS_PASTORAL.flatMap(g => g.secoes),
}

export function aceitaNota(secao: string): boolean {
  return !secao.startsWith('Jejum e Oração')
}

// ── Notas ─────────────────────────────────────────────────────────────────────

export const NOTAS_CONCEITO: NotaConceito[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D']

export const NOTA_COR: Record<NotaConceito, string> = {
  'A+': 'text-teal-600',
  'A':  'text-teal-600',
  'A-': 'text-teal-600',
  'B+': 'text-blue-600',
  'B':  'text-blue-600',
  'B-': 'text-blue-600',
  'C+': 'text-yellow-600',
  'C':  'text-yellow-600',
  'C-': 'text-yellow-600',
  'D':  'text-red-600',
}

// ── Status ────────────────────────────────────────────────────────────────────

export const LABEL_STATUS_CANDIDATO: Record<StatusCandidato, string> = {
  em_andamento: 'Em andamento',
  aprovado: 'Aprovado',
  reprovado: 'Reprovado',
  suspenso: 'Suspenso',
}

export const COR_STATUS_CANDIDATO: Record<StatusCandidato, string> = {
  em_andamento: 'bg-blue-100 text-blue-700',
  aprovado: 'bg-teal-100 text-teal-700',
  reprovado: 'bg-red-100 text-red-700',
  suspenso: 'bg-yellow-100 text-yellow-700',
}

export const LABEL_STATUS_ENTREGA: Record<StatusEntrega, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  entregue: 'Entregue',
  aprovado: 'Aprovado',
  reprovado: 'Reprovado',
}

export const COR_STATUS_ENTREGA: Record<StatusEntrega, string> = {
  pendente: 'bg-gray-100 text-gray-500',
  em_andamento: 'bg-orange-100 text-orange-700',
  entregue: 'bg-blue-100 text-blue-700',
  aprovado: 'bg-teal-100 text-teal-700',
  reprovado: 'bg-red-100 text-red-700',
}

export function corProgresso(pct: number): string {
  if (pct >= 80) return 'bg-teal-500'
  if (pct >= 40) return 'bg-yellow-400'
  return 'bg-red-400'
}
