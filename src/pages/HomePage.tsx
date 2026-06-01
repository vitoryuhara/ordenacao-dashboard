import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function HomePage() {
  const { autenticado, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">Dashboard de Ordenações</h1>
              <p className="text-xs text-gray-500">Zion Church</p>
            </div>
          </div>
          {autenticado ? (
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/admin"
              className="text-sm text-gray-500 hover:text-teal-700 font-medium transition-colors"
            >
              Acesso coordenador
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900">Processo de Ordenação</h2>
          <p className="text-gray-500 mt-3 text-sm leading-relaxed">
            Selecione a modalidade para acompanhar os candidatos em processo de ordenação.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <Link
              to="/pastoral"
              className="group bg-white border border-gray-100 rounded-2xl p-8 text-left hover:border-teal-300 hover:bg-teal-50 transition-all"
            >
              <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Ordenação Pastoral</h3>
              <p className="text-sm text-gray-500 mt-1">8 seções de entrega</p>
            </Link>

            <Link
              to="/presbiteral"
              className="group bg-white border border-gray-100 rounded-2xl p-8 text-left hover:border-teal-300 hover:bg-teal-50 transition-all"
            >
              <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Ordenação Presbiteral</h3>
              <p className="text-sm text-gray-500 mt-1">7 seções de entrega</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
