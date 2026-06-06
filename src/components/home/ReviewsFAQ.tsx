"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "@/data/translations/homeContent";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function ReviewsFAQ() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language, t } = useLanguage();
  const { reviews, faqs } = useMemo(() => getHomeContent(language), [language]);

  return (
    <section className="ref-reviews-faq polish-reviews-faq final8-reviews-faq qa-reviews-section relative overflow-hidden">
      <SectionAtmosphere variant="value" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-reviews-faq-grid qa-reviews-faq-grid grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="lux-reveal art-reviews-column">
              <div className="qa-section-header qa-section-header-left">
                <p className="premium-eyebrow-gold polish-type-eyebrow">
                  {t("reviews.eyebrow")}
                </p>
                <h2 className="font-display ref-reviews-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                  {t("reviews.title")}
                </h2>
                <div className="gold-accent-line qa-section-divider qa-section-divider-left" aria-hidden />
              </div>

              <div className="ref-reviews-carousel polish-reviews-grid art-reviews-grid lux-stagger-group mt-8 hidden gap-4 lg:grid lg:grid-cols-3">
                {reviews.map((item) => (
                  <article
                    key={item.quote}
                    className="ref-review-card polish-review-card final8-review-card premium-card art-editorial-review lux-stagger-item p-6 xl:p-7"
                  >
                    <span className="art-review-mark" aria-hidden>
                      &ldquo;
                    </span>
                    <div className="polish-review-stars flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-[var(--luxury-gold)] text-[var(--luxury-gold)]"
                          aria-hidden
                        />
                      ))}
                    </div>
                    <blockquote className="polish-review-quote art-review-quote mt-5 font-display text-[15px] italic leading-[1.7] text-[var(--soft-ivory)]/82">
                      {item.quote}
                    </blockquote>
                    <p className="polish-review-author art-review-byline mt-6 flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
                      <BadgeCheck className="h-3.5 w-3.5 text-[var(--ocean-blue)]/70" aria-hidden />
                      {item.author}
                    </p>
                  </article>
                ))}
              </div>

              <article className="ref-review-card polish-review-card premium-card art-editorial-review mt-8 p-8 lg:hidden">
                <span className="art-review-mark" aria-hidden>
                  &ldquo;
                </span>
                <div className="polish-review-stars flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[var(--luxury-gold)] text-[var(--luxury-gold)]"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="polish-review-quote art-review-quote mt-6 font-display text-lg italic leading-[1.7] text-[var(--soft-ivory)]/82">
                  {reviews[reviewIndex]?.quote}
                </blockquote>
                <p className="polish-review-author art-review-byline mt-6 flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)]">
                  <BadgeCheck className="h-4 w-4 text-[var(--ocean-blue)]/70" aria-hidden />
                  {reviews[reviewIndex]?.author}
                </p>
              </article>

              <div className="mt-6 flex items-center justify-between lg:hidden">
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewIndex(i)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        i === reviewIndex
                          ? "bg-[var(--ocean-blue)]"
                          : "bg-white/20 hover:bg-white/35"
                      }`}
                      aria-label={`${t("reviews.showReview")} ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setReviewIndex((i) => (i === 0 ? reviews.length - 1 : i - 1))
                    }
                    className="ref-carousel-btn"
                    aria-label={t("reviews.prevReview")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReviewIndex((i) => (i === reviews.length - 1 ? 0 : i + 1))
                    }
                    className="ref-carousel-btn"
                    aria-label={t("reviews.nextReview")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="ref-faq-column polish-faq-column qa-faq-column lux-reveal">
              <div className="qa-section-header qa-section-header-left">
                <p className="premium-eyebrow-gold polish-type-eyebrow">{t("faq.eyebrow")}</p>
                <h2 className="font-display ref-faq-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                  {t("faq.title")}
                </h2>
                <div className="gold-accent-line qa-section-divider qa-section-divider-left" aria-hidden />
              </div>

              <div className="ref-faq-list polish-faq-list final8-faq-list mt-8">
                {faqs.map((item, i) => {
                  const isOpen = openFaq === i;
                  const panelId = `faq-panel-${i}`;
                  const triggerId = `faq-trigger-${i}`;
                  return (
                    <div
                      key={item.question}
                      className={`ref-faq-item polish-faq-item ${isOpen ? "polish-faq-item-open" : ""}`}
                    >
                      <button
                        type="button"
                        id={triggerId}
                        className="ref-faq-trigger polish-faq-trigger"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span>{item.question}</span>
                        <ChevronRight
                          className={`ref-faq-chevron polish-faq-chevron ${isOpen ? "ref-faq-chevron-open" : ""}`}
                          aria-hidden
                        />
                      </button>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={`polish-faq-answer-wrap ${isOpen ? "polish-faq-answer-open" : ""}`}
                      >
                        <p className="ref-faq-answer">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/faq"
                className="btn-primary polish-cta-primary qa-faq-cta group mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
              >
                {t("faq.viewAll")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
