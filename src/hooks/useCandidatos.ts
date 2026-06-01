import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getCandidatos, criarCandidato, atualizarStatusCandidato, deletarCandidato } from '../lib/firebase'
import type { Candidato, Modalidade, StatusCandidato } from '../types'

export function useCandidatos(modalidade?: Modalidade) {
  const [candidatos, setCandidatos] = useState<Candidato[]>([])
  const [carregando, setCarregando] = useState(true)

  const carregar = useCallback(async () => {
    setCarregando(true)
    try {
      const todos = await getCandidatos()
      setCandidatos(modalidade ? todos.filter(c => c.modalidade === modalidade) : todos)
    } catch {
      toast.error('Erro ao carregar candidatos')
    } finally {
      setCarregando(false)
    }
  }, [modalidade])

  useEffect(() => { void carregar() }, [carregar])

  const criar = useCallback(
    async (dados: Omit<Candidato, 'id' | 'createdAt' | 'updatedAt'>) => {
      const id = await criarCandidato(dados)
      await carregar()
      return id
    },
    [carregar],
  )

  const atualizarStatus = useCallback(
    async (id: string, status: StatusCandidato) => {
      setCandidatos(prev =>
        prev.map(c => (c.id === id ? { ...c, status } : c)),
      )
      try {
        await atualizarStatusCandidato(id, status)
      } catch {
        toast.error('Erro ao atualizar status')
        await carregar()
      }
    },
    [carregar],
  )

  const deletar = useCallback(
    async (id: string) => {
      setCandidatos(prev => prev.filter(c => c.id !== id))
      try {
        await deletarCandidato(id)
      } catch {
        toast.error('Erro ao remover candidato')
        await carregar()
      }
    },
    [carregar],
  )

  return { candidatos, carregando, criar, atualizarStatus, deletar, recarregar: carregar }
}
