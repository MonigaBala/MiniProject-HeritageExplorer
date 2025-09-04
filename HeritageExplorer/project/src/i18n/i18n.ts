import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dynamically import all language JSON files
import enTranslation from './locales/en.json';
import taTranslation from './locales/ta.json';
import hiTranslation from './locales/hi.json';
import teTranslation from './locales/te.json'; // Add other languages as necessary
import mlTranslation from './locales/ml.json';
import knTranslation from './locales/kn.json';
import frTranslation from './locales/fr.json';
import deTranslation from './locales/de.json';

// Set up the resources for each language
const resources = {
  en: {
    translation: enTranslation
  },
  ta: {
    translation: taTranslation
  },
  hi: {
    translation: hiTranslation
  },
  te: {
    translation: teTranslation
  },
  ml: {
    translation: mlTranslation
  },
  kn: {
    translation: knTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
