"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "@/data/translations/homeContent";

export function FAQPageContent() {
  const { language, t } = useLanguage();
  const { faqs } = getHomeContent(language);

  return (
    <div className="faq-page-content">
      <FaqAccordion items={faqs} idPrefix="faq-page" />
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/coa"
          className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.08em]"
        >
          {t("hero.ctaCoa")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        <Link
          href="/contact"
          className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.08em]"
        >
          {t("nav.contact")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
