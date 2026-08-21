"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, languages, type TranslationKey } from "./i18n";

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: TranslationKey;
  dir: "ltr" | "rtl";
  languageLabel: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en");

  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    // Update HTML dir attribute for RTL languages
    const lang = languages.find((l) => l.code === code);
    if (lang) {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = code;
    }
  }, []);

  const t = translations[language] || translations.en;
  const langMeta = languages.find((l) => l.code === language);
  const dir = langMeta?.dir || "ltr";
  const languageLabel = langMeta?.label || "English";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, languageLabel }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
