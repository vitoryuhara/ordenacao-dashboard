import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { CandidatoPage } from './pages/CandidatoPage'
import { AdminLoginPage } from './pages/AdminLoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:modalidade" element={<DashboardPage />} />
      <Route path="/candidato/:id" element={<CandidatoPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
