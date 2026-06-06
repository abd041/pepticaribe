"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Clock,
  FileCheck,
  FlaskConical,
  Headphones,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { DnaHelixAccent, BrandSectionDivider } from "@/components/ui/BrandMotifs";
import type { LucideIcon } from "lucide-react";

const HIGHLIGHT_BENEFITS = [
  "Priority Order Processing",
  "Exclusive Compound Access",
  "Early Batch Availability",
  "Dedicated Research Support",
];

const BENEFITS_GRID: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Clock,
    title: "Priority Fulfillment",
    description: "Same-day processing and expedited queue placement for partner orders.",
  },
  {
    icon: Lock,
    title: "Early Product Access",
    description: "First access to new compounds and limited research batches.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Direct researcher support line for protocol and order inquiries.",
  },
  {
    icon: Bell,
    title: "Compound Notifications",
    description: "Alerts when new research peptides and batches become available.",
  },
  {
    icon: FileCheck,
    title: "Faster COA Access",
    description: "Priority COA release and enhanced batch documentation.",
  },
  {
    icon: Mail,
    title: "Research Updates",
    description: "Curated research insights, batch news, and catalog updates.",
  },
];

function MemberCredentialCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[360px]"
      initial={{ opacity: 0, y: 24, rotateY: -6 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="credential-emboss relative overflow-hidden rounded-sm border border-[#D4AF37]/30 p-7 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#AA7C11] via-[#F3E5AB] to-[#D4AF37]" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-transparent" />

        {/* Holographic security stripe */}
        <div
          className="pointer-events-none absolute right-0 top-16 h-32 w-8 bg-linear-to-b from-white/10 via-[#D4AF37]/24 to-white/5"
          aria-hidden
        />

        <DnaHelixAccent className="pointer-events-none absolute -right-1 top-10 h-32 w-8 text-[#F3E5AB]/8" />
        <DnaHelixAccent className="pointer-events-none absolute bottom-8 left-4 h-24 w-6 text-[#D4AF37]/8" />

        <div className="relative flex items-start justify-between gap-3">
          <BrandLogo size="xs" />
          <span className="inline-flex items-center gap-1 rounded-sm border border-[#D4AF37]/35 bg-[#D4AF37]/12 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F3E5AB]">
            <ShieldCheck className="h-2.5 w-2.5" aria-hidden />
            Verified
          </span>
        </div>

        {/* EMV-style chip */}
        <div
          className="mt-6 h-9 w-12 rounded-sm border border-[#D4AF37]/25 bg-linear-to-br from-[#F3E5AB]/20 via-[#D4AF37]/10 to-transparent"
          aria-hidden
        />

        <div className="relative mt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F3E5AB]/65">
            PeptiCaribe Research Partner
          </p>
          <p className="font-display mt-1.5 text-2xl font-bold tracking-tight text-neutral-100">
            Member Credential
          </p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            Exclusive access for qualified researchers and institutions.
          </p>
        </div>

        <div className="relative mt-7 space-y-3 rounded-sm border border-white/10 bg-black/25 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/32">
            <span>Access Tier</span>
            <span className="font-bold text-[#F3E5AB]/90">Partner</span>
          </div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/32">
            <span>Status</span>
            <span className="font-bold text-[#D4AF37]/90">Invitation Only</span>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-gold-400/20 to-transparent" />
          <div className="flex gap-0.5 pt-1" aria-hidden>
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="h-7 flex-1 rounded-sm bg-white/6"
                style={{ opacity: 0.25 + (i % 4) * 0.12 }}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-6 flex items-center gap-2">
          <FlaskConical className="h-3.5 w-3.5 text-[#F3E5AB]/55" aria-hidden />
          <p className="text-[10px] font-medium text-white/32">
            Research Use Only · Not for human consumption
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gold-500/10 blur-3xl"
        aria-hidden
      />
    </motion.div>
  );
}

export function MembershipPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#070D0F] py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(111,184,173,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.07),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="luxury-slab relative overflow-hidden rounded-sm p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D4AF37]/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#6FB8AD]/5 blur-3xl" />
          <DnaHelixAccent className="pointer-events-none absolute right-8 top-1/2 hidden h-44 w-9 -translate-y-1/2 text-[#F3E5AB]/8 lg:block" />

          <div className="relative grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="brand-badge-premium metallic-label inline-flex rounded-sm border px-4 py-1.5 text-[11px] font-semibold">
                Invitation-Only Program
              </span>

              <h2 className="font-display mt-6 text-3xl font-bold leading-tight tracking-[-0.03em] text-neutral-100 md:text-4xl lg:text-[2.85rem]">
                Research Partner Program
              </h2>
              <p className="mt-3 font-display text-lg font-semibold text-[#F3E5AB]/80 md:text-xl">
                Exclusive Access for Serious Researchers
              </p>

              <p className="section-caption mt-5 max-w-lg md:text-[15px]">
                Join a select network of qualified researchers with priority
                fulfillment, early compound access, and dedicated support —
                designed for institutions that demand verified quality.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2.5">
                {HIGHLIGHT_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    className="inline-flex items-center rounded-sm border border-[#D4AF37]/15 bg-white/3 px-3.5 py-2 text-xs font-medium text-neutral-300 ring-1 ring-[#D4AF37]/8"
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-gold-400/75" aria-hidden />
                    {benefit}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 grid gap-3.5 sm:grid-cols-2">
                {BENEFITS_GRID.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      className="light-sweep-hover rounded-sm border border-white/7 bg-white/[0.025] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/22 hover:bg-white/4"
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.25 + i * 0.05 }}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#D4AF37]/15 bg-white/3">
                        <Icon className="h-4 w-4 text-[#F3E5AB]" aria-hidden />
                      </div>
                      <h3 className="mt-3.5 text-sm font-semibold text-neutral-100">
                        {benefit.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                        {benefit.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/membership"
                  className="btn-gold group relative inline-flex items-center gap-2.5 overflow-hidden rounded-sm px-9 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative">Apply for Partner Access</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                <p className="mt-4 text-xs text-white/32">
                  Limited enrollment · Research credentials required
                </p>
              </motion.div>
            </div>

            <div className="flex items-center justify-center lg:sticky lg:top-24">
              <MemberCredentialCard inView={inView} />
            </div>
          </div>

          <BrandSectionDivider className="relative mt-14 opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
