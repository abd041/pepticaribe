"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck, FlaskConical, Search, ShieldCheck } from "lucide-react";
import { COALibraryCard } from "@/components/coa/COALibraryCard";
import {
  COALibraryFaq,
  COALibraryMethods,
  COALibraryStats,
  COALibrarySteps,
  COALibrarySupport,
  COALibraryTransparency,
} from "@/components/coa/COALibraryEditorial";
import { COASamplePreview } from "@/components/coa/COASamplePreview";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";
import type { CoaLibraryEntry } from "@/lib/coaLibrary";

type COALibraryPageProps = {
  entries: CoaLibraryEntry[];
};

export function COALibraryPage({ entries }: COALibraryPageProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return entries;

    return entries.filter(
      (entry) =>
        entry.displayName.toLowerCase().includes(trimmed) ||
        entry.slug.toLowerCase().includes(trimmed) ||
        entry.lotNumber.toLowerCase().includes(trimmed) ||
        entry.labName.toLowerCase().includes(trimmed),
    );
  }, [entries, query]);

  const resultsLabel = t("coa.resultsCount").replace("{count}", String(filtered.length));

  return (
    <div className="coa-library relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="coa-library-content">
          <section className="coa-library-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="premium-section-lg bg-transparent pb-8 pt-10 sm:pb-10 sm:pt-14"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="coa-library-eyebrow">{t("coa.libraryEyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-3">
                    <span className="text-[var(--soft-ivory)]">{t("coa.libraryTitle")}</span>
                  </h1>
                  <p className="section-caption mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed">
                    {t("coa.libraryDescription")}
                  </p>
                  <div className="gold-accent-line qa-section-divider mx-auto mt-6" aria-hidden />
                </div>

                <ul className="coa-library-trust mt-8 sm:mt-10" aria-label={t("coa.trustStripLabel")}>
                  <li>
                    <FlaskConical className="h-4 w-4 shrink-0" aria-hidden />
                    <span>{t("coa.trustHplc")}</span>
                  </li>
                  <li>
                    <FileCheck className="h-4 w-4 shrink-0" aria-hidden />
                    <span>{t("coa.trustMassSpec")}</span>
                  </li>
                  <li>
                    <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
                    <span>{t("coa.trustIso")}</span>
                  </li>
                </ul>
              </div>
            </SectionAtmosphere>
          </section>

          <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <COALibraryStats />
            <COALibraryTransparency />
            <COALibraryMethods />
          </div>

          <section
            id="coa-library-grid"
            className="coa-library-main scroll-mt-28"
            aria-label={t("coa.libraryTitle")}
          >
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 pb-8 sm:px-6 lg:px-8">
              <div className="coa-library-toolbar">
                <label className="coa-library-search">
                  <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden />
                  <span className="sr-only">{t("coa.searchLabel")}</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("coa.searchPlaceholder")}
                    className="coa-library-search-input"
                    autoComplete="off"
                  />
                </label>
              </div>

              <p className="coa-library-results" aria-live="polite">
                {resultsLabel}
              </p>

              {filtered.length > 0 ? (
                <div className="coa-library-grid mt-6 sm:mt-8">
                  {filtered.map((entry, index) => (
                    <COALibraryCard key={entry.id} entry={entry} index={index} />
                  ))}
                </div>
              ) : (
                <div className="coa-library-empty">
                  <p className="font-display text-lg text-[var(--soft-ivory)]">
                    {t("coa.noResultsTitle")}
                  </p>
                  <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
                    {t("coa.noResultsDescription")}
                  </p>
                  <button
                    type="button"
                    className="coa-library-reset mt-6"
                    onClick={() => setQuery("")}
                  >
                    {t("coa.clearSearch")}
                  </button>
                </div>
              )}
            </div>
          </section>

          <div className="qa-client-container mx-auto max-w-[90rem] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
            <COALibrarySteps />

            <section className="coa-library-sample mt-14 sm:mt-16" aria-labelledby="coa-sample-heading">
              <div className="coa-library-sample-inner">
                <div className="coa-library-sample-copy">
                  <p className="coa-library-eyebrow">{t("coa.previewEyebrow")}</p>
                  <h2
                    id="coa-sample-heading"
                    className="font-display mt-2 text-2xl font-bold text-[var(--soft-ivory)] sm:text-3xl"
                  >
                    {t("coa.sampleSectionTitle")}
                  </h2>
                  <p className="section-caption mt-4 max-w-xl text-[15px] leading-relaxed">
                    {t("coa.sampleSectionDescription")}
                  </p>
                </div>
                <COASamplePreview variant="showcase" className="coa-library-sample-preview" />
              </div>
            </section>

            <COALibraryFaq />
            <COALibrarySupport />

            <div className="coa-library-footer mt-12 flex flex-col items-center gap-6 text-center sm:mt-14">
              <Link href="/products" className="qa-cta-text group inline-flex items-center gap-2">
                {t("hero.ctaProducts")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
