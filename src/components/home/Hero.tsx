"use client";

import Link from "next/link";
import { ArrowRight, Check, FlaskConical, Microscope, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroShowcase } from "./hero/HeroShowcase";

export function Hero() {
  const { t } = useLanguage();

  const trustBadges = [
    { icon: FlaskConical, label: t("hero.badgePurity") },
    { icon: Microscope, label: t("hero.badgeLabTested") },
    { icon: ShieldCheck, label: t("hero.badgeControlled") },
  ] as const;

  const mobileTrustItems = [
    t("hero.mobileTrustIso"),
    t("hero.mobileTrustCoa"),
    t("hero.mobileTrustRuo"),
  ] as const;

  return (
    <section className="ref-hero-section concept-hero ref-hero hero-cinematic art-chapter-research relative overflow-hidden bg-transparent">
      <div className="concept-hero-shell relative flex min-h-0 flex-1 flex-col">
        <HeroBackground />

        <div className="ref-hero-layout concept-hero-grid ref-hero-grid relative z-[2] flex w-full min-h-0 flex-1 flex-col lg:flex-row lg:items-center">
          <div className="ref-hero-copy-col order-2 flex w-full min-w-0 justify-center px-4 py-4 sm:px-6 sm:py-5 lg:order-1 lg:w-[50vw] lg:max-w-[50vw] lg:flex-[0_0_50vw] lg:justify-start lg:pl-8 lg:pr-6 lg:py-3 xl:pl-12">
            <div className="ref-hero-copy concept-hero-copy art-hero-copy relative flex w-full max-w-[24rem] flex-col items-center text-center lg:max-w-[28rem] lg:items-start lg:text-left">
              <h1 className="hero-headline font-display lux-hero-animate lux-hero-animate-headline mt-0 max-w-none">
                <span className="hero-headline-primary block text-[var(--soft-ivory)]">
                  {t("hero.headlinePremium")}
                </span>
                <span className="mt-1 block font-semibold text-[var(--ocean-blue)]">
                  {t("hero.headlinePeptides")}
                </span>
                <span className="block font-semibold text-[var(--soft-ivory)]">
                  {t("hero.headlineElevated")}
                </span>
              </h1>

              <p className="hero-lead lux-hero-animate lux-hero-animate-lead mt-5 max-w-md sm:mt-7 lg:mt-8">
                {t("hero.subcopy")}
              </p>

              <div className="ref-hero-ctas concept-hero-ctas lux-hero-animate lux-hero-animate-cta mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:mt-11 lg:justify-start">
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
              </div>

              <ul
                className="lux-mobile-trust-bar lux-hero-animate lux-hero-animate-badges lg:hidden"
                aria-label={t("hero.mobileTrustLabel")}
              >
                {mobileTrustItems.map((label) => (
                  <li key={label} className="lux-mobile-trust-item">
                    <span className="lux-mobile-trust-check" aria-hidden>
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <div className="ref-hero-badges concept-hero-badges ref-hero-badges lux-hero-animate lux-hero-animate-badges mt-8 hidden flex-col items-center gap-4 lg:flex lg:flex-nowrap lg:items-start lg:justify-start lg:gap-x-10 lg:gap-y-0 lg:mt-9">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="ref-hero-trust-badge concept-trust-badge ref-hero-badge flex shrink-0 items-center gap-2.5"
                  >
                    <div className="concept-trust-badge-icon ref-hero-trust-icon">
                      <badge.icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </div>
                    <span className="concept-trust-badge-label text-sm font-semibold text-[var(--soft-ivory)]">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ref-hero-showcase-wrap concept-hero-showcase-wrap order-1 flex w-full min-w-0 shrink-0 items-center justify-center max-lg:max-h-[min(52dvh,480px)] lg:order-2 lg:z-[1] lg:h-full lg:w-[50vw] lg:max-w-[50vw] lg:flex-[0_0_50vw]">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
