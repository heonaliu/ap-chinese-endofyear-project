'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────
export type Lang = 'en' | 'zh'

export interface Bilingual {
  en: string
  zh: string
}

interface LanguageContextType {
  lang: Lang
  toggleLang: () => void
  t: (content: Bilingual) => string
  isZh: boolean
}

// ─── Context ──────────────────────────────────────────────────
const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: ({ en }) => en,
  isZh: false,
})

// ─── Provider ─────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'zh' : 'en'))
  }, [])

  const t = useCallback(
    ({ en, zh }: Bilingual): string => (lang === 'zh' ? zh : en),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isZh: lang === 'zh' }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────
export function useLang() {
  return useContext(LanguageContext)
}
