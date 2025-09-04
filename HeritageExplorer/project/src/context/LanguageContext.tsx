import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface LanguageContextType {
  currentLanguage: string;
  languages: Language[];
  changeLanguage: (code: string) => void;
}

const availableLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    // Get stored language preference or use browser language
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    } else {
      // Try to detect user's language
      const browserLang = navigator.language.split('-')[0];
      const isSupported = availableLanguages.some(lang => lang.code === browserLang);
      changeLanguage(isSupported ? browserLang : 'en');
    }
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setCurrentLanguage(code);
    localStorage.setItem('language', code);
    document.documentElement.lang = code;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languages: availableLanguages,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};