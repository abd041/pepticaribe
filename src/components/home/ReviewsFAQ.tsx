"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

const REVIEWS = [
  {
    quote:
      "Consistently high purity across multiple orders. COAs match every batch — exactly what our lab requires.",
    author: "Verified Researcher",
  },
  {
    quote:
      "Fast fulfillment and discreet packaging. The documentation quality sets PeptiCaribe apart from other suppliers.",
    author: "Verified Researcher",
  },
  {
    quote:
      "Third-party testing on every compound gives us confidence before any in-vitro protocol begins.",
    author: "Verified Researcher",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Are these peptides for human consumption?",
    answer:
      "No. All PeptiCaribe products are sold strictly for Research Use Only (RUO) — for in-vitro laboratory research, educational, and scientific purposes by qualified researchers and institutions only.",
  },
  {
    question: "How do I verify batch purity?",
    answer:
      "Every batch includes a Certificate of Analysis from an independent ISO 17025 accredited laboratory. Browse our COA Library to view HPLC purity and mass spectrometry identity results.",
  },
  {
    question: "What shipping options are available?",
    answer:
      "Orders placed before 4 PM EST ship same day with discreet packaging. Standard delivery is 2–3 business days domestically with secure worldwide options available.",
  },
  {
    question: "Do you provide technical support?",
    answer:
      "Yes. Our team includes researchers who understand peptide handling, reconstitution, and storage protocols. Contact us for technical assistance with your research orders.",
  },
] as const;

export function ReviewsFAQ() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="ref-reviews-faq polish-reviews-faq final8-reviews-faq qa-reviews-section relative overflow-hidden">
      <SectionAtmosphere variant="value" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-reviews-faq-grid qa-reviews-faq-grid grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="lux-reveal art-reviews-column">
              <div className="qa-section-header qa-section-header-left">
                <p className="premium-eyebrow-gold polish-type-eyebrow font-display">What Our Customers Say</p>
                <h2 className="font-display ref-reviews-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                  Researcher Testimonials
                </h2>
                <div className="gold-accent-line qa-section-divider qa-section-divider-left" aria-hidden />
              </div>

              <div className="ref-reviews-carousel polish-reviews-grid art-reviews-grid lux-stagger-group mt-8 hidden gap-4 lg:grid lg:grid-cols-3">
                {REVIEWS.map((item) => (
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
                    <p className="polish-review-author art-review-byline mt-6 flex items-center gap-1.5 text-xs font-medium text-[var(--soft-ivory)]/45">
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
                  {REVIEWS[reviewIndex].quote}
                </blockquote>
                <p className="polish-review-author art-review-byline mt-6 flex items-center gap-1.5 text-sm font-medium text-[var(--soft-ivory)]/45">
                  <BadgeCheck className="h-4 w-4 text-[var(--ocean-blue)]/70" aria-hidden />
                  {REVIEWS[reviewIndex].author}
                </p>
              </article>

              <div className="mt-6 flex items-center justify-between lg:hidden">
                <div className="flex gap-2">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewIndex(i)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        i === reviewIndex
                          ? "bg-[var(--ocean-blue)]"
                          : "bg-white/20 hover:bg-white/35"
                      }`}
                      aria-label={`Show review ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setReviewIndex((i) => (i === 0 ? REVIEWS.length - 1 : i - 1))
                    }
                    className="ref-carousel-btn"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReviewIndex((i) => (i === REVIEWS.length - 1 ? 0 : i + 1))
                    }
                    className="ref-carousel-btn"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="ref-faq-column polish-faq-column qa-faq-column lux-reveal">
              <div className="qa-section-header qa-section-header-left">
                <p className="premium-eyebrow-gold polish-type-eyebrow font-display">Researcher FAQs</p>
                <h2 className="font-display ref-faq-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                  Common Questions
                </h2>
                <div className="gold-accent-line qa-section-divider qa-section-divider-left" aria-hidden />
              </div>

              <div className="ref-faq-list polish-faq-list final8-faq-list mt-8">
                {FAQ_ITEMS.map((item, i) => {
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
                View All FAQs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
