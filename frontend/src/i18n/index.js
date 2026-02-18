import { createI18n } from "vue-i18n";
// import en from "./locales/en.json";
// import de from "./locales/de.json";
import { currentLang } from "./lang";

export const i18n = createI18n({
  legacy: false,
  locale: currentLang.value,
  fallbackLocale: "en",
  //   messages: {
  //     en,
  //     de,
  //   },
});
