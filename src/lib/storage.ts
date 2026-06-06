import type { Language } from "@/data/translations";

const VERIFICATION_KEY = "pepticaribe_research_verified";
const LANGUAGE_KEY = "pepticaribe_language";

/** Cookie name — readable on the server in layout.tsx */
export const VERIFICATION_COOKIE = "pepticaribe_verified";
export const LANGUAGE_COOKIE = "pepticaribe_language";

const VERIFICATION_MAX_AGE_DAYS = 30;

export function isVerified(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(VERIFICATION_KEY) === "true";
}

export function setVerified(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VERIFICATION_KEY, "true");
  localStorage.setItem(`${VERIFICATION_KEY}_at`, new Date().toISOString());
  document.cookie = `${VERIFICATION_COOKIE}=1; path=/; max-age=${VERIFICATION_MAX_AGE_DAYS * 86400}; SameSite=Lax`;
}

export function clearVerification(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(VERIFICATION_KEY);
  localStorage.removeItem(`${VERIFICATION_KEY}_at`);
  document.cookie = `${VERIFICATION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

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
