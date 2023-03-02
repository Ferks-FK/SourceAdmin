import i18n from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const SupportedLanguages = [
    {
        name: "English",
        code: "en"
    },
    {
        name: "Portuguese",
        code: "pt"
    },
    {
        name: "Spanish",
        code: "es"
    }
]

i18n
  .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ["translations", "buttons", "sidebar"],
    defaultNS: 'translations',
    supportedLngs: SupportedLanguages.map(({ code }) => (code)), // Only support one language region.
    debug: true,
    interpolation: {
      escapeValue: false
    },
    allowMultiLoading: true
  })

export default i18n;
