"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";
import { getMarketingPage, type MarketingPageSlug } from "@/data/translations/marketingContent";

type ComingSoonPageProps = {
  slug: Extract<MarketingPageSlug, "membership" | "account">;
};

export function ComingSoonPage({ slug }: ComingSoonPageProps) {
  const { language, t } = useLanguage();
  const page = getMarketingPage(language, slug);

  return (
    <div className="coming-soon-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="coming-soon-page-content">
          <section className="coming-soon-page-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="coming-soon-page-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="coming-soon-page-hero-copy mx-auto max-w-2xl text-center">
                  <p className="coming-soon-page-eyebrow">{page.eyebrow}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{page.title}</span>
                  </h1>
                  <div
                    className="gold-accent-line qa-section-divider mx-auto mt-4 max-w-[12rem]"
                    aria-hidden
                  />
                  <p className="section-caption mx-auto mt-4 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {page.description}
                  </p>
                </div>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="coming-soon-page-main" aria-label={page.title}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <div className="coming-soon-page-card">
                <span className="coming-soon-page-icon" aria-hidden>
                  <Clock className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="coming-soon-page-badge">{t("comingSoon.badge")}</p>
                {page.body.map((paragraph) => (
                  <p key={paragraph} className="coming-soon-page-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="coming-soon-page-cta-row">
                <Link href="/contact" className="btn-primary coming-soon-page-cta">
                  {t("comingSoon.contactCta")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <Link href="/products" className="btn-outline-gold coming-soon-page-cta">
                  {t("hero.ctaProducts")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
