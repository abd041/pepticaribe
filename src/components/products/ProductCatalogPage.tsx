"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { ReferenceProductCard } from "@/components/ui/ReferenceProductCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { useLanguage } from "@/context/LanguageContext";

type CategoryFilter = ProductCategory | "all";

const CATEGORY_ORDER: CategoryFilter[] = [
  "all",
  "peptide",
  "blend",
  "small-molecule",
  "accessory",
];

interface ProductCatalogPageProps {
  products: Product[];
}

export function ProductCatalogPage({ products }: ProductCatalogPageProps) {
  const { t } = useLanguage();
  const [category, setCategory] = useState<CategoryFilter>("all");

  const categoryLabel = (key: CategoryFilter) => {
    if (key === "all") return t("products.categoryAll");
    const map: Record<ProductCategory, string> = {
      peptide: t("products.categoryPeptide"),
      blend: t("products.categoryBlend"),
      accessory: t("products.categoryAccessory"),
      "small-molecule": t("products.categorySmallMolecule"),
    };
    return map[key];
  };

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter((product) => product.category === category);
  }, [products, category]);

  return (
    <div className="products-catalog relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="products-catalog-content">
          <section className="products-catalog-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="products-catalog-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="products-catalog-hero-copy mx-auto max-w-2xl text-center">
                  <p className="products-catalog-eyebrow">{t("products.catalogEyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{t("products.catalogTitle")}</span>
                  </h1>
                  <p className="section-caption mx-auto mt-3 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {t("products.catalogDescription")}
                  </p>
                </div>

                <ul
                  className="products-catalog-trust products-catalog-trust--compact"
                  aria-label={t("hero.trustLabel")}
                >
                  <li>
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span>{t("hero.trustIso")}</span>
                  </li>
                  <li>
                    <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span>{t("hero.trustShipping")}</span>
                  </li>
                </ul>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="products-catalog-main" aria-label={t("products.catalogTitle")}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
              <div
                className="products-catalog-categories products-catalog-categories--bar"
                role="tablist"
                aria-label={t("products.filterByCategory")}
              >
                {CATEGORY_ORDER.map((key) => {
                  const active = category === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`products-catalog-chip${active ? " is-active" : ""}`}
                      onClick={() => setCategory(key)}
                    >
                      {categoryLabel(key)}
                    </button>
                  );
                })}
              </div>

              {filtered.length > 0 ? (
                <div className="ref-product-grid qa-product-grid products-catalog-grid">
                  {filtered.map((product, index) => (
                    <ReferenceProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      showCategoryLabel={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="products-catalog-empty">
                  <p className="font-display text-lg text-[var(--soft-ivory)]">
                    {t("products.noResultsTitle")}
                  </p>
                  <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
                    {t("products.noResultsDescription")}
                  </p>
                  <button
                    type="button"
                    className="products-catalog-reset mt-5"
                    onClick={() => setCategory("all")}
                  >
                    {t("products.clearFilters")}
                  </button>
                </div>
              )}

              <div className="products-catalog-footer">
                <Link
                  href="/coa"
                  className="qa-cta-text group inline-flex items-center gap-2 text-sm"
                >
                  {t("products.viewCoaLibrary")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
