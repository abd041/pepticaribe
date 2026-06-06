"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  FileCheck2,
  FlaskConical,
  Headphones,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "@/data/translations/homeContent";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

const STAR_RATING = "★★★★★";

export function ReviewsFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language, t } = useLanguage();
  const { reviews, faqs } = useMemo(() => getHomeContent(language), [language]);

  const excellenceHighlights = [
    { icon: FlaskConical, label: t("faq.excellenceIso17025") },
    { icon: FileCheck2, label: t("faq.excellenceCoa") },
    { icon: ShieldCheck, label: t("faq.excellenceRuo") },
    { icon: Headphones, label: t("faq.excellenceSupport") },
  ] as const;

  return (
    <section className="ref-reviews-faq testimonial-trust-section polish-reviews-faq final8-reviews-faq qa-reviews-section relative overflow-hidden">
      <SectionAtmosphere variant="value" className="premium-section-lg">
        <div className="testimonial-trust-spotlight" aria-hidden />
        <div className="qa-client-container relative z-[2] mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="testimonial-trust-layout">
            <div className="testimonial-trust-block lux-reveal art-reviews-column">
              <div className="qa-section-header qa-section-header-left">
                <p className="premium-eyebrow-gold polish-type-eyebrow">
                  {t("reviews.eyebrow")}
                </p>
                <h2 className="font-display ref-reviews-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                  {t("reviews.title")}
                </h2>
                <div className="gold-accent-line qa-section-divider qa-section-divider-left" aria-hidden />
              </div>

              <div className="testimonial-trust-grid lux-stagger-group">
                {reviews.map((item) => (
                  <article
                    key={item.quote}
                    className="testimonial-trust-card ref-review-card polish-review-card final8-review-card premium-card art-editorial-review lux-stagger-item"
                  >
                    <span className="testimonial-trust-mark" aria-hidden>
                      &ldquo;
                    </span>
                    <div className="testimonial-trust-stars" aria-label="5 out of 5 stars">
                      {STAR_RATING}
                    </div>
                    <blockquote className="testimonial-trust-quote polish-review-quote art-review-quote">
                      {item.quote}
                    </blockquote>
                    <footer className="testimonial-trust-footer">
                      <span className="testimonial-trust-verified" aria-hidden>
                        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                      <cite className="testimonial-trust-author polish-review-author art-review-byline not-italic">
                        {item.author}
                      </cite>
                    </footer>
                  </article>
                ))}
              </div>
            </div>

            <div className="faq-premium-section ref-faq-column polish-faq-column qa-faq-column lux-reveal">
              <div className="faq-premium-header qa-section-header qa-section-header-left">
                <p className="premium-eyebrow-gold polish-type-eyebrow">{t("faq.eyebrow")}</p>
                <h2 className="font-display ref-faq-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                  {t("faq.title")}
                </h2>
                <div className="gold-accent-line qa-section-divider qa-section-divider-left" aria-hidden />
              </div>

              <div className="faq-premium-layout">
                <div className="faq-premium-accordion-col">
                  <div className="faq-premium-list ref-faq-list polish-faq-list final8-faq-list">
                    {faqs.map((item, i) => {
                      const isOpen = openFaq === i;
                      const panelId = `faq-panel-${i}`;
                      const triggerId = `faq-trigger-${i}`;
                      return (
                        <article
                          key={item.question}
                          className={`faq-premium-card ref-faq-item polish-faq-item${
                            isOpen ? " faq-premium-card--open polish-faq-item-open" : ""
                          }`}
                        >
                          <button
                            type="button"
                            id={triggerId}
                            className="faq-premium-trigger ref-faq-trigger polish-faq-trigger"
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                          >
                            <span className="faq-premium-trigger-text">{item.question}</span>
                            <span className="faq-premium-expand" aria-hidden>
                              <Plus className="faq-premium-expand-icon" strokeWidth={2} />
                            </span>
                          </button>
                          <div
                            id={panelId}
                            role="region"
                            aria-labelledby={triggerId}
                            className={`faq-premium-answer-wrap polish-faq-answer-wrap${
                              isOpen ? " polish-faq-answer-open" : ""
                            }`}
                          >
                            <div className="faq-premium-answer-inner">
                              <p className="faq-premium-answer ref-faq-answer">{item.answer}</p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  <Link
                    href="/faq"
                    className="btn-primary polish-cta-primary qa-faq-cta group inline-flex w-fit items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
                  >
                    {t("faq.viewAll")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>

                <aside className="faq-premium-excellence" aria-labelledby="faq-excellence-title">
                  <h3 id="faq-excellence-title" className="faq-premium-excellence-title font-display">
                    {t("faq.excellenceTitle")}
                  </h3>
                  <div className="faq-premium-excellence-divider" aria-hidden />
                  <ul className="faq-premium-excellence-list">
                    {excellenceHighlights.map(({ icon: Icon, label }) => (
                      <li key={label} className="faq-premium-excellence-item">
                        <span className="faq-premium-excellence-icon" aria-hidden>
                          <Icon className="h-4 w-4" strokeWidth={1.5} />
                        </span>
                        <span className="faq-premium-excellence-label">{label}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
