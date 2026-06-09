"use client";

import Image from "next/image";
import type { COABatch } from "@/types/product";
import { resolveCoaPreviewImageUrl, resolveCoaViewerPdfUrl } from "@/lib/coaPreview";
import { useLanguage } from "@/context/LanguageContext";

type ProductCoaDocumentPreviewProps = {
  productName: string;
  batch: COABatch;
  variant?: "carousel" | "modal";
  className?: string;
};

/** Real COA preview — raster image when available, otherwise embedded PDF */
export function ProductCoaDocumentPreview({
  productName,
  batch,
  variant = "carousel",
  className = "",
}: ProductCoaDocumentPreviewProps) {
  const { t } = useLanguage();
  const previewImage = resolveCoaPreviewImageUrl(batch);
  const pdfViewerUrl = resolveCoaViewerPdfUrl(batch);
  const title = `${productName} — ${t("coa.previewTitle")}`;

  if (previewImage) {
    return (
      <div
        className={`product-coa-document-preview product-coa-document-preview--image product-coa-document-preview--${variant} ${className}`.trim()}
      >
        <Image
          src={previewImage}
          alt={title}
          width={680}
          height={880}
          className="product-coa-document-image"
          sizes={variant === "modal" ? "(max-width: 640px) 90vw, 36rem" : "(max-width: 640px) 80vw, 18rem"}
          priority={variant === "modal"}
        />
      </div>
    );
  }

  return (
    <div
      className={`product-coa-document-preview product-coa-document-preview--pdf product-coa-document-preview--${variant} ${className}`.trim()}
    >
      <iframe
        src={pdfViewerUrl}
        title={title}
        className="product-coa-document-pdf"
        loading={variant === "modal" ? "eager" : "lazy"}
      />
    </div>
  );
}
