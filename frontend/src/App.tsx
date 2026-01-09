import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HealthPage from './pages/HealthPage'

export default function App() {
  useEffect(() => {
    document.title = 'My Project'
  }, [])

  return (
    <div className="p-6">
      <nav className="mb-6 flex gap-4">
        <Link className="underline" to="/">Home</Link>
        <Link className="underline" to="/health">Health</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome. Visit the Health page.</div>} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </div>
  )
}
