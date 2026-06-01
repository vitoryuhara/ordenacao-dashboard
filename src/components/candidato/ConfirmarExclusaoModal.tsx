import { useState } from 'react'

interface ConfirmarExclusaoModalProps {
  nome: string
  onConfirmar: () => Promise<void>
  onCancelar: () => void
}

export function ConfirmarExclusaoModal({ nome, onConfirmar, onCancelar }: ConfirmarExclusaoModalProps) {
  const [excluindo, setExcluindo] = useState(false)

  const handleConfirmar = async () => {
    setExcluindo(true)
    try {
      await onConfirmar()
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="px-6 py-5">
          <h2 className="text-base font-semibold text-gray-900">Excluir candidato</h2>
          <p className="text-sm text-gray-600 mt-2">
            Tem certeza que deseja excluir <span className="font-medium text-gray-900">{nome}</span>? Esta ação não pode ser desfeita.
          </p>
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            disabled={excluindo}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void handleConfirmar()}
            disabled={excluindo}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {excluindo ? 'Excluindo…' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}
