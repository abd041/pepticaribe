"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BrandSectionDivider } from "@/components/ui/BrandMotifs";

const CREDENTIALS: {
  designation: string;
  value: string;
  authority: string;
  marker: string;
}[] = [
  {
    designation: "Certified Purity",
    value: "99%+",
    authority: "Verified through HPLC identity testing on every released batch.",
    marker: "Lab Verified",
  },
  {
    designation: "Batch Integrity",
    value: "100%",
    authority: "Independently analyzed prior to shipment and circulation.",
    marker: "Independently Tested",
  },
  {
    designation: "Laboratory Accreditation",
    value: "ISO 17025",
    authority: "Third-party testing conducted by internationally accredited facilities.",
    marker: "ISO Accredited",
  },
  {
    designation: "Domestic Fulfillment",
    value: "2-Day",
    authority: "Certified same-day processing on qualifying research orders.",
    marker: "Certified Shipping",
  },
];

function AnimatedStat({ value, inView }: { value: string; inView: boolean }) {
  return (
    <motion.span
      className="font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-white sm:text-[3.25rem] lg:text-[3.75rem]"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, type: "spring", stiffness: 120, damping: 18 }}
    >
      {value}
    </motion.span>
  );
}

export function TrustMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-dark relative -mt-8 py-24 md:py-32">
      <div className="section-atmosphere-top pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(212,175,55,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow metallic-label font-bold">
            Institutional Credentials
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold tracking-[-0.02em] text-neutral-100 md:text-3xl lg:text-4xl">
            Verified Research Standards
          </h2>
          <p className="section-caption mx-auto mt-4 max-w-xl md:text-[15px]">
            Every metric reflects a binding laboratory commitment — not a
            marketing claim.
          </p>
          <BrandSectionDivider className="mx-auto mt-7 max-w-xs opacity-40" />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {CREDENTIALS.map((cred, i) => (
            <motion.article
              key={cred.designation}
              className="credential-plaque light-sweep-hover group relative overflow-hidden rounded-sm border border-white/6 px-6 py-8 backdrop-blur-md sm:px-7 sm:py-9"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="credential-plaque-gold-edge" aria-hidden />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-400/30 to-transparent"
                aria-hidden
              />

              <div className="relative flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="technical-label text-[11px] font-bold tracking-[0.16em] text-neutral-400/90">
                    {cred.designation}
                  </span>
                  <span className="technical-label shrink-0 text-[9px] font-bold tracking-[0.14em] text-[#D4AF37]/62">
                    {cred.marker}
                  </span>
                </div>

                <div className="my-6">
                  <AnimatedStat value={cred.value} inView={inView} />
                </div>

                <p className="section-caption text-[14px] leading-relaxed transition-colors duration-300 group-hover:text-neutral-300/90">
                  {cred.authority}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
