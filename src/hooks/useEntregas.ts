import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getEntregas, atualizarEntrega, serverTimestamp, Timestamp } from '../lib/firebase'
import { SECOES_POR_MODALIDADE } from '../lib/constants'
import type { Entrega, Modalidade, StatusEntrega } from '../types'

export function useEntregas(candidatoId: string, modalidade: Modalidade) {
  const [entregas, setEntregas] = useState<Entrega[]>([])
  const [carregando, setCarregando] = useState(true)

  const carregar = useCallback(async () => {
    setCarregando(true)
    try {
      const lista = await getEntregas(candidatoId)
      // Garante a ordem das seções conforme a modalidade
      const ordemSecoes = SECOES_POR_MODALIDADE[modalidade]
      const ordenadas = [...lista].sort(
        (a, b) => ordemSecoes.indexOf(a.secao) - ordemSecoes.indexOf(b.secao),
      )
      setEntregas(ordenadas)
    } catch {
      toast.error('Erro ao carregar entregas')
    } finally {
      setCarregando(false)
    }
  }, [candidatoId, modalidade])

  useEffect(() => { void carregar() }, [carregar])

  const atualizar = useCallback(
    async (
      entregaId: string,
      dados: Partial<Omit<Entrega, 'id' | 'secao' | 'updatedAt'>>,
    ) => {
      setEntregas(prev =>
        prev.map(e =>
          e.id === entregaId
            ? { ...e, ...dados, updatedAt: serverTimestamp() as Timestamp }
            : e,
        ),
      )
      try {
        await atualizarEntrega(candidatoId, entregaId, dados)
      } catch {
        toast.error('Erro ao salvar alteração')
        await carregar()
      }
    },
    [candidatoId, carregar],
  )

  const marcarEntregue = useCallback(
    (entregaId: string) =>
      atualizar(entregaId, {
        status: 'entregue' as StatusEntrega,
        dataEntrega: serverTimestamp() as Timestamp,
      }),
    [atualizar],
  )

  const progresso = Math.round(
    (entregas.filter(e => e.status === 'entregue' || e.status === 'aprovado').length / Math.max(entregas.length, 1)) * 100,
  )

  return { entregas, carregando, atualizar, marcarEntregue, progresso }
}
