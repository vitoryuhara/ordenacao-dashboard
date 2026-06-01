import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Timestamp } from '../../lib/firebase'
import { LABEL_STATUS_CANDIDATO } from '../../lib/constants'
import type { Candidato, StatusCandidato } from '../../types'

interface EditarCandidatoModalProps {
  candidato: Candidato
  onSalvar: (dados: Pick<Candidato, 'nome' | 'localidade' | 'dataInicio' | 'status'>) => Promise<void>
  onFechar: () => void
}

function timestampParaInput(ts: Timestamp): string {
  const d = ts.toDate()
  return d.toISOString().slice(0, 10)
}

const STATUS_OPTIONS: StatusCandidato[] = ['em_andamento', 'aprovado', 'reprovado', 'suspenso']

export function EditarCandidatoModal({ candidato, onSalvar, onFechar }: EditarCandidatoModalProps) {
  const [nome, setNome] = useState(candidato.nome)
  const [localidade, setLocalidade] = useState(candidato.localidade)
  const [dataInicio, setDataInicio] = useState(timestampParaInput(candidato.dataInicio))
  const [status, setStatus] = useState<StatusCandidato>(candidato.status)
  const [salvando, setSalvando] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !localidade.trim() || !dataInicio) {
      toast.error('Preencha todos os campos')
      return
    }
    setSalvando(true)
    try {
      const [ano, mes, dia] = dataInicio.split('-').map(Number)
      const data = new Date(ano, mes - 1, dia)
      await onSalvar({
        nome: nome.trim(),
        localidade: localidade.trim(),
        dataInicio: Timestamp.fromDate(data),
        status,
      })
      onFechar()
    } catch {
      toast.error('Erro ao salvar candidato')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Editar candidato</h2>
          <p className="text-sm text-gray-500 mt-0.5 capitalize">
            Ordenação {candidato.modalidade}
          </p>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localidade / Igreja</label>
            <input
              type="text"
              value={localidade}
              onChange={e => setLocalidade(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de início</label>
            <input
              type="date"
              value={dataInicio}
              onChange={e => setDataInicio(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as StatusCandidato)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{LABEL_STATUS_CANDIDATO[s]}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {salvando ? 'Salvando…' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
