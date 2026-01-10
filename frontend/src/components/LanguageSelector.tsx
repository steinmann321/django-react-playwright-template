import { useI18n } from '@/lib/i18n'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const options = [
  { code: 'en', labelKey: 'language.en' },
  { code: 'de', labelKey: 'language.de' },
  { code: 'fr', labelKey: 'language.fr' },
  { code: 'es', labelKey: 'language.es' },
] as const

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n()

  return (
    <Card className="min-w-[280px]">
      <CardHeader>
        <CardTitle className="text-base">{t('language.label')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Select value={lang} onValueChange={(value) => setLang(value as any)}>
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue placeholder={t('language.label')} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.code} value={opt.code}>
                  {t(opt.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="success" data-testid="language-badge" style={{ textTransform: 'uppercase' }}>
            {lang}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <Button
              key={opt.code}
              onClick={() => setLang(opt.code as any)}
              variant={lang === opt.code ? 'default' : 'outline'}
              size="sm"
              aria-pressed={lang === opt.code}
            >
              {t(opt.labelKey)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
