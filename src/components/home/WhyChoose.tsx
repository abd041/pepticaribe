"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileCheck,
  FlaskConical,
  Headphones,
  Microscope,
  ShieldCheck,
  Thermometer,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  BrandSectionDivider,
  DnaHelixAccent,
  SectionBridge,
} from "@/components/ui/BrandMotifs";

const CREDIBILITY_PILLARS: {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  commitment: string;
}[] = [
  {
    icon: Microscope,
    title: "Independent Batch Testing",
    description:
      "Every lot verified by accredited third-party laboratories before release.",
    detail: "ISO 17025 · HPLC · Mass spectrometry verification",
    commitment: "Non-negotiable",
  },
  {
    icon: FileCheck,
    title: "Certificate Transparency",
    description:
      "Downloadable COAs available for every released batch in our catalog.",
    detail: "Full batch documentation · Lot-level traceability",
    commitment: "Full disclosure",
  },
  {
    icon: ShieldCheck,
    title: "Research-Grade Standards",
    description:
      "Strict manufacturing and quality control requirements across all compounds.",
    detail: "Identity purity · Consistent formulation standards",
    commitment: "Institutional grade",
  },
  {
    icon: Headphones,
    title: "Researcher Support",
    description:
      "Dedicated support for laboratories and qualified research institutions.",
    detail: "Protocol guidance · Order and batch inquiries",
    commitment: "Direct access",
  },
  {
    icon: Thermometer,
    title: "Controlled Storage & Handling",
    description:
      "Maintained under strict environmental standards from receipt to dispatch.",
    detail: "Temperature-controlled · Chain-of-custody protocols",
    commitment: "Chain verified",
  },
  {
    icon: Truck,
    title: "U.S. Fulfillment Network",
    description:
      "Fast, secure domestic order processing with discreet laboratory packaging.",
    detail: "Same-day processing · 2-day domestic delivery",
    commitment: "Expedited",
  },
];

export function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-linear-to-b from-[#070D0F] via-[#0B1519] to-[#070D0F] py-28 md:py-36"
    >
      <div className="section-atmosphere-top pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(212,175,55,0.045),transparent_55%)]" />
      <DnaHelixAccent className="pointer-events-none absolute left-[4%] top-[20%] hidden h-36 w-8 text-[#F3E5AB]/5 md:block" />
      <DnaHelixAccent className="pointer-events-none absolute right-[5%] bottom-[15%] hidden h-28 w-6 text-[#D4AF37]/5 md:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionBridge className="mb-12" />

        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="brand-badge-premium metallic-label inline-flex rounded-sm border px-4 py-1.5 text-[11px] font-semibold">
            Scientific Credibility
          </span>
          <h2 className="font-display mt-6 text-3xl font-bold tracking-[-0.03em] text-neutral-100 md:text-4xl lg:text-[2.85rem]">
            Built for Serious Research
          </h2>
          <p className="section-caption mx-auto mt-5 max-w-2xl md:text-[15px]">
            Premium research infrastructure with the transparency, consistency,
            and quality controls your laboratory demands.
          </p>
          <BrandSectionDivider className="mx-auto mt-8 max-w-sm opacity-45" />
        </motion.div>

        <motion.div
          className="luxury-slab mx-auto mt-14 max-w-4xl rounded-sm px-8 py-7 text-center md:px-12 md:py-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[#D4AF37]/18 bg-white/4">
            <FlaskConical className="h-4 w-4 text-[#F3E5AB]" aria-hidden />
          </div>
          <p className="font-display text-lg font-semibold leading-snug text-neutral-100 md:text-xl">
            Trusted by researchers who require transparency, consistency, and
            verified quality.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {CREDIBILITY_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                className="research-credibility-card light-sweep-hover group relative overflow-hidden rounded-sm border border-white/6 bg-linear-to-br from-white/4 via-white/[0.015] to-transparent p-7 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/30 md:p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#D4AF37]/5 via-transparent to-white/[0.015] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#F3E5AB]/25 to-transparent opacity-60" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#D4AF37]/18 bg-white/[0.035] text-[#F3E5AB] transition-all duration-300 group-hover:border-[#D4AF37]/30">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="technical-label text-[10px] font-bold tracking-[0.14em] text-[#D4AF37]/58">
                      {pillar.commitment}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 text-lg font-bold tracking-tight text-neutral-100">
                    {pillar.title}
                  </h3>

                  <p className="section-caption mt-3 text-[14px] leading-relaxed transition-colors duration-300 group-hover:text-neutral-300/90">
                    {pillar.description}
                  </p>

                  <p className="technical-label mt-4 border-t border-white/6 pt-4 text-[11px] font-semibold tracking-[0.14em] text-[#F3E5AB]/52 transition-colors duration-300 group-hover:text-[#F3E5AB]/74">
                    {pillar.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
