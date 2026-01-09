import { useI18n } from '../lib/i18n'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import * as React from 'react'

const options = [
  { code: 'en', labelKey: 'language.en' },
  { code: 'de', labelKey: 'language.de' },
  { code: 'fr', labelKey: 'language.fr' },
  { code: 'es', labelKey: 'language.es' },
] as const

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as any)
  }

  return (
    <Card className="min-w-[280px]">
      <CardHeader>
        <CardTitle className="text-base">{t('language.label')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <select
            value={lang}
            onChange={onChange}
            className="h-8 rounded-md border bg-background px-2 text-sm shadow-sm"
            aria-label={t('language.label')}
          >
            {options.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
          <Badge variant="success" data-testid="language-badge" style={{ textTransform: 'uppercase' }}>{lang}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt.code}
              onClick={() => setLang(opt.code as any)}
              className={`px-2 py-1 rounded border text-sm ${
                lang === (opt.code as any)
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted hover:text-foreground'
              }`}
              aria-pressed={lang === (opt.code as any)}
            >
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
