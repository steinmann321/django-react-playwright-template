import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HealthPage from '@/pages/HealthPage'
import LanguageSelector from '@/components/LanguageSelector'
import { useI18n } from '@/lib/i18n'

export default function App() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = 'My Project'
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <nav className="mb-6 flex items-center justify-between">
        <div className="flex gap-4">
          <Link className="underline" to="/">{t('nav.home')}</Link>
          <Link className="underline" to="/health">{t('nav.health')}</Link>
        </div>
        <LanguageSelector />
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome. Visit the Health page.</div>} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </div>
  )
}
