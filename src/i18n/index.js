import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";
import Backend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";
import translationUz from "../../public/locales/uz/translation.json"
import translationRu from "../../public/locales/ru/translation.json"

const resources = {
  "uz": {
    translation: translationUz
  },
  "ru": {
    translation: translationRu
  },
}

i18n.use(Backend).use(languageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "ru",
  debug: false,
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;