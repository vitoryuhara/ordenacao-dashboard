import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { LABEL_STATUS_CANDIDATO, COR_STATUS_CANDIDATO } from '../../lib/constants'
import type { Candidato } from '../../types'

interface CandidatoCardProps {
  candidato: Candidato
  progresso: number
  isCoord?: boolean
  onEditar?: () => void
  onDeletar?: () => void
}

export function CandidatoCard({ candidato, progresso, isCoord = false, onEditar, onDeletar }: CandidatoCardProps) {
  return (
    <Link
      to={`/candidato/${candidato.id}`}
      className="block bg-white border border-gray-100 rounded-xl p-5 hover:border-teal-200 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-teal-700 transition-colors">
            {candidato.nome}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{candidato.localidade}</p>
        </div>
        <Badge
          label={LABEL_STATUS_CANDIDATO[candidato.status]}
          className={COR_STATUS_CANDIDATO[candidato.status]}
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progresso geral</span>
          <span className="font-medium text-gray-700">{progresso}%</span>
        </div>
        <ProgressBar value={progresso} />
      </div>

      {isCoord && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">ID: {candidato.id}</p>
          <div className="flex gap-2">
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onEditar?.() }}
              className="text-xs text-gray-400 hover:text-teal-600 font-medium transition-colors px-1"
            >
              Editar
            </button>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onDeletar?.() }}
              className="text-xs text-gray-400 hover:text-red-600 font-medium transition-colors px-1"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </Link>
  )
}
