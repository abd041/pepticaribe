"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { LuxuryStatValue } from "@/components/ui/LuxuryStatValue";

export function QualityVerification() {
  const { t } = useLanguage();

  const stats = [
    { value: t("qualityStats.purityValue"), label: t("qualityStats.purityLabel") },
    { value: t("qualityStats.checksValue"), label: t("qualityStats.checksLabel") },
    { value: t("qualityStats.verifiedValue"), label: t("qualityStats.verifiedLabel") },
  ] as const;

  return (
    <section className="ref-quality-stats qa-quality-section relative overflow-hidden border-y border-white/[0.05]">
      <SectionAtmosphere variant="products" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center lux-reveal">
            <h2 className="font-display type-display-section polish-type-section-title text-[var(--soft-ivory)]">
              {t("qualityStats.title")}
            </h2>
            <p className="section-caption mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed">
              {t("qualityStats.description")}
            </p>
            <div className="gold-accent-line qa-section-divider mx-auto mt-6" aria-hidden />
          </div>

          <div className="ref-quality-stats-grid mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 lux-stagger-group">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="ref-trust-card polish-trust-card lux-stat-authority-card lux-stagger-item rounded-[var(--radius-premium)] p-3 text-center sm:p-6 lg:p-8"
              >
                <p className="font-display lux-stat-value lux-stat-metric">
                  <LuxuryStatValue value={stat.value} />
                </p>
                <p className="lux-stat-label mt-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--soft-ivory)] sm:mt-3">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
