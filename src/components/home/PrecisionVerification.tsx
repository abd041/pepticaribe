"use client";

import Link from "next/link";
import { ArrowRight, Beaker, FileCheck2, ShieldCheck, TestTube } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function PrecisionVerification() {
  const { t } = useLanguage();

  const items = [
    { icon: TestTube, title: t("precision.synthesisTitle"), description: t("precision.synthesisDesc") },
    { icon: Beaker, title: t("precision.testingTitle"), description: t("precision.testingDesc") },
    { icon: FileCheck2, title: t("precision.coaTitle"), description: t("precision.coaDesc") },
    { icon: ShieldCheck, title: t("precision.complianceTitle"), description: t("precision.complianceDesc") },
  ] as const;

  return (
    <section className="ref-precision-section qa-precision-section relative overflow-hidden border-y border-white/[0.05]">
      <SectionAtmosphere variant="value" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="qa-section-header mx-auto max-w-3xl text-center lux-reveal">
            <h2 className="font-display type-display-section polish-type-section-title">
              <span className="block text-[var(--soft-ivory)]">{t("precision.titleLine1")}</span>
              <span className="mt-2 block text-[var(--soft-ivory)]/90">
                {t("precision.titleLine2")}{" "}
                <span className="text-[var(--ocean-blue)]">{t("precision.titleLine3")}</span>
              </span>
            </h2>
            <div className="gold-accent-line qa-section-divider mx-auto" aria-hidden />
          </div>

          <div className="ref-precision-grid mt-10 grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6 xl:gap-8 lux-stagger-group">
            {items.map((item) => (
              <article
                key={item.title}
                className="ref-trust-card polish-trust-card qa-trust-card lux-stagger-item rounded-[var(--radius-premium)] p-4 text-center sm:p-6"
              >
                <div className="ref-trust-icon-well">
                  <item.icon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                </div>
                <h3 className="ref-trust-title polish-type-trust-card-title font-display mt-5">
                  {item.title}
                </h3>
                <p className="ref-trust-desc polish-type-trust-card-desc section-caption mt-3">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center lux-reveal">
            <Link
              href="/coa"
              className="btn-outline-gold group inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.08em]"
            >
              {t("coa.cta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
