"use client";

import { useMemo } from "react";
import { FileCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getCoaShowcaseItems } from "@/lib/coaShowcase";
import type { CoaShowcaseItem } from "@/lib/coaShowcase";

function CoaMarqueeCard({ item }: { item: CoaShowcaseItem }) {
  const { t } = useLanguage();

  return (
    <a
      href={item.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="coa-marquee-card group"
      aria-label={`${item.displayName} — ${t("coa.openCertificate")}`}
    >
      <div className="coa-marquee-card-icon" aria-hidden>
        <FileCheck className="h-4 w-4" strokeWidth={2} />
      </div>
      <p className="coa-marquee-card-eyebrow">{t("coa.cardEyebrow")}</p>
      <p className="coa-marquee-card-title">{item.displayName}</p>
      <dl className="coa-marquee-card-meta">
        <div>
          <dt>{t("coa.lotLabel")}</dt>
          <dd>{item.lotNumber}</dd>
        </div>
        <div>
          <dt>{t("coa.purityLabel")}</dt>
          <dd>{item.purityPercent}%+</dd>
        </div>
      </dl>
      <span className="coa-marquee-card-badge">{t("coa.isoBadge")}</span>
    </a>
  );
}

export function COACardMarquee() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => getCoaShowcaseItems(), []);
  const track = useMemo(() => [...items, ...items], [items]);

  if (items.length === 0) return null;

  return (
    <div className="coa-marquee" aria-label={t("coa.marqueeLabel")}>
      <div
        className={`coa-marquee-track${reduceMotion ? " coa-marquee-track--static" : ""}`}
      >
        {track.map((item, index) => (
          <CoaMarqueeCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
