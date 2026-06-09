"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { getHomeFaqs } from "@/data/translations/homeContent";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function ReviewsFAQ() {
  const { language, t } = useLanguage();
  const previewFaqs = useMemo(() => getHomeFaqs(language), [language]);

  return (
    <section className="ref-reviews-faq polish-reviews-faq final8-reviews-faq qa-reviews-section relative overflow-hidden">
      <SectionAtmosphere variant="value" className="premium-section-lg">
        <div className="qa-client-container relative z-[2] mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="faq-premium-section ref-faq-column polish-faq-column qa-faq-column lux-reveal">
            <div className="faq-premium-header qa-section-header qa-section-header-left mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <h2 className="font-display ref-faq-title polish-type-section-title font-bold text-[var(--soft-ivory)]">
                {t("faq.title")}
              </h2>
              <div
                className="gold-accent-line qa-section-divider qa-section-divider-left mx-auto lg:mx-0"
                aria-hidden
              />
            </div>

            <div className="faq-premium-accordion-col">
              <FaqAccordion items={previewFaqs} idPrefix="home-faq" />

              <Link
                href="/faq"
                className="btn-primary polish-cta-primary qa-faq-cta group mt-8 inline-flex w-fit items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
              >
                {t("faq.viewAll")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
