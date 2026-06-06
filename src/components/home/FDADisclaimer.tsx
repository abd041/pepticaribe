"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function FDADisclaimer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="art-chapter-trust qa-disclaimer-section bg-[var(--deep-navy)]">
      <SectionAtmosphere variant="disclaimer" className="premium-section">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="qa-disclaimer-card fda-disclaimer-card mx-auto max-w-3xl rounded-[var(--radius-premium)] p-8 sm:p-10 md:p-12"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-5 md:gap-7">
              <div className="fda-icon-well shrink-0">
                <AlertTriangle className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="premium-eyebrow-gold polish-type-eyebrow font-display">
                  FDA Disclaimer
                </h3>
                <p className="section-caption polish-type-disclaimer mt-4 text-[14px] leading-relaxed md:text-[15px]">
                  These products have not been evaluated by the Food and Drug
                  Administration. These products are not intended to diagnose,
                  treat, cure, or prevent any disease. All products sold by
                  PeptiCaribe are intended strictly for{" "}
                  <strong className="font-semibold text-[var(--soft-ivory)]/90">
                    Research Use Only (RUO)
                  </strong>{" "}
                  — for in-vitro laboratory research, educational, and scientific
                  purposes by qualified researchers and institutions only. Not for
                  human consumption, veterinary use, or therapeutic application.
                </p>
                <Link
                  href="/disclaimer"
                  className="qa-cta-text mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                >
                  Read the full disclaimer
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
