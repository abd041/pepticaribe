"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck, Truck } from "lucide-react";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroShowcase } from "./hero/HeroShowcase";

const HERO_SUBCOPY =
  "Premium research compounds with verified purity, backed by third-party testing and transparency.";

const TRUST_BADGES = [
  { icon: FlaskConical, label: "99%+ Purity", sublabel: "Lab Verified" },
  { icon: Truck, label: "Fast & Discreet", sublabel: "Shipping" },
  { icon: ShieldCheck, label: "Tested & Verified", sublabel: "Every Batch" },
] as const;

export function Hero() {
  return (
    <section className="ref-hero-section concept-hero ref-hero hero-cinematic art-chapter-research relative overflow-hidden bg-transparent">
      <div className="concept-hero-shell relative flex min-h-0 flex-1 flex-col">
        <HeroBackground />

        <div className="ref-hero-grid concept-hero-grid ref-hero-grid relative z-[2] mx-auto grid w-full max-w-[90rem] flex-1 grid-cols-1 items-center gap-6 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-3 xl:gap-16">
          <div className="ref-hero-copy-col flex w-full justify-center lg:justify-start">
            <div className="ref-hero-copy concept-hero-copy art-hero-copy relative flex max-w-[24rem] flex-col items-center text-center lg:max-w-[27rem] lg:items-start lg:text-left">
              <p className="ref-hero-eyebrow concept-hero-eyebrow premium-eyebrow-gold font-display lux-hero-animate lux-hero-animate-eyebrow">
                Research-Grade Peptides
              </p>

              <h1 className="ref-hero-headline concept-hero-headline font-display premium-heading-hero ref-hero-headline lux-hero-animate lux-hero-animate-headline mt-5 max-w-none">
                Research{" "}
                <span className="concept-hero-headline-accent text-[var(--ocean-blue)]">
                  Peptides
                </span>
                <span className="mt-1 block font-semibold text-[var(--soft-ivory)]">
                  You Can Trust
                </span>
              </h1>

              <p className="ref-hero-lead concept-hero-lead section-caption lux-hero-animate lux-hero-animate-lead mt-7 max-w-md lg:mt-8">
                {HERO_SUBCOPY}
              </p>

              <div className="ref-hero-ctas concept-hero-ctas lux-hero-animate lux-hero-animate-cta mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:mt-11 lg:justify-start">
                <Link
                  href="/products"
                  className="ref-hero-cta-primary concept-hero-cta-primary btn-primary interaction-lift group inline-flex min-h-[2.875rem] flex-1 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] sm:flex-none"
                >
                  View Products
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/coa"
                  className="ref-hero-cta-secondary concept-hero-cta-secondary btn-outline-gold group inline-flex min-h-[2.875rem] flex-1 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] sm:flex-none"
                >
                  View COA Library
                </Link>
              </div>

              <div className="ref-hero-badges concept-hero-badges ref-hero-badges lux-hero-animate lux-hero-animate-badges mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:mt-9 lg:flex-nowrap lg:items-start lg:justify-start lg:gap-x-10 lg:gap-y-0">
                {TRUST_BADGES.map((badge) => (
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
                      <span className="concept-trust-badge-sublabel block text-[11px] text-[var(--soft-ivory)]/45">
                        {badge.sublabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden min-h-0 lg:block" aria-hidden />
        </div>

        <div className="ref-hero-showcase-wrap concept-hero-showcase-wrap pointer-events-none max-lg:shrink-0 lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-0 lg:z-[1] lg:w-1/2">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
