"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COACardMarquee } from "@/components/coa/COACardMarquee";
import { COASamplePreview } from "@/components/coa/COASamplePreview";
import { useLanguage } from "@/context/LanguageContext";

export function COAPromotionBar() {
  const { t } = useLanguage();

  return (
    <section className="ref-coa-showcase ref-coa-promo polish-coa-promo qa-coa-section art-coa-section relative overflow-x-clip">
      <div className="ref-coa-promo-bg absolute inset-0" aria-hidden />
      <div className="polish-coa-accent-line absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="ref-coa-showcase-inner ref-coa-promo-inner polish-coa-inner qa-client-container relative mx-auto max-w-[90rem] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="art-coa-copy qa-coa-copy text-legibility-column mx-auto max-w-3xl text-center">
          <p className="premium-eyebrow-gold polish-type-eyebrow">{t("coa.eyebrow")}</p>
          <h2 className="font-display ref-coa-promo-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
            {t("coa.title")}
          </h2>
          <p className="section-caption polish-type-lead mx-auto mt-4 max-w-2xl">
            {t("coa.description")}
          </p>
        </div>

        <div className="ref-coa-showcase-vault mx-auto mt-10 w-full max-w-3xl lg:mt-12 lg:max-w-4xl">
          <COASamplePreview variant="showcase" />
        </div>

        <div className="coa-marquee-wrap mt-10 lg:mt-12">
          <COACardMarquee />
        </div>

        <ul className="lux-coa-trust-strip art-coa-trust-strip mt-8" aria-label={t("coa.trustStripLabel")}>
          <li className="lux-coa-trust-chip">
            <span className="lux-coa-trust-chip-dot" aria-hidden />
            {t("coa.trustHplc")}
          </li>
          <li className="lux-coa-trust-chip">
            <span className="lux-coa-trust-chip-dot" aria-hidden />
            {t("coa.trustMassSpec")}
          </li>
          <li className="lux-coa-trust-chip">
            <span className="lux-coa-trust-chip-dot" aria-hidden />
            {t("coa.trustIso")}
          </li>
        </ul>

        <div className="mt-8 flex justify-center">
          <Link
            href="/coa"
            className="btn-platinum polish-cta-secondary qa-coa-cta group inline-flex shrink-0 items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
          >
            {t("coa.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
