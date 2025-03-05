import YukinaConfig from "../../yukina.config";
import type I18nKeys from "./keys";
import { en } from "./languages/en";
import { ja } from "./languages/ja";

export type Translation = {
  [K in I18nKeys]: string;
};

const map: { [key: string]: Translation } = {
  en: en,
  "ja": ja,
};

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] || en;
}

export function i18n(key: I18nKeys, ...interpolations: string[]): string {
  const lang = YukinaConfig.locale;
  let translation = getTranslation(lang)[key];
  interpolations.forEach((interpolation) => {
    translation = translation.replace("{{}}", interpolation);
  });
  return translation;
}
