"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Download,
  FileCheck,
  FlaskConical,
  ShieldCheck,
  Snowflake,
  TestTube,
  Truck,
} from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { ReferenceProductCard } from "@/components/ui/ReferenceProductCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { ProductDetailBadges } from "@/components/products/ProductDetailBadges";
import { ProductDetailMedia } from "@/components/products/ProductDetailMedia";
import { ProductVariantPicker } from "@/components/products/ProductVariantPicker";
import { useLanguage } from "@/context/LanguageContext";
import { resolveCoaPdfUrl } from "@/lib/coaLibrary";
import {
  getProductFormLabel,
  getProductStorageLabel,
  stripRuoSuffix,
} from "@/lib/productDetail";
import { resolveCompoundProfile } from "@/lib/productImagery";
import { formatUsd, hasMultipleVariants } from "@/lib/pricing";

const CATEGORY_I18N_KEY: Record<ProductCategory, string> = {
  peptide: "products.categoryPeptide",
  blend: "products.categoryBlend",
  accessory: "products.categoryAccessory",
  "small-molecule": "products.categorySmallMolecule",
};

const SPEC_ICONS = [TestTube, FlaskConical, Snowflake, ShieldCheck, Beaker] as const;

type ProductDetailPageProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const { t } = useLanguage();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? "");

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0],
    [product.variants, selectedVariantId],
  );

  const profile = resolveCompoundProfile(product.slug, product.image, product.category);
  const multipleSizes = hasMultipleVariants(product);
  const displayPrice = selectedVariant?.price ?? 0;
  const latestBatch = product.coaBatches.find((b) => b.isLatest) ?? product.coaBatches[0];
  const panelSummary =
    product.shortDescription?.trim() ||
    profile.positioning ||
    stripRuoSuffix(product.description);

  const specs = [
    { label: t("featured.specCompound"), value: product.displayName, icon: SPEC_ICONS[0] },
    { label: t("featured.specPurity"), value: profile.snapshot.purity, icon: SPEC_ICONS[1] },
    {
      label: t("featured.specForm"),
      value: getProductFormLabel(product.category),
      icon: SPEC_ICONS[2],
    },
    {
      label: t("featured.specStorage"),
      value: getProductStorageLabel(product.category),
      icon: SPEC_ICONS[3],
    },
    { label: t("products.detailSku"), value: selectedVariant?.sku ?? product.sku, icon: SPEC_ICONS[4] },
  ] as const;

  const trustItems = [
    { icon: ShieldCheck, label: t("hero.trustIso") },
    { icon: FileCheck, label: t("common.coaIncluded") },
    { icon: Truck, label: t("hero.trustShipping") },
  ] as const;

  return (
    <div className="product-detail relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="product-detail-content">
          <section className="product-detail-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="bg-transparent pb-6 pt-8 sm:pb-8 sm:pt-10 lg:pb-10 lg:pt-12"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <Link
                  href="/products"
                  className="product-detail-back group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--ocean-blue)]"
                >
                  <ArrowLeft
                    className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                  {t("products.backToProducts")}
                </Link>

                <ul
                  className="products-catalog-trust product-detail-trust-inline mt-6 sm:mt-8"
                  aria-label={t("hero.trustLabel")}
                >
                  {trustItems.map(({ icon: Icon, label }) => (
                    <li key={label}>
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <div className="product-detail-grid mt-8 lg:mt-10">
                  <ProductDetailMedia
                    product={product}
                    profile={profile}
                    selectedVariant={selectedVariant}
                  />

                  <div className="product-detail-panel">
                    <p className="products-catalog-eyebrow">{t(CATEGORY_I18N_KEY[product.category])}</p>

                    <h1 className="product-detail-title font-display mt-3 font-bold text-[var(--soft-ivory)]">
                      {product.displayName}
                    </h1>

                    <div className="gold-accent-line product-detail-divider mt-5" aria-hidden />

                    {panelSummary ? (
                      <p className="section-caption mt-5 max-w-xl text-[15px] leading-relaxed">
                        {panelSummary}
                      </p>
                    ) : null}

                    <ProductDetailBadges featured={product.featured} />

                    <div className="product-detail-price-block mt-8">
                      <p className="font-display text-3xl font-bold text-[var(--luxury-gold)] sm:text-4xl">
                        {formatUsd(displayPrice)}
                      </p>
                      {selectedVariant ? (
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                          {multipleSizes
                            ? `${t("products.sizeLabel")}: ${selectedVariant.sizeLabel}`
                            : selectedVariant.sizeLabel}
                        </p>
                      ) : null}
                    </div>

                    {multipleSizes ? (
                      <ProductVariantPicker
                        product={product}
                        selectedId={selectedVariantId}
                        onSelect={setSelectedVariantId}
                      />
                    ) : (
                      <p className="product-detail-single-size mt-6 text-sm text-[var(--text-muted)]">
                        <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                          {t("products.sizeLabel")}:{" "}
                        </span>
                        {selectedVariant?.sizeLabel ?? "—"}
                      </p>
                    )}

                    <ProductDetailActions product={product} selectedVariantId={selectedVariantId} />
                  </div>
                </div>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="product-detail-specs">
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <div className="product-detail-section-head">
                <p className="products-catalog-eyebrow">{t("products.detailSpecsEyebrow")}</p>
                <h2 className="font-display mt-2 text-2xl font-bold text-[var(--soft-ivory)] sm:text-3xl">
                  {t("featured.scientificSpecs")}
                </h2>
                <div className="gold-accent-line product-detail-divider mt-5" aria-hidden />
              </div>

              <div className="product-detail-spec-grid">
                {specs.map(({ label, value, icon: Icon }) => (
                  <article key={label} className="product-detail-spec-card">
                    <Icon className="h-4 w-4 text-[var(--luxury-gold)]" strokeWidth={1.5} aria-hidden />
                    <p className="product-detail-spec-label">{label}</p>
                    <p className="product-detail-spec-value">{value}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="product-detail-overview">
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <div className="product-detail-overview-card">
                <p className="products-catalog-eyebrow">{t("products.detailOverviewEyebrow")}</p>
                <h2 className="font-display mt-2 text-2xl font-bold text-[var(--soft-ivory)]">
                  {t("products.detailOverviewTitle")}
                </h2>
                <div className="gold-accent-line product-detail-divider mt-5" aria-hidden />
                <p className="section-caption mt-5 max-w-3xl text-[15px] leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </section>

          {latestBatch ? (
            <section className="product-detail-coa">
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="product-detail-coa-card">
                  <div className="product-detail-coa-copy">
                    <p className="products-catalog-eyebrow">{t("coa.eyebrow")}</p>
                    <h2 className="font-display mt-2 text-2xl font-bold text-[var(--soft-ivory)] sm:text-3xl">
                      {t("products.detailCoaTitle")}
                    </h2>
                    <p className="section-caption mt-4 max-w-xl text-[15px] leading-relaxed">
                      {t("products.detailCoaDescription")}
                    </p>

                    <dl className="product-detail-coa-meta">
                      <div>
                        <dt>{t("products.detailLot")}</dt>
                        <dd>{latestBatch.lotNumber}</dd>
                      </div>
                      <div>
                        <dt>{t("featured.specPurity")}</dt>
                        <dd>{latestBatch.purityPercent}%+</dd>
                      </div>
                      <div>
                        <dt>{t("products.detailLab")}</dt>
                        <dd>{latestBatch.labName}</dd>
                      </div>
                    </dl>

                    <div className="product-detail-coa-actions">
                      <a
                        href={resolveCoaPdfUrl(latestBatch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-detail-coa-download"
                      >
                        <Download className="h-4 w-4" aria-hidden />
                        {t("products.detailDownloadCoa")}
                      </a>
                      <Link href="/coa" className="qa-cta-text group inline-flex items-center gap-2">
                        {t("products.viewCoaLibrary")}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="product-detail-coa-seal">
                    <ShieldCheck
                      className="h-10 w-10 text-[var(--luxury-gold)]"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <p>{profile.snapshot.verification}</p>
                    <p className="product-detail-coa-seal-sub">{t("products.coaAvailable")}</p>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {product.bundles.length > 0 ? (
            <section className="product-detail-bundles">
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <p className="products-catalog-eyebrow">{t("products.detailBundleEyebrow")}</p>
                <h2 className="font-display mt-2 text-2xl font-bold text-[var(--soft-ivory)]">
                  {t("products.detailBundleTitle")}
                </h2>
                <div className="gold-accent-line product-detail-divider mt-5" aria-hidden />
                <ul className="product-detail-bundle-grid">
                  {product.bundles.map((bundle) => (
                    <li key={bundle.quantity} className="product-detail-bundle-card">
                      <span className="product-detail-bundle-qty">{bundle.quantity}+</span>
                      <span className="product-detail-bundle-save">
                        {bundle.discountPercent}% {t("products.detailBundleOff")}
                      </span>
                      {bundle.label ? (
                        <span className="product-detail-bundle-label">{bundle.label}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {relatedProducts.length > 0 ? (
            <section className="product-detail-related ref-best-sellers art-products-section">
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
                <div className="product-detail-section-head">
                  <p className="products-catalog-eyebrow">{t("products.detailRelatedEyebrow")}</p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-[var(--soft-ivory)] sm:text-3xl">
                    {t("products.detailRelatedTitle")}
                  </h2>
                  <div className="gold-accent-line product-detail-divider mt-5" aria-hidden />
                </div>

                <div className="ref-product-grid qa-product-grid products-catalog-grid product-detail-related-grid">
                  {relatedProducts.map((item, index) => (
                    <ReferenceProductCard
                      key={item.id}
                      product={item}
                      index={index}
                      showCategoryLabel
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
