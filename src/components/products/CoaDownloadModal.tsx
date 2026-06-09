"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";
import type { COABatch } from "@/types/product";
import { resolveCoaPdfUrl } from "@/lib/coaLibrary";
import { getCoaDownloadFilename } from "@/lib/coaPreview";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCoaDocumentPreview } from "@/components/products/ProductCoaDocumentPreview";

type CoaDownloadModalProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  batch: COABatch;
};

export function CoaDownloadModal({
  open,
  onClose,
  productName,
  batch,
}: CoaDownloadModalProps) {
  const { t } = useLanguage();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const pdfUrl = resolveCoaPdfUrl(batch);
  const downloadFilename = getCoaDownloadFilename(productName, batch);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="coa-download-modal" role="presentation">
      <button
        type="button"
        className="coa-download-modal-backdrop"
        aria-label={t("products.coaModalClose")}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="coa-download-modal-panel coa-download-modal-panel--document"
      >
        <header className="coa-download-modal-header">
          <div>
            <p className="coa-download-modal-eyebrow">{t("coa.previewEyebrow")}</p>
            <h2 id={titleId} className="coa-download-modal-title font-display">
              {productName}
            </h2>
          </div>
          <button
            type="button"
            className="coa-download-modal-close"
            onClick={onClose}
            aria-label={t("products.coaModalClose")}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="coa-download-modal-preview coa-download-modal-preview--document">
          <ProductCoaDocumentPreview
            productName={productName}
            batch={batch}
            variant="modal"
          />
        </div>

        <dl className="coa-download-modal-meta">
          <div>
            <dt>{t("products.detailLot")}</dt>
            <dd>{batch.lotNumber}</dd>
          </div>
          <div>
            <dt>{t("featured.specPurity")}</dt>
            <dd>{batch.purityPercent}%+</dd>
          </div>
          <div>
            <dt>{t("products.detailLab")}</dt>
            <dd>{batch.labName}</dd>
          </div>
          <div>
            <dt>{t("coa.testedLabel")}</dt>
            <dd>{batch.testedDate}</dd>
          </div>
        </dl>

        <div className="coa-download-modal-actions">
          <a
            href={pdfUrl}
            download={downloadFilename}
            className="coa-download-modal-download"
          >
            <Download className="h-4 w-4" aria-hidden />
            {t("products.detailDownloadCoa")}
          </a>
          <button type="button" className="coa-download-modal-dismiss" onClick={onClose}>
            {t("products.coaModalClose")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
