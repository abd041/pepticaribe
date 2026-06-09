"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileCheck,
  FlaskConical,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPageContent } from "@/data/translations/aboutPageContent";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  verification: ShieldCheck,
  transparency: FileCheck,
  fulfillment: Truck,
  compliance: FlaskConical,
};

export function AboutPage() {
  const { language, t } = useLanguage();
  const { pillars, stats, missionTitle, missionBody } = getAboutPageContent(language);

  return (
    <div className="about-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="about-page-content">
          <section className="about-page-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="about-page-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="about-page-hero-copy mx-auto max-w-2xl text-center">
                  <p className="about-page-eyebrow">{t("about.eyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{t("about.title")}</span>
                  </h1>
                  <div
                    className="gold-accent-line qa-section-divider mx-auto mt-4 max-w-[12rem]"
                    aria-hidden
                  />
                  <p className="section-caption mx-auto mt-4 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {t("about.pageDescription")}
                  </p>
                </div>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="about-page-main" aria-label={t("about.title")}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <ul className="about-page-stats">
                {stats.map((stat) => (
                  <li key={stat.label} className="about-page-stat-card">
                    <p className="about-page-stat-value">{stat.value}</p>
                    <p className="about-page-stat-label">{stat.label}</p>
                  </li>
                ))}
              </ul>

              <div className="about-page-mission">
                <h2 className="about-page-mission-title">{missionTitle}</h2>
                <p className="about-page-mission-body">{missionBody}</p>
              </div>

              <div className="about-page-pillars">
                {pillars.map((pillar) => {
                  const Icon = PILLAR_ICONS[pillar.id] ?? ShieldCheck;
                  return (
                    <article key={pillar.id} className="about-page-pillar-card">
                      <span className="about-page-pillar-icon" aria-hidden>
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="about-page-pillar-title">{pillar.title}</h3>
                      <p className="about-page-pillar-desc">{pillar.description}</p>
                    </article>
                  );
                })}
              </div>

              <div className="about-page-cta-row">
                <Link href="/products" className="btn-primary about-page-cta">
                  {t("hero.ctaProducts")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <Link href="/coa" className="btn-outline-gold about-page-cta">
                  {t("hero.ctaCoa")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
