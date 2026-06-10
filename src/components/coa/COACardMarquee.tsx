"use client";

import { useMemo, useState } from "react";
import { FileCheck } from "lucide-react";
import { CoaDownloadModal } from "@/components/products/CoaDownloadModal";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { coaEntryToBatch, type CoaLibraryEntry } from "@/lib/coaLibrary";
import { getCoaShowcaseItems } from "@/lib/coaShowcase";
import type { CoaShowcaseItem } from "@/lib/coaShowcase";

function CoaMarqueeCard({
  item,
  onOpen,
}: {
  item: CoaShowcaseItem;
  onOpen: (entry: CoaLibraryEntry) => void;
}) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className="coa-marquee-card group"
      onClick={() => onOpen(item)}
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
    </button>
  );
}

export function COACardMarquee() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => getCoaShowcaseItems(), []);
  const track = useMemo(() => [...items, ...items], [items]);
  const [modalEntry, setModalEntry] = useState<CoaLibraryEntry | null>(null);

  if (items.length === 0) return null;

  const batch = modalEntry ? coaEntryToBatch(modalEntry) : null;

  return (
    <>
      <div className="coa-marquee" aria-label={t("coa.marqueeLabel")}>
        <div
          className={`coa-marquee-track${reduceMotion ? " coa-marquee-track--static" : ""}`}
        >
          {track.map((item, index) => (
            <CoaMarqueeCard
              key={`${item.id}-${index}`}
              item={item}
              onOpen={setModalEntry}
            />
          ))}
        </div>
      </div>

      {modalEntry && batch ? (
        <CoaDownloadModal
          open
          onClose={() => setModalEntry(null)}
          productName={modalEntry.displayName}
          batch={batch}
        />
      ) : null}
    </>
  );
}
