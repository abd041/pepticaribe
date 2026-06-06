"use client";

import type { Language } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`lux-lang-toggle flex items-center ${className}`}>
      <span className="sr-only">{t("common.language")}</span>
      {(["en", "es"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`lux-lang-toggle-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
            language === lang ? "lux-lang-toggle-btn--active" : ""
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
