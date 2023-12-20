import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

/*
const resources = {
  en: {
    translation: {
      a_pink_hairless_cat: "a pink hairless cat",
      bingus_is_typing: "Bingus is typing",
      send: "Send",
      speak_to_bingus: "Speak to Bingus",
    },
  },
  fr: {
    translation: {
      a_pink_hairless_cat: "un chat rose sans poils",
      bingus_is_typing: "Bingus écrit",
      send: "Envoyer",
      speak_to_bingus: "Parlez à Bingus",
    },
  },
};
*/

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "fr"],
    fallbackLng: "en",
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === "development",
  })
  .catch((e) => {
    throw new Error("Error initializing i18n: " + e);
  });

export default i18next;
