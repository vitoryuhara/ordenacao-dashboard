import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCandidato } from '../lib/firebase'
import { useEntregas } from '../hooks/useEntregas'
import { useAuth } from '../hooks/useAuth'
import { EntregaCard } from '../components/entrega/EntregaCard'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge } from '../components/ui/Badge'
import { CardSkeleton } from '../components/ui/Skeleton'
import {
  LABEL_STATUS_CANDIDATO,
  COR_STATUS_CANDIDATO,
  NOTAS_CONCEITO,
  NOTA_COR,
  aceitaNota,
  GRUPOS_POR_MODALIDADE,
  GrupoEntregas,
} from '../lib/constants'
import type { Candidato, Entrega, NotaConceito } from '../types'

function GrupoSection({
  grupo,
  entregas,
  isCoord,
  onAtualizar,
}: {
  grupo: GrupoEntregas
  entregas: Entrega[]
  isCoord: boolean
  onAtualizar: (id: string, dados: Partial<Omit<Entrega, 'id' | 'secao' | 'updatedAt'>>) => void
}) {
  const [aberto, setAberto] = useState(false)

  const entregues = entregas.filter(e => e.status === 'entregue' || e.status === 'aprovado').length
  const temAlerta = entregas.some(e => e.status === 'reprovado' || e.nota === 'D')
  const temEntregue = entregas.some(e => e.status === 'entregue' || e.status === 'aprovado')

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setAberto(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
            temAlerta ? 'bg-red-400' :
            entregues === entregas.length && entregas.length > 0 ? 'bg-teal-500' :
            temEntregue ? 'bg-blue-400' : 'bg-gray-300'
          }`} />
          <span className="text-sm font-semibold text-gray-800">{grupo.label}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400">{entregues}/{entregas.length}</span>
          <span className="text-xs text-gray-400">{entregas.length} {entregas.length === 1 ? 'item' : 'itens'}</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${aberto ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {aberto && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {entregas.map(entrega => (
            <EntregaCard
              key={entrega.id}
              entrega={entrega}
              isCoord={isCoord}
              onAtualizar={isCoord
                ? (dados) => onAtualizar(entrega.id, dados)
                : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CandidatoPage() {
  const { id } = useParams<{ id: string }>()
  const { autenticado } = useAuth()
  const [candidato, setCandidato] = useState<Candidato | null>(null)
  const [carregandoCandidato, setCarregandoCandidato] = useState(true)

  useEffect(() => {
    if (!id) return
    setCarregandoCandidato(true)
    getCandidato(id)
      .then(setCandidato)
      .catch(() => toast.error('Candidato não encontrado'))
      .finally(() => setCarregandoCandidato(false))
  }, [id])

  const { entregas, carregando, atualizar, progresso } = useEntregas(
    id ?? '',
    candidato?.modalidade ?? 'pastoral',
  )

  const voltarUrl = candidato ? `/${candidato.modalidade}` : '/'

  const notasAvaliadas = entregas
    .filter(e => aceitaNota(e.secao) && e.nota !== null)
    .map(e => e.nota as NotaConceito)

  const conceitoPredominante: NotaConceito | null = (() => {
    if (notasAvaliadas.length === 0) return null
    const contagem = new Map<NotaConceito, number>()
    for (const n of notasAvaliadas) contagem.set(n, (contagem.get(n) ?? 0) + 1)
    return [...contagem.entries()].sort((a, b) => b[1] - a[1])[0][0]
  })()

  const conceitoMaisBaixo: NotaConceito | null = notasAvaliadas.length === 0
    ? null
    : notasAvaliadas.reduce((pior, n) =>
        NOTAS_CONCEITO.indexOf(n) > NOTAS_CONCEITO.indexOf(pior) ? n : pior
      )

  const grupos = candidato ? GRUPOS_POR_MODALIDADE[candidato.modalidade] : []

  const entregasPorGrupo = (grupo: GrupoEntregas) =>
    grupo.secoes
      .map(secao => entregas.find(e => e.secao === secao))
      .filter((e): e is Entrega => e !== undefined)

  if (carregandoCandidato) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
          <CardSkeleton />
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (!candidato) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Candidato não encontrado.</p>
          <Link to="/" className="text-teal-600 text-sm font-medium mt-2 inline-block">
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link to={voltarUrl} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-bold text-gray-900">{candidato.nome}</h1>
            <p className="text-xs text-gray-500">{candidato.localidade}</p>
          </div>
          <Badge
            label={LABEL_STATUS_CANDIDATO[candidato.status]}
            className={COR_STATUS_CANDIDATO[candidato.status]}
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Progresso geral</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{progresso}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {entregas.filter(e => e.status === 'entregue' || e.status === 'aprovado').length} / {entregas.length} entregues
              </p>
              <p className="text-xs text-gray-400 mt-0.5 capitalize">
                Ordenação {candidato.modalidade}
              </p>
            </div>
          </div>
          <ProgressBar value={progresso} />
          {notasAvaliadas.length > 0 && (
            <div className="flex gap-6 mt-3 pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Conceito predominante</p>
                <p className={`text-sm font-bold mt-0.5 ${NOTA_COR[conceitoPredominante!]}`}>
                  {conceitoPredominante}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Conceito mais baixo</p>
                <p className={`text-sm font-bold mt-0.5 ${NOTA_COR[conceitoMaisBaixo!]}`}>
                  {conceitoMaisBaixo}
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Seções de entrega</h2>
          {carregando ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {grupos.map(grupo => (
                <GrupoSection
                  key={grupo.label}
                  grupo={grupo}
                  entregas={entregasPorGrupo(grupo)}
                  isCoord={autenticado}
                  onAtualizar={(entregaId, dados) =>
                    void atualizar(entregaId, dados as Partial<Omit<Entrega, 'id' | 'secao' | 'updatedAt'>>)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
