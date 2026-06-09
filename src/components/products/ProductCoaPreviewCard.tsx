"use client";

import { Maximize2 } from "lucide-react";
import type { COABatch } from "@/types/product";
import { ProductCoaDocumentPreview } from "@/components/products/ProductCoaDocumentPreview";
import { useLanguage } from "@/context/LanguageContext";

type ProductCoaPreviewCardProps = {
  productName: string;
  batch: COABatch;
  variant?: "carousel" | "modal";
  onActivate?: () => void;
  className?: string;
};

/** COA test-result preview — document/image with tap-to-expand on carousel */
export function ProductCoaPreviewCard({
  productName,
  batch,
  variant = "carousel",
  onActivate,
  className = "",
}: ProductCoaPreviewCardProps) {
  const { t } = useLanguage();
  const interactive = Boolean(onActivate) && variant === "carousel";
  const expandLabel = t("products.coaExpand");

  const content = (
    <div className="product-coa-preview-frame">
      <div className="product-coa-preview-document-wrap">
        <ProductCoaDocumentPreview
          productName={productName}
          batch={batch}
          variant={variant}
        />
      </div>

      {variant === "carousel" ? (
        <p className="product-coa-preview-expand">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden />
          {expandLabel}
        </p>
      ) : null}

      <div className="product-coa-preview-seal" aria-hidden />
    </div>
  );

  if (!interactive) {
    return <div className={`product-coa-preview ${className}`}>{content}</div>;
  }

  return (
    <button
      type="button"
      className={`product-coa-preview product-coa-preview--interactive ${className}`.trim()}
      onClick={onActivate}
      aria-label={`${productName} — ${expandLabel}`}
    >
      {content}
    </button>
  );
}
