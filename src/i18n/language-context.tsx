"use client";

import * as React from "react";
import type { Language, Dictionary } from "./types";
import { enDictionary } from "./dictionaries/en";
import { bnDictionary } from "./dictionaries/bn";

const STORAGE_KEY = "school_language";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dict: Dictionary;
  formatNumber: (value: number | string) => string;
  isBangla: boolean;
  isEnglish: boolean;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const dictionaries: Record<Language, Dictionary> = {
  en: enDictionary,
  bn: bnDictionary,
};

const BN_NUMERALS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const EN_NUMERALS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Format numbers according to current language
 */
export function formatLocalizedNumber(value: number | string, lang: Language): string {
  const str = String(value);
  if (lang === "bn") {
    return str.replace(/[0-9]/g, (match) => BN_NUMERALS[parseInt(match, 10)] ?? match);
  } else {
    return str.replace(/[০-৯]/g, (match) => {
      const idx = BN_NUMERALS.indexOf(match);
      return idx !== -1 ? EN_NUMERALS[idx] : match;
    });
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredLanguage(): Language {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "bn" || val === "en") return val;
  } catch {
    // Ignore storage errors
  }
  return "en";
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const storedLang = React.useSyncExternalStore(subscribe, getStoredLanguage, getServerSnapshot);
  const [currentLang, setCurrentLang] = React.useState<Language | null>(null);

  // Active language: state if set, else stored value, else default ('en')
  const language: Language = currentLang ?? storedLang ?? defaultLanguage;

  const setLanguage = React.useCallback((newLang: Language) => {
    setCurrentLang(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLang;
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    setLanguage(language === "en" ? "bn" : "en");
  }, [language, setLanguage]);

  // Keep html lang attribute in sync
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const dict = React.useMemo(() => dictionaries[language], [language]);

  const formatNumber = React.useCallback(
    (value: number | string) => formatLocalizedNumber(value, language),
    [language]
  );

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      dict,
      formatNumber,
      isBangla: language === "bn",
      isEnglish: language === "en",
    }),
    [language, setLanguage, toggleLanguage, dict, formatNumber]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const useTranslation = useLanguage;

