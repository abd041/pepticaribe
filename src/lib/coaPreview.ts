import type { COABatch } from "@/types/product";
import { resolveCoaPdfUrl } from "@/lib/coaLibrary";

/** Optional raster preview — used when batch supplies previewImageUrl */
export function resolveCoaPreviewImageUrl(batch: COABatch): string | undefined {
  const url = batch.previewImageUrl?.trim();
  return url || undefined;
}

/** PDF URL for inline viewing (toolbar hidden where supported) */
export function buildCoaPdfViewerUrl(pdfUrl: string): string {
  return `${pdfUrl}#toolbar=0&navpanes=0`;
}

export function resolveCoaViewerPdfUrl(batch: COABatch): string {
  return buildCoaPdfViewerUrl(resolveCoaPdfUrl(batch));
}

export function getCoaDownloadFilename(productName: string, batch: COABatch): string {
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const lot = batch.lotNumber.replace(/[^a-zA-Z0-9_-]+/g, "-");
  return `${slug || "product"}-coa-${lot || "batch"}.pdf`;
}
