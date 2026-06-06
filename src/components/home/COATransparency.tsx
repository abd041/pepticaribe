"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Microscope,
  FlaskConical,
  Dna,
  ClipboardList,
} from "lucide-react";
import { SectionBridge } from "@/components/ui/BrandMotifs";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { resetCardSpotlight, setCardSpotlight } from "@/lib/cardSpotlight";

const coaFields = [
  { num: "01", title: "Product Name", desc: "Must match order confirmation exactly" },
  { num: "02", title: "Batch Number", desc: "Linked to shipment for full traceability" },
  { num: "03", title: "Purity (HPLC)", desc: "Below 95% is a red flag — ours are ≥99%" },
  { num: "04", title: "Identity (MS)", desc: "Mass spectrometry confirms molecular weight" },
  { num: "05", title: "Lab Accreditation", desc: "ISO 17025 is the gold standard" },
  { num: "06", title: "Test Date", desc: "Older than 6 months should prompt re-test" },
];

const COA_TEST_RESULTS = [
  { slug: "glp-3-rt", name: "GLP-3 RT", lot: "GLP3132", purity: "99.954%" },
  { slug: "bpc-157", name: "BPC-157", lot: "BPC2401", purity: "99.12%" },
  { slug: "ghk-cu", name: "GHK-Cu", lot: "GHK1188", purity: "99.23%" },
] as const;

const TESTING_METHODS = [
  {
    title: "HPLC purity analysis",
    description:
      "High-performance liquid chromatography quantifies peptide purity on every released batch.",
  },
  {
    title: "Mass spectrometry",
    description:
      "MS identity confirmation verifies molecular weight and structural integrity.",
  },
  {
    title: "Identity verification",
    description:
      "Compound identity is cross-checked against reference standards before release.",
  },
  {
    title: "Batch documentation",
    description:
      "Full batch records, lot numbers, and test dates are archived for traceability.",
  },
] as const;

const sampleCOA = {
  product: "GLP-3 RT — 10MG",
  purity: "99.954%",
  lot: "GLP3132",
  tested: "Jan 21, 2026",
  lab: "Freedom Diagnostics",
};

const VERIFICATION_STATUS = [
  { icon: ShieldCheck, label: "ISO 17025 Accredited" },
  { icon: Microscope, label: "HPLC Verified" },
  { icon: CheckCircle2, label: "Identity Confirmed" },
];

export function COATransparency() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="art-chapter-verification section-dark relative overflow-hidden">
      <SectionAtmosphere variant="coa" className="premium-section-lg">
        <div className="editorial-container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionBridge className="mb-10" />

        {/* COA's Test Results — PDF page 11 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="coa-purity-badge inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Every single compound is over 99% purity
            </span>
            <div className="editorial-header-accent mx-auto mt-8" aria-hidden />
            <h2 className="font-display type-display-section mt-4">COA&apos;s</h2>
            <p className="type-scientific-meta mt-3 text-base !tracking-[0.12em]">Test Results</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COA_TEST_RESULTS.map((item, i) => (
              <motion.article
                key={item.slug}
                className="coa-result-card premium-card craft-card card-spotlight group flex flex-col overflow-hidden rounded-sm"
                onMouseMove={setCardSpotlight}
                onMouseLeave={resetCardSpotlight}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <div className="coa-document-placeholder flex aspect-[3/4] flex-col items-center justify-center gap-4 border-b border-white/6 bg-white/[0.03] px-6 py-10">
                  <FileText className="h-12 w-12 text-teal-400/50" strokeWidth={1.25} aria-hidden />
                  <div className="text-center">
                    <p className="technical-label text-[10px] font-bold tracking-[0.16em] text-white/40">
                      Certificate of Analysis
                    </p>
                    <p className="mt-2 font-display text-sm font-bold text-neutral-200">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-teal-400/70">
                      Lot {item.lot} · {item.purity}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-4 text-center">
                  <p className="font-semibold text-neutral-300">{item.name}</p>
                  <Link
                    href="/coa"
                    className="btn-catalog-teal mt-3 inline-flex w-full items-center justify-center rounded-full py-2.5 text-xs font-semibold"
                  >
                    View COA
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Certificate overview + dashboard */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="brand-badge-premium metallic-label inline-flex items-center gap-2 rounded-sm border px-4 py-1.5 text-[11px] font-semibold">
              <FlaskConical className="h-3.5 w-3.5" />
              Verification Center
            </span>
            <h2 className="font-display type-display-section mt-5 !text-[length:clamp(1.5rem,2vw+0.5rem,1.875rem)]">
              Certificate of Analysis
            </h2>
            <p className="section-caption mt-4 max-w-lg text-[15px] leading-relaxed">
              Every peptide batch is third-party tested for purity and identity.
              Tamper-evident, digitally verifiable results from ISO 17025
              accredited laboratories.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {VERIFICATION_STATUS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <div className="coa-verification-mark flex h-full items-center gap-3 rounded-sm border border-white/8 bg-white/[0.025] px-3 py-3">
                    <Icon className="h-4 w-4 shrink-0 text-[var(--ocean-blue)]" aria-hidden />
                    <span className="technical-label text-[9px] font-bold tracking-[0.12em] text-white/72">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/coa"
                className="btn-primary interaction-lift group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.08em]"
              >
                Browse COA Library
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                className="btn-platinum inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em]"
              >
                <Download className="h-4 w-4" />
                Download Sample
              </button>
            </div>
          </motion.div>

          <motion.div
            className="coa-dashboard-card relative overflow-hidden rounded-sm border border-white/8 p-6 md:p-8"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-4">
              <div>
                <p className="technical-label text-[10px] font-bold tracking-[0.14em] text-[var(--luxury-gold)]/75">
                  Quality Control · Latest Batch
                </p>
                <p className="font-display mt-1 text-lg font-bold text-[var(--soft-ivory)]">
                  {sampleCOA.product}
                </p>
              </div>
              <span className="rounded-full border border-[var(--luxury-gold)]/25 bg-[var(--luxury-gold)]/10 px-3 py-1 text-sm font-bold text-[var(--luxury-gold)]">
                {sampleCOA.purity}
              </span>
            </div>

            <div className="space-y-2">
              {[
                ["Lot #", sampleCOA.lot],
                ["Tested", sampleCOA.tested],
                ["Laboratory", sampleCOA.lab],
                ["Accreditation", "ISO 17025"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-sm border border-white/6 bg-black/20 px-4 py-3"
                >
                  <span className="technical-label text-[10px] font-medium tracking-[0.1em]">
                    {label}
                  </span>
                  <span className="text-sm font-semibold text-neutral-200">{value}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn-primary interaction-lift mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
            >
              <FileText className="h-4 w-4" />
              View Full COA
            </button>
          </motion.div>
        </div>

        {/* How to read a COA */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <p className="premium-eyebrow-gold text-center">
            Transparency
          </p>
          <h3 className="font-display type-display-section mt-3 text-center !text-[length:clamp(1.375rem,2vw+0.5rem,1.75rem)]">
            How to Read a COA
          </h3>
          <p className="section-caption mx-auto mt-3 max-w-xl text-center text-sm">
            Six fields every legitimate COA must include — missing any of these
            is a red flag.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coaFields.map((field, i) => (
              <div
                key={field.num}
                className="coa-field-card craft-card frosted-surface card-spotlight rounded-sm p-6"
                onMouseMove={setCardSpotlight}
                onMouseLeave={resetCardSpotlight}
              >
                <span className="font-display text-xl font-bold text-[var(--luxury-gold)]/40">
                  {field.num}
                </span>
                <h4 className="mt-3 font-semibold text-[var(--soft-ivory)]">{field.title}</h4>
                <p className="section-caption mt-1.5 text-[13px] leading-relaxed">
                  {field.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testing methods — PDF page 11 */}
        <motion.div
          className="art-lab-authority mt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="premium-eyebrow-gold text-center">
            Our Process
          </p>
          <h3 className="font-display type-display-section mt-3 text-center !text-[length:clamp(1.375rem,2vw+0.5rem,1.75rem)]">
            Testing Methods
          </h3>
          <p className="section-caption mx-auto mt-3 max-w-xl text-center text-sm">
            Every compound goes through multi-step verification before it ships.
            No exceptions.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TESTING_METHODS.map((method, i) => {
              const icons = [Microscope, Dna, ShieldCheck, ClipboardList];
              const Icon = icons[i] ?? FlaskConical;
              return (
                <div
                  key={method.title}
                  className="testing-method-card craft-card frosted-surface rounded-sm border border-white/7 p-7 md:p-8"
                >
                  <div className="premium-icon-well">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h4 className="mt-5 font-display text-lg font-bold text-[var(--soft-ivory)]">
                    {method.title}
                  </h4>
                  <p className="section-caption mt-2 text-[14px] leading-relaxed">
                    {method.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
