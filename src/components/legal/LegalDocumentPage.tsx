"use client";

import Link from "next/link";
import { ArrowRight, FileText, Scale, Shield } from "lucide-react";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/data/translations/types";
import { getLegalDocument, LEGAL_SLUGS, type LegalBlock, type LegalSlug } from "@/data/legal";

const NAV_LABEL_KEYS: Record<LegalSlug, TranslationKey> = {
  disclaimer: "disclaimer.title",
  "privacy-policy": "footer.linkPrivacy",
  "terms-and-conditions": "footer.linkTerms",
  "research-use-only": "footer.linkRuo",
  "returns-refunds": "footer.linkReturns",
};

function LegalBlockView({ block }: { block: LegalBlock }) {
  return (
    <section className="legal-page-block">
      {block.heading ? <h2 className="legal-page-block-heading">{block.heading}</h2> : null}
      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="legal-page-paragraph">
          {paragraph}
        </p>
      ))}
      {block.bullets?.length ? (
        <ul className="legal-page-bullets">
          {block.bullets.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

type LegalDocumentPageProps = {
  slug: LegalSlug;
};

export function LegalDocumentPage({ slug }: LegalDocumentPageProps) {
  const { language, t } = useLanguage();
  const document = getLegalDocument(language, slug);

  return (
    <div className="legal-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="legal-page-content">
          <section className="legal-page-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="legal-page-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="legal-page-hero-copy mx-auto max-w-2xl text-center">
                  <p className="legal-page-eyebrow">{document.eyebrow}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{document.title}</span>
                  </h1>
                  <div
                    className="gold-accent-line qa-section-divider mx-auto mt-4 max-w-[12rem]"
                    aria-hidden
                  />
                  <p className="section-caption mx-auto mt-4 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {document.description}
                  </p>
                  <p className="legal-page-updated">
                    {t("legal.lastUpdated")}: {document.lastUpdated}
                  </p>
                </div>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="legal-page-main" aria-label={document.title}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <div className="legal-page-layout">
                <article className="legal-page-document">
                  <header className="legal-page-document-head">
                    <span className="legal-page-document-icon" aria-hidden>
                      <Scale className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="legal-page-document-label">{t("legal.documentLabel")}</p>
                      <p className="legal-page-document-meta">
                        {t("legal.lastUpdated")}: {document.lastUpdated}
                      </p>
                    </div>
                  </header>

                  <div className="legal-page-prose">
                    {document.blocks.map((block, index) => (
                      <LegalBlockView key={`${slug}-block-${index}`} block={block} />
                    ))}
                  </div>

                  <footer className="legal-page-document-footer">
                    <p className="legal-page-ruo-notice">
                      <Shield className="h-4 w-4 shrink-0" aria-hidden />
                      {t("footer.barRuo")}
                    </p>
                  </footer>
                </article>

                <aside className="legal-page-sidebar" aria-label={t("legal.relatedPolicies")}>
                  <div className="legal-page-nav-panel">
                    <p className="legal-page-nav-title">
                      <FileText className="h-4 w-4" aria-hidden />
                      {t("legal.relatedPolicies")}
                    </p>
                    <nav className="legal-page-nav">
                      <ul>
                        {LEGAL_SLUGS.map((navSlug) => {
                          const href = `/${navSlug}`;
                          const isActive = navSlug === slug;
                          return (
                            <li key={navSlug}>
                              <Link
                                href={href}
                                className={`legal-page-nav-link${isActive ? " is-active" : ""}`}
                                aria-current={isActive ? "page" : undefined}
                              >
                                {t(NAV_LABEL_KEYS[navSlug])}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>

                  <div className="legal-page-help-panel">
                    <p className="legal-page-help-title">{t("legal.questionsTitle")}</p>
                    <p className="legal-page-help-body">{t("legal.questionsBody")}</p>
                    <Link href="/contact" className="btn-outline-gold legal-page-help-cta">
                      {t("nav.contact")}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
