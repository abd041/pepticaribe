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

const TRUST_MARKS = [
  { icon: FlaskConical, label: "99%+ Purity" },
  { icon: ShieldCheck, label: "3rd Party Tested" },
  { icon: Beaker, label: "Research Use Only" },
] as const;

const SPEC_ICONS = [TestTube, FlaskConical, Box, Box, Snowflake, ShieldCheck] as const;

const SPECS = [
  { label: "Compound", key: "compound" as const },
  { label: "Purity", key: "purity" as const },
  { label: "Amount", key: "amount" as const },
  { label: "Form", key: "form" as const },
  { label: "Storage", key: "storage" as const },
  { label: "Use", key: "use" as const },
] as const;

type FeaturedCompoundProps = {
  product: Product;
};

export function FeaturedCompound({ product }: FeaturedCompoundProps) {
  const ref = useRef(null);
  const { t } = useLanguage();

  if (!product) return null;

  const defaultVariant = product.variants[0];
  const specValues = {
    compound: product.displayName,
    purity: "99%+",
    amount: defaultVariant?.sizeLabel ?? "—",
    form: "Lyophilized Powder",
    storage: "Refrigerate 2–8°C",
    use: "Research Use Only",
  };

  return (
    <section
      ref={ref}
      className="ref-featured-compound polish-featured-masterpiece qa-featured-section relative overflow-hidden border-y border-white/[0.05]"
    >
      <SectionAtmosphere variant="products" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-featured-grid polish-featured-grid art-featured-grid grid items-center gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.62fr)_minmax(0,0.72fr)] lg:gap-8 xl:gap-10">
            <div className="ref-featured-copy polish-featured-copy lux-featured-copy art-featured-copy">
              <p className="premium-eyebrow-gold polish-type-eyebrow font-display">
                {t("featured.compoundEyebrow")}
              </p>
              <h2 className="font-display ref-featured-title polish-featured-title polish-type-section-title mt-3 font-bold tracking-[-0.03em] text-[var(--soft-ivory)]">
                {product.displayName}
              </h2>
              <p className="mt-2 font-display text-lg font-medium text-[var(--ocean-blue)]">
                Body Protection Compound
              </p>
              <p className="section-caption mt-5 max-w-md text-[15px] leading-relaxed">
                {product.description.replace(/\s*Research Use Only\.?\s*$/i, "").trim()}
              </p>

              <ul className="ref-featured-trust-list mt-8">
                {TRUST_MARKS.map(({ icon: Icon, label }) => (
                  <li key={label} className="ref-featured-trust-mark polish-featured-trust-mark">
                    <Icon className="h-4 w-4 text-[var(--luxury-gold)]" strokeWidth={1.5} aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <Link
                href={`/products/${product.slug}`}
                className="btn-primary polish-cta-primary polish-featured-cta qa-featured-cta group mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
              >
                View Full Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <div className="ref-featured-showcase polish-featured-showcase art-featured-showcase relative mx-auto w-full">
              <div className="ref-featured-halo polish-featured-halo pointer-events-none absolute inset-0" aria-hidden />
              <div className="lux-featured-halo-ring lux-featured-halo-ring--outer lux-featured-halo-ring" aria-hidden />
              <div className="lux-featured-halo-ring lux-featured-halo-ring--mid" aria-hidden />
              <div className="lux-featured-halo-ring lux-featured-halo-ring--inner" aria-hidden />
              <div className="lux-featured-lab-spotlight pointer-events-none absolute inset-0" aria-hidden />
              <div className="lux-featured-lab-beam pointer-events-none absolute inset-0" aria-hidden />
              <div className="polish-featured-spotlight pointer-events-none absolute inset-0" aria-hidden />
              <div className="ref-featured-pedestal polish-featured-pedestal final8-featured-pedestal relative mx-auto h-[clamp(440px,54vw,680px)] w-full max-w-[540px]">
                <div className="ref-featured-pedestal-base absolute inset-x-[5%] bottom-[5%] z-10" aria-hidden />
                <div className="ref-featured-pedestal-glass absolute inset-x-[10%] bottom-[7%] z-[15] h-[clamp(32px,5.5vw,48px)] rounded-[100%]" aria-hidden />
                <div className="ref-featured-pedestal-ring final8-featured-ring absolute inset-x-[14%] bottom-[8.5%] z-20 h-[clamp(12px,2.2vw,16px)] rounded-[100%]" aria-hidden />
                <div className="final8-featured-reflection pointer-events-none absolute inset-x-[22%] bottom-[9%] z-[18] h-[clamp(24px,4vw,40px)] overflow-hidden" aria-hidden />
                <div className="final8-featured-contact-shadow pointer-events-none absolute inset-x-[18%] bottom-[10%] z-[19] h-3 rounded-[100%] blur-sm" aria-hidden />
                <div
                  className="lux-featured-vial-float absolute inset-x-0 bottom-[11%] top-0 z-30 flex items-end justify-center"
                  data-speed="0.9"
                >
                  <OptimizedImage
                    src={FEATURED_BPC_EXHIBIT.src}
                    alt={product.displayName}
                    width={FEATURED_BPC_EXHIBIT.width}
                    height={FEATURED_BPC_EXHIBIT.height}
                    sizes="(max-width: 1024px) 68vw, 420px"
                    className="ref-featured-vial polish-featured-vial lux-featured-vial h-auto max-h-[98%] w-auto max-w-[92%] object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="ref-spec-panel polish-spec-panel lux-featured-spec">
              <p className="premium-eyebrow-gold polish-type-eyebrow font-display">Scientific Specifications</p>
              <div className="polish-spec-divider" aria-hidden />
              <dl className="ref-spec-list polish-spec-list mt-5">
                {SPECS.map(({ label, key }, i) => {
                  const Icon = SPEC_ICONS[i] ?? FlaskConical;
                  return (
                    <div key={key} className="ref-spec-row polish-spec-row">
                      <dt className="polish-spec-label">
                        <Icon className="h-3.5 w-3.5 text-[var(--luxury-gold)]/70" strokeWidth={1.5} aria-hidden />
                        <span className="technical-label text-[10px] font-bold tracking-[0.14em]">
                          {label}
                        </span>
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
