import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { serverTimestamp, Timestamp } from '../../lib/firebase'
import type { Modalidade } from '../../types'

interface NovoCandidatoModalProps {
  modalidade: Modalidade
  onCriar: (dados: {
    nome: string
    modalidade: Modalidade
    localidade: string
    dataInicio: Timestamp
    status: 'em_andamento'
  }) => Promise<void>
  onFechar: () => void
}

export function NovoCandidatoModal({ modalidade, onCriar, onFechar }: NovoCandidatoModalProps) {
  const [nome, setNome] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [salvando, setSalvando] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !localidade.trim()) {
      toast.error('Preencha todos os campos')
      return
    }
    setSalvando(true)
    try {
      await onCriar({
        nome: nome.trim(),
        modalidade,
        localidade: localidade.trim(),
        dataInicio: serverTimestamp() as Timestamp,
        status: 'em_andamento',
      })
      toast.success('Candidato criado com sucesso')
      onFechar()
    } catch {
      toast.error('Erro ao criar candidato')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Novo candidato</h2>
          <p className="text-sm text-gray-500 mt-0.5 capitalize">
            Ordenação {modalidade}
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
              placeholder="Ex: João da Silva"
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
              placeholder="Ex: Zion São Paulo"
            />
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
              {salvando ? 'Salvando…' : 'Criar candidato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
