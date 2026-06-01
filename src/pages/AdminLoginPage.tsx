import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'

export function AdminLoginPage() {
  const [senha, setSenha] = useState('')
  const { autenticado, login } = useAuth()
  const navigate = useNavigate()

  if (autenticado) {
    void navigate('/')
    return null
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(senha)) {
      toast.success('Acesso autorizado')
      void navigate('/')
    } else {
      toast.error('Senha incorreta')
      setSenha('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-teal-600 rounded-xl items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Acesso coordenador</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard de Ordenações — Zion Church</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Digite a senha de acesso"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  )
}
