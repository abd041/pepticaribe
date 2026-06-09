"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck,
  FlaskConical,
  Lock,
  Mail,
  Package,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";
import { getFaqPageContent } from "@/data/translations/faqPageContent";
import { formatTranslation } from "@/lib/i18n-format";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  research: FlaskConical,
  quality: ShieldCheck,
  ordering: Truck,
  support: Package,
};

export function FAQPage() {
  const { language, t } = useLanguage();
  const { categories, stats, supportTitle, supportBody, supportCta, supportEmail } =
    getFaqPageContent(language);
  const [query, setQuery] = useState("");

  const isSearching = query.trim().length > 0;

  const filteredCategories = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return categories;

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(trimmed) ||
            item.answer.toLowerCase().includes(trimmed),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query]);

  const filteredFlat = useMemo(
    () => filteredCategories.flatMap((category) => category.items),
    [filteredCategories],
  );

  const resultsLabel = formatTranslation(t, "faq.resultsCount", {
    count: String(filteredFlat.length),
  });

  return (
    <div className="faq-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="faq-page-content">
          <section className="faq-page-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="faq-page-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="faq-page-hero-copy mx-auto max-w-2xl text-center">
                  <p className="faq-page-eyebrow">{t("faq.eyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{t("faq.title")}</span>
                  </h1>
                  <div
                    className="gold-accent-line qa-section-divider mx-auto mt-4 max-w-[12rem]"
                    aria-hidden
                  />
                  <p className="section-caption mx-auto mt-4 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {t("faq.pageDescription")}
                  </p>
                </div>

                <ul className="faq-page-trust" aria-label={t("hero.trustLabel")}>
                  <li>
                    <FlaskConical className="h-3 w-3" aria-hidden />
                    <span>{t("hero.trustIso")}</span>
                  </li>
                  <li>
                    <FileCheck className="h-3 w-3" aria-hidden />
                    <span>{t("coa.trustHplc")}</span>
                  </li>
                  <li>
                    <Truck className="h-3 w-3" aria-hidden />
                    <span>{t("hero.trustShipping")}</span>
                  </li>
                  <li>
                    <Lock className="h-3 w-3" aria-hidden />
                    <span>{t("cart.trustSecure")}</span>
                  </li>
                </ul>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="faq-page-main" aria-label={t("faq.title")}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <ul className="faq-page-stats" aria-label={t("hero.trustLabel")}>
                {stats.map((stat) => (
                  <li key={stat.label} className="faq-page-stat-card">
                    <p className="faq-page-stat-value">{stat.value}</p>
                    <p className="faq-page-stat-label">{stat.label}</p>
                  </li>
                ))}
              </ul>

              <div className="faq-page-toolbar">
                <label className="faq-page-search">
                  <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                  <span className="sr-only">{t("faq.searchLabel")}</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("faq.searchPlaceholder")}
                    className="faq-page-search-input"
                    autoComplete="off"
                  />
                </label>

                {!isSearching ? (
                  <nav className="faq-page-jump-nav" aria-label={t("faq.jumpNavLabel")}>
                    {categories.map((category) => {
                      const Icon = CATEGORY_ICONS[category.id] ?? FileCheck;
                      return (
                        <a
                          key={category.id}
                          href={`#faq-cat-${category.id}`}
                          className="faq-page-jump-link"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span>{category.title}</span>
                        </a>
                      );
                    })}
                  </nav>
                ) : null}
              </div>

              {isSearching ? (
                <p className="faq-page-results" aria-live="polite">
                  {resultsLabel}
                </p>
              ) : null}

              <div className="faq-premium-layout faq-page-layout">
                <div className="faq-premium-accordion-col faq-page-accordion-col">
                  {filteredFlat.length > 0 ? (
                    isSearching ? (
                      <section className="faq-page-category-panel faq-page-category-panel--search">
                        <FaqAccordion items={filteredFlat} idPrefix="faq-page-search" />
                      </section>
                    ) : (
                      filteredCategories.map((category) => {
                        const Icon = CATEGORY_ICONS[category.id] ?? FileCheck;
                        return (
                          <section
                            key={category.id}
                            id={`faq-cat-${category.id}`}
                            className="faq-page-category-panel scroll-mt-28"
                            aria-labelledby={`faq-cat-${category.id}`}
                          >
                            <header className="faq-page-category-head">
                              <span className="faq-page-category-icon" aria-hidden>
                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                              </span>
                              <div>
                                <h2 id={`faq-cat-${category.id}`} className="faq-page-category-title">
                                  {category.title}
                                </h2>
                                <p className="faq-page-category-count">
                                  {formatTranslation(t, "faq.questionCount", {
                                    count: String(category.items.length),
                                  })}
                                </p>
                              </div>
                            </header>
                            <FaqAccordion
                              items={category.items}
                              idPrefix={`faq-page-${category.id}`}
                            />
                          </section>
                        );
                      })
                    )
                  ) : (
                    <div className="faq-page-empty">
                      <p className="font-display text-lg text-[var(--soft-ivory)]">
                        {t("faq.noResultsTitle")}
                      </p>
                      <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
                        {t("faq.noResultsDescription")}
                      </p>
                      <button
                        type="button"
                        className="faq-page-reset mt-6"
                        onClick={() => setQuery("")}
                      >
                        {t("faq.clearSearch")}
                      </button>
                    </div>
                  )}
                </div>

                <aside className="faq-page-sidebar" aria-label={t("faq.excellenceTitle")}>
                  <div className="faq-premium-excellence faq-page-excellence">
                    <h2 className="faq-premium-excellence-title">{t("faq.excellenceTitle")}</h2>
                    <div className="faq-premium-excellence-divider" aria-hidden />
                    <ul className="faq-premium-excellence-list">
                      <li className="faq-premium-excellence-item">
                        <span className="faq-premium-excellence-icon" aria-hidden>
                          <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="faq-premium-excellence-label">
                          {t("faq.excellenceIso17025")}
                        </span>
                      </li>
                      <li className="faq-premium-excellence-item">
                        <span className="faq-premium-excellence-icon" aria-hidden>
                          <FileCheck className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="faq-premium-excellence-label">
                          {t("faq.excellenceCoa")}
                        </span>
                      </li>
                      <li className="faq-premium-excellence-item">
                        <span className="faq-premium-excellence-icon" aria-hidden>
                          <FlaskConical className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="faq-premium-excellence-label">
                          {t("faq.excellenceRuo")}
                        </span>
                      </li>
                      <li className="faq-premium-excellence-item">
                        <span className="faq-premium-excellence-icon" aria-hidden>
                          <Mail className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="faq-premium-excellence-label">
                          {t("faq.excellenceSupport")}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="faq-page-quick-panel">
                    <p className="faq-page-quick-title">{t("faq.quickResources")}</p>
                    <div className="faq-page-quick-links">
                      <Link href="/coa" className="btn-outline-gold faq-page-quick-link">
                        {t("hero.ctaCoa")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                      <Link href="/products" className="btn-outline-gold faq-page-quick-link">
                        {t("hero.ctaProducts")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                      <Link href="/contact" className="btn-outline-gold faq-page-quick-link">
                        {t("nav.contact")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>

              <section className="faq-page-support" aria-labelledby="faq-support-heading">
                <div className="faq-page-support-inner">
                  <span className="faq-page-support-icon" aria-hidden>
                    <Mail className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div className="faq-page-support-copy">
                    <h2 id="faq-support-heading" className="faq-page-support-title">
                      {supportTitle}
                    </h2>
                    <p className="faq-page-support-body">{supportBody}</p>
                  </div>
                  <Link
                    href={`mailto:${supportEmail}?subject=FAQ%20Inquiry`}
                    className="ref-product-btn-gold faq-page-support-cta"
                  >
                    {supportCta}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </section>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
