import { useState, useCallback } from 'react'

const SESSION_KEY = 'coord_auth'

export function useAuth() {
  const [autenticado, setAutenticado] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true',
  )

  const login = useCallback((senha: string): boolean => {
    const senhaCorreta = import.meta.env.VITE_ADMIN_PASSWORD
    if (senha === senhaCorreta) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAutenticado(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAutenticado(false)
  }, [])

  return { autenticado, login, logout }
}
