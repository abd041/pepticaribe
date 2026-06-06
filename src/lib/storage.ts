import type { Language } from "@/data/translations";

const LANGUAGE_KEY = "pepticaribe_language";

/** Cookie name — readable on the server in layout.tsx and server actions */
export const VERIFICATION_COOKIE = "pepticaribe_verified";
export const LANGUAGE_COOKIE = "pepticaribe_language";

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(LANGUAGE_KEY);
  return stored === "es" ? "es" : "en";
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANGUAGE_KEY, language);
  document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=${365 * 86400}; SameSite=Lax`;
}

export function parseLanguageCookie(value: string | undefined): Language {
  return value === "es" ? "es" : "en";
}
