import { en } from "./en";
import { es } from "./es";
import type { Language, TranslationKey, TranslationSchema } from "./types";

export type { Language, TranslationKey, TranslationSchema };

export const translations: Record<Language, TranslationSchema> = {
  en,
  es,
};

export function getTranslation(language: Language, key: TranslationKey): string {
  const parts = key.split(".");
  let current: unknown = translations[language];

  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as object)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof current === "string" ? current : key;
}

export { en, es };
