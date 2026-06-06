import { en } from "./en";
import { es } from "./es";
import type { TranslationKey, TranslationSchema } from "./types";

export type Language = "en" | "es";

export const translations: Record<Language, TranslationSchema> = {
  en,
  es,
};

export type { TranslationKey, TranslationSchema };

export function getTranslation(
  language: Language,
  key: TranslationKey
): string {
  const [section, field] = key.split(".") as [
    keyof TranslationSchema,
    string,
  ];
  const tree = translations[language][section] as Record<string, string>;
  return tree[field] ?? key;
}

export { en, es };
