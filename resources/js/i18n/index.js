import i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import HttpBackend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import { initReactI18next } from 'react-i18next';
import { supportedLanguages } from "@/i18n/locales";

const supportedLngs = supportedLanguages.map(({ code }) => (code)) // Only support one language region.

i18next
  .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ["translations", "buttons", "sidebar", "table", "errors"],
    defaultNS: 'translations',
    supportedLngs: supportedLngs,
    debug: false,
    preload: supportedLngs,
    interpolation: {
      escapeValue: false
    },
    allowMultiLoading: false,
    backend: {
      backends: [
        LocalStorageBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 3 * 24 * 60 * 60 * 1000 // 3 days
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  })

export default i18next;
