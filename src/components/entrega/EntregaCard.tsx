import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { LABEL_STATUS_ENTREGA, COR_STATUS_ENTREGA, NOTAS_CONCEITO, NOTA_COR, aceitaNota } from '../../lib/constants'
import type { Entrega, NotaConceito, StatusEntrega } from '../../types'

interface EntregaCardProps {
  entrega: Entrega
  isCoord?: boolean
  onAtualizar?: (dados: Partial<Omit<Entrega, 'id' | 'secao' | 'updatedAt'>>) => void
}

const STATUS_OPCOES_PADRAO: StatusEntrega[] = ['pendente', 'em_andamento', 'entregue', 'aprovado', 'reprovado']
const STATUS_OPCOES_JEJUM: StatusEntrega[] = ['pendente', 'em_andamento', 'aprovado']

export function EntregaCard({ entrega, isCoord = false, onAtualizar }: EntregaCardProps) {
  const comNota = aceitaNota(entrega.secao)
  const statusOpcoes = comNota ? STATUS_OPCOES_PADRAO : STATUS_OPCOES_JEJUM
  const [expandido, setExpandido] = useState(false)
  const [editando, setEditando] = useState(false)
  const [nota, setNota] = useState<string>(entrega.nota ?? '')
  const [revisao, setRevisao] = useState(entrega.notaRevisao)
  const [obs, setObs] = useState(entrega.observacoes)

  const salvar = () => {
    if (!onAtualizar) return
    onAtualizar({
      nota: nota === '' ? null : nota as NotaConceito,
      notaRevisao: revisao,
      observacoes: obs,
    })
    setEditando(false)
  }

  const alterarStatus = (status: StatusEntrega) => {
    onAtualizar?.({ status })
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpandido(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
            entrega.status === 'aprovado' ? 'bg-teal-500' :
            entrega.status === 'reprovado' ? 'bg-red-400' :
            entrega.status === 'entregue' ? 'bg-blue-400' :
            entrega.status === 'em_andamento' ? 'bg-orange-400' : 'bg-gray-300'
          }`} />
          <span className="text-sm font-medium text-gray-800 truncate">{entrega.secao}</span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {entrega.nota !== null && (
            <span className={`text-sm font-bold ${NOTA_COR[entrega.nota]}`}>{entrega.nota}</span>
          )}
          <Badge
            label={LABEL_STATUS_ENTREGA[entrega.status]}
            className={COR_STATUS_ENTREGA[entrega.status]}
          />
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${expandido ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expandido && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-4">
          {isCoord && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Alterar status</p>
              <div className="flex flex-wrap gap-2">
                {statusOpcoes.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => alterarStatus(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      entrega.status === s
                        ? `${COR_STATUS_ENTREGA[s]} border-transparent`
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {LABEL_STATUS_ENTREGA[s]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isCoord && editando ? (
            <div className="space-y-3">
              {comNota && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Conceito</label>
                  <select
                    value={nota}
                    onChange={e => setNota(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">— sem conceito —</option>
                    {NOTAS_CONCEITO.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Revisão do trabalho</label>
                <textarea
                  value={revisao}
                  onChange={e => setRevisao(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Observações internas</label>
                <textarea
                  value={obs}
                  onChange={e => setObs(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={salvar}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {entrega.notaRevisao && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Revisão do trabalho</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{entrega.notaRevisao}</p>
                </div>
              )}
              {isCoord && entrega.observacoes && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Observações internas</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{entrega.observacoes}</p>
                </div>
              )}
              {!entrega.notaRevisao && (!isCoord || !entrega.observacoes) && (
                <p className="text-sm text-gray-400 italic">Nenhum comentário ainda.</p>
              )}
              {isCoord && (
                <button
                  type="button"
                  onClick={() => setEditando(true)}
                  className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                >
                  Editar avaliação
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
