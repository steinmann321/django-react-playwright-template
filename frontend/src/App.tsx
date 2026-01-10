import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ComponentShowcase from '@/pages/ComponentShowcase'
import HealthPage from '@/pages/HealthPage'
import LanguageSelector from '@/components/LanguageSelector'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

export default function App() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = 'word trainer'
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <nav className="mb-6 flex items-center justify-between">
        <div className="flex gap-4">
          <Button variant="link" asChild>
            <Link to="/">{t('nav.home')}</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/health">{t('nav.health')}</Link>
          </Button>
        </div>
        <LanguageSelector />
      </nav>
      <Routes>
        <Route path="/" element={<ComponentShowcase />} />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </div>
  )
}
