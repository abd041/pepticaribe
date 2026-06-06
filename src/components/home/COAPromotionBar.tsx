"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function COAPromotionBar() {
  const { t } = useLanguage();

  return (
    <section className="ref-coa-promo polish-coa-promo qa-coa-section art-coa-section lux-reveal relative overflow-hidden">
      <div className="ref-coa-promo-bg absolute inset-0" aria-hidden />
      <div className="polish-coa-accent-line absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="ref-coa-promo-inner polish-coa-inner art-coa-vault qa-client-container relative mx-auto grid max-w-[90rem] items-center gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(200px,0.85fr)_1.25fr_auto] lg:gap-10 lg:px-8 lg:py-14">
        <div className="art-coa-document-anchor mx-auto lg:mx-0">
          <div className="art-coa-document-frame" data-speed="0.92">
            <div className="lux-coa-cert-preview art-coa-document" aria-hidden />
            <div className="lux-coa-embossed-seal art-coa-seal" aria-hidden />
          </div>
        </div>

        <div className="qa-coa-copy art-coa-copy text-center lg:text-left">
          <p className="premium-eyebrow-gold polish-type-eyebrow font-display">{t("coa.eyebrow")}</p>
          <h2 className="font-display ref-coa-promo-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
            {t("coa.title")}
          </h2>
          <p className="section-caption polish-type-lead mx-auto mt-4 max-w-2xl lg:mx-0">
            {t("coa.description")}
          </p>
        </div>

        <Link
          href="/coa"
          className="btn-platinum polish-cta-secondary qa-coa-cta group mx-auto inline-flex shrink-0 items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] lg:mx-0"
        >
          {t("coa.cta")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
