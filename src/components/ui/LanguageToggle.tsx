"use client";

import type { Language } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="sr-only">{t("common.language")}</span>
      {(["en", "es"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
            language === lang
              ? "bg-teal-500 text-white shadow-sm shadow-teal-500/25"
              : "text-white/45 hover:bg-white/5 hover:text-white/75"
          }`}
          aria-pressed={language === lang}
          aria-label={lang === "en" ? t("common.english") : t("common.spanish")}
        >
          {lang === "en" ? "EN" : "ES"}
        </button>
      ))}
    </div>
  );
}
