"use client";

import Link from "next/link";
import { ArrowUpRight, Download, FileCheck } from "lucide-react";
import { COALibraryVialThumb } from "@/components/coa/COALibraryVialThumb";
import { useLanguage } from "@/context/LanguageContext";
import { resolveCompoundProfile } from "@/lib/productImagery";
import type { CoaLibraryEntry } from "@/lib/coaLibrary";

type COALibraryCardProps = {
  entry: CoaLibraryEntry;
  index: number;
};

export function COALibraryCard({ entry, index }: COALibraryCardProps) {
  const { t } = useLanguage();
  const profile = resolveCompoundProfile(entry.slug, entry.imageUrl, entry.category);

  return (
    <article className="coa-library-card" data-slug={entry.slug}>
      <Link
        href={`/products/${entry.slug}`}
        className="coa-library-card-media"
        aria-label={`${entry.displayName} — ${t("coa.viewProduct")}`}
      >
        <span className="coa-library-card-seal" aria-hidden>
          <FileCheck className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <COALibraryVialThumb
          src={profile.exhibit.src}
          alt={entry.displayName}
          priority={index < 4}
        />
      </Link>

      <div className="coa-library-card-body">
        <div className="coa-library-card-head">
          <div>
            <p className="coa-library-card-eyebrow">{t("coa.cardEyebrow")}</p>
            <h2 className="coa-library-card-title">
              <Link href={`/products/${entry.slug}`}>{entry.displayName}</Link>
            </h2>
          </div>
          <span className="coa-library-card-badge">{t("coa.isoBadge")}</span>
        </div>

        <dl className="coa-library-card-meta">
          <div>
            <dt>{t("coa.lotLabel")}</dt>
            <dd>{entry.lotNumber}</dd>
          </div>
          <div>
            <dt>{t("coa.purityLabel")}</dt>
            <dd className="coa-library-card-purity">{entry.purityPercent}%+</dd>
          </div>
          <div>
            <dt>{t("coa.testedLabel")}</dt>
            <dd>{entry.testedDate}</dd>
          </div>
          <div>
            <dt>{t("coa.labLabel")}</dt>
            <dd>{entry.labName}</dd>
          </div>
        </dl>

        <div className="coa-library-card-actions">
          <a
            href={entry.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ref-product-btn-gold coa-library-card-download"
          >
            <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {t("coa.downloadCoa")}
            <ArrowUpRight className="h-3 w-3 shrink-0 opacity-80" aria-hidden />
          </a>
          <Link href={`/products/${entry.slug}`} className="coa-library-card-product-link">
            {t("coa.viewProduct")}
            <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
