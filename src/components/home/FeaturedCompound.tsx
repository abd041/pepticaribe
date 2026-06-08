"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Beaker,
  Box,
  FlaskConical,
  ShieldCheck,
  Snowflake,
  TestTube,
} from "lucide-react";
import type { Product } from "@/types/product";
import { FEATURED_BPC_EXHIBIT } from "@/lib/productImagery";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";

const SPEC_ICONS = [TestTube, FlaskConical, Box, Snowflake, ShieldCheck] as const;

type FeaturedCompoundProps = {
  product: Product;
};

export function FeaturedCompound({ product }: FeaturedCompoundProps) {
  const ref = useRef(null);
  const { t } = useLanguage();

  if (!product) return null;

  const trustMarks = [
    { icon: FlaskConical, label: t("featured.trustPurity") },
    { icon: ShieldCheck, label: t("featured.trustTested") },
    { icon: Beaker, label: t("featured.trustRuo") },
  ] as const;

  const specs = [
    { label: t("featured.specCompound"), key: "compound" as const },
    { label: t("featured.specPurity"), key: "purity" as const },
    { label: t("featured.specForm"), key: "form" as const },
    { label: t("featured.specStorage"), key: "storage" as const },
    { label: t("featured.specUse"), key: "use" as const },
  ] as const;

  const specValues = {
    compound: product.displayName,
    purity: "99%+",
    form: "Lyophilized Powder",
    storage: "Refrigerate 2–8°C",
    use: t("common.researchUseOnly"),
  };

  return (
    <section
      ref={ref}
      className="ref-featured-compound polish-featured-masterpiece qa-featured-section relative overflow-hidden border-y border-white/[0.05]"
    >
      <SectionAtmosphere variant="products" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-featured-grid polish-featured-grid art-featured-grid grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)_minmax(0,0.75fr)] lg:gap-8 xl:gap-10">
            <div className="ref-featured-copy polish-featured-copy lux-featured-copy art-featured-copy text-legibility-column mx-auto flex w-full max-w-2xl flex-col justify-center text-center lg:mx-0 lg:max-w-[34rem] lg:text-left">
              <p className="premium-eyebrow-gold polish-type-eyebrow">
                {t("featured.compoundEyebrow")}
              </p>
              <h2 className="font-display ref-featured-title polish-featured-title polish-type-section-title mt-3 font-bold tracking-[-0.03em] text-[var(--soft-ivory)]">
                {product.displayName}
              </h2>
              <p className="mt-2 font-display text-lg font-medium text-[var(--ocean-blue)]">
                {t("featured.compoundSubtitle")}
              </p>
              <p className="section-caption mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed lg:mx-0 lg:max-w-none">
                {product.description.replace(/\s*Research Use Only\.?\s*$/i, "").trim()}
              </p>

              <ul className="ref-featured-trust-list mt-8 justify-center lg:justify-start">
                {trustMarks.map(({ icon: Icon, label }) => (
                  <li key={label} className="ref-featured-trust-mark polish-featured-trust-mark">
                    <Icon className="h-4 w-4 text-[var(--luxury-gold)]" strokeWidth={1.5} aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="ref-featured-actions mt-10">
                <div className="ref-featured-cta-row">
                  <Link
                    href="/coa"
                    className="ref-featured-cta-secondary btn-platinum group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[0.625rem] font-bold uppercase tracking-[0.08em] sm:px-5 sm:text-xs"
                  >
                    {t("hero.ctaCoa")}
                  </Link>
                  <Link
                    href={`/products/${product.slug}`}
                    className="ref-featured-cta-secondary btn-platinum group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[0.625rem] font-bold uppercase tracking-[0.08em] sm:px-5 sm:text-xs"
                  >
                    {t("featured.viewFullDetails")}
                  </Link>
                </div>
                <Link
                  href="/products"
                  className="ref-featured-cta-primary btn-primary polish-cta-primary polish-featured-cta qa-featured-cta group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] sm:text-base"
                >
                  {t("hero.ctaProducts")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>

            <div className="ref-featured-showcase polish-featured-showcase art-featured-showcase relative mx-auto w-full">
              <div className="ref-featured-vial-stage relative mx-auto flex w-full max-w-[440px] items-end justify-center">
                <div className="lux-featured-float flex h-full w-full items-end justify-center">
                  <OptimizedImage
                    src={FEATURED_BPC_EXHIBIT.src}
                    alt={`${product.displayName} research vial on illuminated pedestal`}
                    width={FEATURED_BPC_EXHIBIT.width}
                    height={FEATURED_BPC_EXHIBIT.height}
                    sizes="(max-width: 1024px) 72vw, 440px"
                    className="ref-featured-vial polish-featured-vial lux-featured-vial h-auto w-auto max-w-[88%] object-contain object-bottom sm:max-w-[92%]"
                  />
                </div>
              </div>
            </div>

            <div className="ref-spec-panel polish-spec-panel lux-featured-spec text-legibility-column mx-auto w-full max-w-sm self-center lg:mx-0 lg:max-w-none">
              <p className="premium-eyebrow-gold polish-type-eyebrow text-center lg:text-left">
                {t("featured.scientificSpecs")}
              </p>
              <div className="polish-spec-divider" aria-hidden />
              <dl className="ref-spec-list polish-spec-list mt-5">
                {specs.map(({ label, key }, i) => {
                  const Icon = SPEC_ICONS[i] ?? FlaskConical;
                  return (
                    <div key={key} className="ref-spec-row polish-spec-row">
                      <dt className="polish-spec-label">
                        <Icon className="h-3.5 w-3.5 text-[var(--luxury-gold)]/70" strokeWidth={1.5} aria-hidden />
                        <span className="technical-label font-bold">{label}</span>
                      </dt>
                      <dd className="polish-spec-value">
                        {key === "purity" ? (
                          <span className="lux-purity-counter">
                            <span className="lux-purity-counter-value">99</span>%+
                          </span>
                        ) : (
                          specValues[key]
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
