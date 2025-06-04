
import { useLanguage } from "@/contexts/LanguageContext";
import enTranslations from "@/i18n/en.json";
import ptTranslations from "@/i18n/pt.json";
import esTranslations from "@/i18n/es.json";
import frTranslations from "@/i18n/fr.json";
import deTranslations from "@/i18n/de.json";
import itTranslations from "@/i18n/it.json";

const translations: Record<string, Record<string, string>> = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  it: itTranslations
};

// Log missing translations in development
const logMissingTranslation = (key: string, lang: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Missing translation for key "${key}" in language "${lang}"`);
  }
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string, params?: Record<string, string | number>) => {
    // Get translations for current language
    const langTranslations = translations[currentLanguage.code];
    
    // Check if the key exists in the current language
    let translation = langTranslations?.[key];
    
    // If not found in current language, fallback to English
    if (!translation && currentLanguage.code !== 'en') {
      translation = translations.en[key];
      
      // Log missing translation in development
      if (!translation) {
        logMissingTranslation(key, currentLanguage.code);
      }
    }
    
    // Final fallback is to use the key itself
    if (!translation) {
      logMissingTranslation(key, 'en');
      translation = key;
    }
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return translation;
  };
  
  return { t };
};
