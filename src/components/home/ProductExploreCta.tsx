"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function ProductExploreCta() {
  const { t } = useLanguage();

  return (
    <section className="ref-product-cta qa-product-cta-section relative overflow-hidden">
      <SectionAtmosphere variant="value" className="premium-section">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="lux-reveal mx-auto max-w-3xl text-center">
            <h2 className="font-display type-display-section polish-type-section-title">
              <span className="block text-[var(--soft-ivory)]">{t("productCta.titleLine1")}</span>
              <span className="mt-1 block text-[var(--ocean-blue)]">{t("productCta.titleLine2")}</span>
              <span className="block text-[var(--soft-ivory)]">{t("productCta.titleLine3")}</span>
            </h2>
            <p className="section-caption mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed">
              {t("productCta.description")}
            </p>
            <Link
              href="/products"
              className="btn-primary polish-cta-primary group mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
            >
              {t("productCta.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
