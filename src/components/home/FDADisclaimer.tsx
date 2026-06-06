"use client";

import { useRef } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useInView } from "@/hooks/useInView";

export function FDADisclaimer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="art-chapter-trust qa-disclaimer-section bg-[var(--deep-navy)]">
      <SectionAtmosphere variant="disclaimer" className="premium-section">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div
            className={`qa-disclaimer-card fda-disclaimer-card motion-reveal mx-auto max-w-3xl rounded-[var(--radius-premium)] p-8 sm:p-10 md:p-12 ${inView ? "is-visible" : ""}`}
          >
            <div className="flex gap-5 md:gap-7">
              <div className="fda-icon-well shrink-0">
                <AlertTriangle className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="premium-eyebrow-gold polish-type-eyebrow font-display">
                  {t("disclaimer.title")}
                </h3>
                <p className="section-caption polish-type-disclaimer mt-4 text-[14px] leading-relaxed md:text-[15px]">
                  {t("disclaimer.body")}
                </p>
                <Link
                  href="/disclaimer"
                  className="qa-cta-text mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                >
                  {t("disclaimer.readFull")}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
