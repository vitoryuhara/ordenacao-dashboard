import type { Modalidade, NotaConceito, StatusCandidato, StatusEntrega } from '../types'

export const SECOES_POR_MODALIDADE: Record<Modalidade, string[]> = {
  pastoral: [
    'Trabalho Escrito — Teologia Sistemática',
    'Trabalho Escrito — Princípios da Doutrina Cristã',
    'Trabalho Escrito — História da Igreja',
    'Trabalho Escrito — Análise Pessoal',
    'Trabalho Escrito — Leitura e Resumo de Livros (16 livros)',
    'Trabalho Escrito — Cosmovisão Bíblica',
    'Trabalho Escrito — Cronograma e Prazos de Entrega',
    'Jejum e Oração (40 dias)',
    'Sabatina com a Banca Pastoral',
  ],
  presbiteral: [
    'Trabalho Escrito — Teologia Sistemática',
    'Trabalho Escrito — Princípios da Doutrina Cristã',
    'Trabalho Escrito — História da Igreja',
    'Trabalho Escrito — Análise Pessoal',
    'Trabalho Escrito — Leitura e Resumo de Livros (7 livros)',
    'Trabalho Escrito — Cosmovisão Bíblica',
    'Jejum e Oração (21 dias)',
    'Sabatina com a Banca Pastoral',
  ],
}

export function aceitaNota(secao: string): boolean {
  return !secao.startsWith('Jejum e Oração')
}

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
