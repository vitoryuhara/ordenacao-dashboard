import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CandidatoCard } from '../components/candidato/CandidatoCard'
import { NovoCandidatoModal } from '../components/candidato/NovoCandidatoModal'
import { EditarCandidatoModal } from '../components/candidato/EditarCandidatoModal'
import { ConfirmarExclusaoModal } from '../components/candidato/ConfirmarExclusaoModal'
import { CardSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { useCandidatos } from '../hooks/useCandidatos'
import { useAuth } from '../hooks/useAuth'
import { useEntregas } from '../hooks/useEntregas'
import type { Modalidade, Candidato } from '../types'

function ProgressoWrapper({
  candidato,
  onEditar,
  onDeletar,
}: {
  candidato: Candidato
  onEditar: (c: Candidato) => void
  onDeletar: (c: Candidato) => void
}) {
  const { progresso } = useEntregas(candidato.id, candidato.modalidade)
  return (
    <CandidatoCard
      candidato={candidato}
      progresso={progresso}
      isCoord
      onEditar={() => onEditar(candidato)}
      onDeletar={() => onDeletar(candidato)}
    />
  )
}

export function DashboardPage() {
  const { modalidade } = useParams<{ modalidade: string }>()
  const mod = (modalidade as Modalidade) ?? 'pastoral'
  const { candidatos, carregando, criar, editar, deletar } = useCandidatos(mod)
  const { autenticado, logout } = useAuth()

  const [modalNovoAberto, setModalNovoAberto] = useState(false)
  const [candidatoEditando, setCandidatoEditando] = useState<Candidato | null>(null)
  const [candidatoDeletando, setCandidatoDeletando] = useState<Candidato | null>(null)

  const titulo = mod === 'pastoral' ? 'Ordenação Pastoral' : 'Ordenação Presbiteral'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-sm font-bold text-gray-900">{titulo}</h1>
              <p className="text-xs text-gray-500">Zion Church</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {autenticado ? (
              <>
                <button
                  onClick={() => setModalNovoAberto(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Novo candidato
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="text-sm text-gray-500 hover:text-teal-700 font-medium transition-colors"
              >
                Coordenador
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Candidatos</h2>
            {!carregando && (
              <p className="text-sm text-gray-500 mt-0.5">
                {candidatos.length} {candidatos.length === 1 ? 'candidato' : 'candidatos'}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              to={`/${mod === 'pastoral' ? 'presbiteral' : 'pastoral'}`}
              className="text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
            >
              Ver {mod === 'pastoral' ? 'Presbiteral' : 'Pastoral'} →
            </Link>
          </div>
        </div>

        {carregando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : candidatos.length === 0 ? (
          <EmptyState
            titulo="Nenhum candidato cadastrado"
            descricao={autenticado
              ? 'Clique em "Novo candidato" para começar.'
              : 'Não há candidatos nesta modalidade ainda.'}
            acao={autenticado ? (
              <button
                onClick={() => setModalNovoAberto(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Novo candidato
              </button>
            ) : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidatos.map(c => (
              autenticado
                ? (
                  <ProgressoWrapper
                    key={c.id}
                    candidato={c}
                    onEditar={setCandidatoEditando}
                    onDeletar={setCandidatoDeletando}
                  />
                )
                : <CandidatoCard key={c.id} candidato={c} progresso={0} />
            ))}
          </div>
        )}
      </main>

      {modalNovoAberto && (
        <NovoCandidatoModal
          modalidade={mod}
          onCriar={async (dados) => { await criar(dados) }}
          onFechar={() => setModalNovoAberto(false)}
        />
      )}

      {candidatoEditando && (
        <EditarCandidatoModal
          candidato={candidatoEditando}
          onSalvar={async (dados) => { await editar(candidatoEditando.id, dados) }}
          onFechar={() => setCandidatoEditando(null)}
        />
      )}

      {candidatoDeletando && (
        <ConfirmarExclusaoModal
          nome={candidatoDeletando.nome}
          onConfirmar={async () => {
            await deletar(candidatoDeletando.id)
            setCandidatoDeletando(null)
          }}
          onCancelar={() => setCandidatoDeletando(null)}
        />
      )}
    </div>
  )
}
