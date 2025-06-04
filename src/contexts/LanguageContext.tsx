
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = {
  code: string;
  name: string;
};

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  languages: Language[];
};

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
  languages: languages,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem("hire-at-language");
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      return lang || languages[0];
    }
    
    // Try to get from browser settings
    const browserLang = navigator.language.split('-')[0];
    const lang = languages.find(l => l.code === browserLang);
    return lang || languages[0];
  });

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("hire-at-language", lang.code);
    document.documentElement.lang = lang.code;
    
    // Here we would load the translations for the selected language
    // This would be a call to a translation service or loading a JSON file
    console.log(`Language changed to ${lang.name}`);
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        languages
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
