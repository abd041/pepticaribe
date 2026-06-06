"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Lock,
  Users,
} from "lucide-react";
import {
  BrandSectionDivider,
  DnaHelixAccent,
  SectionBridge,
} from "@/components/ui/BrandMotifs";

const BENEFITS = [
  "New Compound Announcements",
  "Batch & COA Notifications",
  "Research Updates",
  "Industry Insights",
] as const;

export function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-linear-to-b from-[#070D0F] via-[#0B1519] to-[#070D0F] py-28 md:py-36"
    >
      <div className="section-atmosphere-top pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(212,175,55,0.06),transparent_55%)]" />
      <DnaHelixAccent className="pointer-events-none absolute left-[6%] top-[25%] hidden h-32 w-7 text-[#F3E5AB]/5 md:block" />
      <DnaHelixAccent className="pointer-events-none absolute right-[8%] bottom-[20%] hidden h-24 w-5 text-[#D4AF37]/5 md:block" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionBridge className="mb-12" />

        <motion.div
          className="briefing-access-card relative overflow-hidden rounded-sm border border-white/8 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl md:p-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#F3E5AB]/30 to-transparent" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-[#D4AF37]/18 bg-white/4 ring-2 ring-[#D4AF37]/12">
            <Lock className="h-6 w-6 text-[#F3E5AB]" aria-hidden />
          </div>

          <span className="brand-badge-premium metallic-label mt-7 inline-flex rounded-sm border px-4 py-1.5 text-[11px] font-semibold">
            Private Research Briefing
          </span>

          <h2 className="font-display mt-6 text-2xl font-bold leading-tight tracking-[-0.03em] text-neutral-100 md:text-4xl">
            Research Intelligence Access
          </h2>

          <BrandSectionDivider className="mx-auto mt-6 max-w-[220px] opacity-45" />

          <p className="section-caption mx-auto mt-5 max-w-lg md:text-[15px]">
            Curated compound releases, batch verification alerts, and
            institutional research insights — delivered to qualified researchers.
          </p>

          <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-3 text-left sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
            {BENEFITS.map((benefit, i) => (
              <motion.li
                key={benefit}
                className="flex items-center gap-3 text-sm text-neutral-300"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-[#D4AF37]/15 bg-white/3 ring-1 ring-[#D4AF37]/10">
                  <Check className="h-3 w-3 text-[#F3E5AB]" aria-hidden />
                </span>
                {benefit}
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 inline-flex items-center gap-2.5 rounded-sm border border-[#D4AF37]/12 bg-white/3 px-5 py-2 text-xs font-medium text-neutral-500">
            <Users className="h-3.5 w-3.5 text-[#F3E5AB]/65" aria-hidden />
            <span>
              <span className="font-semibold text-white/68">1,200+</span>{" "}
              researchers on the briefing list
            </span>
          </div>

          {submitted ? (
            <motion.div
              className="mx-auto mt-12 max-w-md rounded-sm border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-8 py-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              role="status"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-[#D4AF37]/12 ring-2 ring-[#D4AF37]/20">
                <Check className="h-6 w-6 text-[#F3E5AB]" aria-hidden />
              </div>
              <p className="font-display mt-5 text-lg font-bold text-neutral-100">
                Briefing access confirmed
              </p>
              <p className="section-caption mt-2 text-[13px]">
                Research intelligence updates will be sent to{" "}
                <span className="font-medium text-[#F3E5AB]/90">{email}</span>
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 max-w-xl space-y-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@institution.edu"
                required
                aria-label="Email address"
                className="w-full rounded-sm border border-slate-800 bg-[#070D0F]/80 px-6 py-4.5 text-base text-neutral-100 placeholder:text-neutral-600 outline-none transition-all duration-300 focus:border-[#D4AF37]/50 focus:bg-[#070D0F] focus:ring-0"
              />
              <button
                type="submit"
                className="btn-gold group flex w-full items-center justify-center gap-2.5 rounded-sm px-8 py-4.5 text-base font-bold uppercase tracking-[0.1em] transition-all duration-300"
              >
                Request Briefing Access
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </button>
            </form>
          )}

          <p className="mx-auto mt-7 max-w-md text-xs leading-relaxed text-neutral-600">
            For qualified researchers and institutions. By requesting access you
            agree to our Privacy Policy. Research Use Only communications.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
            <BookOpen className="h-3 w-3" aria-hidden />
            Institutional research updates only
          </div>
        </motion.div>
      </div>
    </section>
  );
}
