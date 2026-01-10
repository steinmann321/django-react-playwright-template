import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LanguageCode = "en" | "de" | "fr" | "es";

type I18nContextValue = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
};

const I18N_STORAGE_KEY = "app.lang";

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.health": "Health",
    "health.title": "Health",
    "health.desc":
      "Checks API status and displays example notice from backend.",
    "status.healthy": "Healthy",
    "status.unhealthy": "Unhealthy",
    "language.label": "Language",
    "language.en": "English",
    "language.de": "German",
    "language.fr": "French",
    "language.es": "Spanish",
  },
  de: {
    "nav.home": "Start",
    "nav.health": "Status",
    "health.title": "Status",
    "health.desc": "Prüft den API‑Status und zeigt Hinweise des Backends.",
    "status.healthy": "Gesund",
    "status.unhealthy": "Ungesund",
    "language.label": "Sprache",
    "language.en": "Englisch",
    "language.de": "Deutsch",
    "language.fr": "Französisch",
    "language.es": "Spanisch",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.health": "Santé",
    "health.title": "Santé",
    "health.desc": "Vérifie l'état de l'API et affiche un avis du backend.",
    "status.healthy": "En bon état",
    "status.unhealthy": "En mauvais état",
    "language.label": "Langue",
    "language.en": "Anglais",
    "language.de": "Allemand",
    "language.fr": "Français",
    "language.es": "Espagnol",
  },
  es: {
    "nav.home": "Inicio",
    "nav.health": "Salud",
    "health.title": "Salud",
    "health.desc":
      "Comprueba el estado de la API y muestra un aviso del backend.",
    "status.healthy": "Saludable",
    "status.unhealthy": "No saludable",
    "language.label": "Idioma",
    "language.en": "Inglés",
    "language.de": "Alemán",
    "language.fr": "Francés",
    "language.es": "Español",
  },
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem(
      I18N_STORAGE_KEY,
    ) as LanguageCode | null;
    if (stored && ["en", "de", "fr", "es"].includes(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: LanguageCode) => {
    setLangState(l);
    try {
      localStorage.setItem(I18N_STORAGE_KEY, l);
    } catch {}
  };

  const t = useMemo(() => {
    const dict = translations[lang];
    return (key: string) => dict[key] ?? translations.en[key] ?? key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
