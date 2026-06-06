"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroShowcase } from "./hero/HeroShowcase";

export function Hero() {
  const { t } = useLanguage();

  const trustBadges = [
    {
      icon: FlaskConical,
      label: t("hero.badgePurityLabel"),
      sublabel: t("hero.badgePuritySub"),
    },
    {
      icon: Truck,
      label: t("hero.badgeShippingLabel"),
      sublabel: t("hero.badgeShippingSub"),
    },
    {
      icon: ShieldCheck,
      label: t("hero.badgeVerifiedLabel"),
      sublabel: t("hero.badgeVerifiedSub"),
    },
  ] as const;

  return (
    <section className="ref-hero-section concept-hero ref-hero hero-cinematic art-chapter-research relative overflow-hidden bg-transparent">
      <div className="concept-hero-shell relative flex min-h-0 flex-1 flex-col">
        <HeroBackground />

        <div className="ref-hero-layout concept-hero-grid ref-hero-grid relative z-[2] flex w-full min-h-0 flex-1 flex-col lg:flex-row lg:items-center">
          <div className="ref-hero-copy-col flex w-full min-w-0 justify-center px-4 py-4 sm:px-6 sm:py-5 lg:w-[50vw] lg:max-w-[50vw] lg:flex-[0_0_50vw] lg:justify-start lg:pl-8 lg:pr-6 lg:py-3 xl:pl-12">
            <div className="ref-hero-copy concept-hero-copy art-hero-copy relative flex w-full max-w-[24rem] flex-col items-center text-center lg:max-w-[28rem] lg:items-start lg:text-left">
              <p className="ref-hero-eyebrow concept-hero-eyebrow premium-eyebrow-gold lux-hero-animate lux-hero-animate-eyebrow">
                {t("hero.eyebrow")}
              </p>

              <h1 className="hero-headline font-display lux-hero-animate lux-hero-animate-headline mt-5 max-w-none">
                <span className="block">
                  {t("hero.headlineResearch")}{" "}
                  <span className="concept-hero-headline-accent text-[var(--ocean-blue)]">
                    {t("hero.headlinePeptides")}
                  </span>
                </span>
                <span className="mt-1 block font-semibold text-[var(--soft-ivory)]">
                  {t("hero.headlineYouCan")}
                </span>
                <span className="block font-semibold text-[var(--soft-ivory)]">
                  {t("hero.headlineTrust")}
                </span>
              </h1>

              <p className="hero-lead lux-hero-animate lux-hero-animate-lead mt-7 max-w-md lg:mt-8">
                {t("hero.subcopy")}
              </p>

              <div className="ref-hero-ctas concept-hero-ctas lux-hero-animate lux-hero-animate-cta mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:mt-11 lg:justify-start">
                <Link
                  href="/products"
                  className="ref-hero-cta-primary concept-hero-cta-primary btn-primary interaction-lift group inline-flex min-h-[2.875rem] flex-1 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] sm:flex-none"
                >
                  {t("hero.ctaProducts")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/coa"
                  className="ref-hero-cta-secondary concept-hero-cta-secondary btn-outline-gold group inline-flex min-h-[2.875rem] flex-1 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-[0.02em] sm:flex-none"
                >
                  {t("hero.ctaCoa")}
                </Link>
              </div>

              <div className="ref-hero-badges concept-hero-badges ref-hero-badges lux-hero-animate lux-hero-animate-badges mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:mt-9 lg:flex-nowrap lg:items-start lg:justify-start lg:gap-x-10 lg:gap-y-0">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="ref-hero-trust-badge concept-trust-badge ref-hero-badge flex shrink-0 items-center gap-2.5"
                  >
                    <div className="concept-trust-badge-icon ref-hero-trust-icon">
                      <badge.icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div className="concept-trust-badge-copy text-left">
                      <span className="concept-trust-badge-label block font-semibold text-[var(--soft-ivory)]">
                        {badge.label}
                      </span>
                      <span className="concept-trust-badge-sublabel block text-xs text-[var(--text-muted)]">
                        {badge.sublabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ref-hero-showcase-wrap concept-hero-showcase-wrap flex w-full min-w-0 shrink-0 items-center justify-center max-lg:max-h-[min(52dvh,480px)] lg:z-[1] lg:h-full lg:w-[50vw] lg:max-w-[50vw] lg:flex-[0_0_50vw]">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
