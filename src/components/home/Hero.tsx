"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroShowcase } from "./hero/HeroShowcase";

export function Hero() {
  const { t } = useLanguage();

  const trustItems = [
    t("hero.trustIso"),
    t("hero.trustShipping"),
    t("hero.trustRuo"),
  ] as const;

  return (
    <section className="ref-hero-section concept-hero ref-hero hero-cinematic art-chapter-research relative overflow-hidden bg-transparent">
      <div className="concept-hero-shell relative flex min-h-0 flex-1 flex-col">
        <HeroBackground />

        <div className="ref-hero-layout concept-hero-grid ref-hero-grid relative z-[2] flex w-full min-h-0 flex-1 flex-col lg:flex-row lg:items-center">
          <div className="ref-hero-copy-col order-2 flex w-full min-w-0 justify-center px-4 py-4 sm:px-6 sm:py-5 lg:order-1 lg:w-[50vw] lg:max-w-[50vw] lg:flex-[0_0_50vw] lg:justify-start lg:pl-8 lg:pr-6 lg:py-3 xl:pl-12">
            <div className="ref-hero-copy concept-hero-copy art-hero-copy relative flex w-full max-w-[24rem] flex-col items-center text-center lg:max-w-[32rem] lg:items-start lg:text-left">
              <h1 className="hero-headline font-display lux-hero-animate lux-hero-animate-headline mt-0 max-w-none">
                <span className="hero-headline-primary block text-[var(--soft-ivory)]">
                  {t("hero.headlineLine1")}
                </span>
                <span className="mt-1 block font-semibold text-[var(--ocean-blue)]">
                  {t("hero.headlineLine2")}
                </span>
              </h1>

              <p className="hero-lead lux-hero-animate lux-hero-animate-lead mt-5 max-w-md sm:mt-7 lg:mt-8">
                {t("hero.subcopy")}
              </p>

              <div className="ref-hero-ctas concept-hero-ctas lux-hero-animate lux-hero-animate-cta mt-6 flex w-full flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3 lg:mt-11 lg:justify-start">
                <Link
                  href="/products"
                  className="ref-hero-cta-flagship btn-gold interaction-lift group inline-flex w-auto shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.1em] sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  {t("hero.ctaProducts")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/coa"
                  className="ref-hero-cta-coa btn-platinum polish-cta-secondary group inline-flex w-auto shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.08em]"
                >
                  {t("hero.ctaCoa")}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>

              <ul
                className="lux-mobile-trust-bar lux-hero-animate lux-hero-animate-badges mt-8 lg:mt-9"
                aria-label={t("hero.trustLabel")}
              >
                {trustItems.map((label) => (
                  <li key={label} className="lux-mobile-trust-item">
                    <span className="lux-mobile-trust-check" aria-hidden>
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ref-hero-showcase-wrap concept-hero-showcase-wrap order-1 flex w-full min-w-0 shrink-0 items-center justify-center lg:order-2 lg:z-[1] lg:h-full lg:w-[50vw] lg:max-w-[50vw] lg:flex-[0_0_50vw]">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
