"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck, Search, ShieldCheck, Truck } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { ReferenceProductCard } from "@/components/ui/ReferenceProductCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { useLanguage } from "@/context/LanguageContext";
import { getProductFromPrice } from "@/lib/pricing";

type SortKey = "featured" | "name" | "price-asc" | "price-desc";
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

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];

  switch (sort) {
    case "featured":
      return list.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          a.displayName.localeCompare(b.displayName),
      );
    case "name":
      return list.sort((a, b) => a.displayName.localeCompare(b.displayName));
    case "price-asc":
      return list.sort((a, b) => getProductFromPrice(a) - getProductFromPrice(b));
    case "price-desc":
      return list.sort((a, b) => getProductFromPrice(b) - getProductFromPrice(a));
    default:
      return list;
  }
}

export function ProductCatalogPage({ products }: ProductCatalogPageProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");

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
    let list = products;

    if (category !== "all") {
      list = list.filter((product) => product.category === category);
    }

    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      list = list.filter(
        (product) =>
          product.displayName.toLowerCase().includes(trimmed) ||
          product.description.toLowerCase().includes(trimmed) ||
          product.sku.toLowerCase().includes(trimmed) ||
          (product.shortDescription?.toLowerCase().includes(trimmed) ?? false),
      );
    }

    return sortProducts(list, sort);
  }, [products, category, query, sort]);

  const resultsLabel = t("products.resultsCount").replace("{count}", String(filtered.length));

  return (
    <div className="products-catalog relative min-h-dvh">
      <MarketingCanvasBackdrop>
      <div className="products-catalog-content">
      <section className="products-catalog-hero relative overflow-hidden">
        <SectionAtmosphere
          variant="products"
          showTopTransition={false}
          showBottomTransition={false}
          className="premium-section-lg bg-transparent pb-8 pt-10 sm:pb-10 sm:pt-14"
        >
          <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="products-catalog-eyebrow">{t("products.catalogEyebrow")}</p>
              <h1 className="font-display type-display-section polish-type-section-title mt-3">
                <span className="text-[var(--soft-ivory)]">{t("products.catalogTitle")}</span>
              </h1>
              <p className="section-caption mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed">
                {t("products.catalogDescription")}
              </p>
              <div className="gold-accent-line qa-section-divider mx-auto mt-6" aria-hidden />
            </div>

            <ul className="products-catalog-trust mt-8 sm:mt-10" aria-label={t("hero.trustLabel")}>
              <li>
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
                <span>{t("hero.trustIso")}</span>
              </li>
              <li>
                <FileCheck className="h-4 w-4 shrink-0" aria-hidden />
                <span>{t("common.coaIncluded")}</span>
              </li>
              <li>
                <Truck className="h-4 w-4 shrink-0" aria-hidden />
                <span>{t("hero.trustShipping")}</span>
              </li>
            </ul>
          </div>
        </SectionAtmosphere>
      </section>

      <section className="products-catalog-main" aria-label={t("products.catalogTitle")}>
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="products-catalog-toolbar">
            <div
              className="products-catalog-categories"
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

            <div className="products-catalog-controls">
              <label className="products-catalog-search">
                <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                <span className="sr-only">{t("products.searchLabel")}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("products.searchPlaceholder")}
                  className="products-catalog-search-input"
                  autoComplete="off"
                />
              </label>

              <label className="products-catalog-sort">
                <span className="products-catalog-sort-label">{t("products.sortLabel")}</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  className="products-catalog-sort-select"
                  aria-label={t("products.sortLabel")}
                >
                  <option value="featured">{t("products.sortFeatured")}</option>
                  <option value="name">{t("products.sortName")}</option>
                  <option value="price-asc">{t("products.sortPriceAsc")}</option>
                  <option value="price-desc">{t("products.sortPriceDesc")}</option>
                </select>
              </label>
            </div>
          </div>

          <p className="products-catalog-results" aria-live="polite">
            {resultsLabel}
          </p>

          {filtered.length > 0 ? (
            <div className="ref-product-grid qa-product-grid products-catalog-grid mt-6 sm:mt-8">
              {filtered.map((product, index) => (
                <ReferenceProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  showCategoryLabel
                />
              ))}
            </div>
          ) : (
            <div className="products-catalog-empty">
              <p className="font-display text-lg text-[var(--soft-ivory)]">{t("products.noResultsTitle")}</p>
              <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
                {t("products.noResultsDescription")}
              </p>
              <button
                type="button"
                className="products-catalog-reset mt-6"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setSort("featured");
                }}
              >
                {t("products.clearFilters")}
              </button>
            </div>
          )}

          <div className="products-catalog-footer mt-12 flex flex-col items-center gap-6 text-center sm:mt-14">
            <Link href="/coa" className="qa-cta-text group inline-flex items-center gap-2">
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
