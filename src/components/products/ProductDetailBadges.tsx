"use client";

import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ProductDetailBadges() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-300">
        {t("common.researchUseOnly")}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
        <ShieldCheck className="h-3 w-3" aria-hidden />
        {t("products.coaAvailable")}
      </span>
    </div>
  );
}
