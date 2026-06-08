import { products } from "@/data/catalog/data";
import { BRAND_SAMPLE_COA_PDF } from "@/lib/brandAssets";
import type { COABatch } from "@/types/product";

export type CoaShowcaseItem = {
  id: string;
  slug: string;
  displayName: string;
  lotNumber: string;
  purityPercent: number;
  labName: string;
  testedDate: string;
  pdfUrl: string;
};

function resolveCoaPdfUrl(batch: COABatch): string {
  if (batch.pdfUrl.includes("/placeholders/")) {
    return BRAND_SAMPLE_COA_PDF;
  }
  return batch.pdfUrl;
}

/** Public catalog compounds with latest batch metadata for the homepage COA marquee */
export function getCoaShowcaseItems(): CoaShowcaseItem[] {
  return products
    .filter((p) => !p.isPrivate)
    .map((p) => {
      const batch = p.coaBatches.find((b) => b.isLatest) ?? p.coaBatches[0];
      return {
        id: p.id,
        slug: p.slug,
        displayName: p.displayName,
        lotNumber: batch?.lotNumber ?? "—",
        purityPercent: batch?.purityPercent ?? 99,
        labName: batch?.labName ?? "ISO 17025 Laboratory",
        testedDate: batch?.testedDate ?? "TBD",
        pdfUrl: batch ? resolveCoaPdfUrl(batch) : BRAND_SAMPLE_COA_PDF,
      };
    });
}
