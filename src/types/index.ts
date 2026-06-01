import { Timestamp } from 'firebase/firestore'

export type Modalidade = 'pastoral' | 'presbiteral'

export type NotaConceito = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D'

export type StatusCandidato = 'em_andamento' | 'aprovado' | 'reprovado' | 'suspenso'

export type StatusEntrega = 'pendente' | 'em_andamento' | 'entregue' | 'aprovado' | 'reprovado'

export interface Candidato {
  id: string
  nome: string
  modalidade: Modalidade
  localidade: string
  dataInicio: Timestamp
  status: StatusCandidato
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Entrega {
  id: string
  secao: string
  status: StatusEntrega
  nota: NotaConceito | null
  notaRevisao: string
  observacoes: string
  dataEntrega: Timestamp | null
  dataAvaliacao: Timestamp | null
  avaliador: string
  updatedAt: Timestamp
}

export interface EntregaUpdate {
  status?: StatusEntrega
  nota?: NotaConceito | null
  notaRevisao?: string
  observacoes?: string
  avaliador?: string
  dataEntrega?: Timestamp | null
  dataAvaliacao?: Timestamp | null
  updatedAt: Timestamp
}
