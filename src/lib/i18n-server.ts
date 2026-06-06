import { cookies } from "next/headers";
import { getTranslation, type Language, type TranslationKey } from "@/data/translations";
import { LANGUAGE_COOKIE, parseLanguageCookie } from "@/lib/storage";

export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  return parseLanguageCookie(cookieStore.get(LANGUAGE_COOKIE)?.value);
}

export async function getServerT(key: TranslationKey): Promise<string> {
  const language = await getServerLanguage();
  return getTranslation(language, key);
}
