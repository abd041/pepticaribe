import { products } from "@/data/catalog/data";
import { compareCatalogOrder } from "@/data/catalog/order";
import { BRAND_SAMPLE_COA_PDF } from "@/lib/brandAssets";
import { getExhibitImagePath } from "@/lib/productImagery";
import type { COABatch, Product, ProductCategory } from "@/types/product";

export type CoaLibraryEntry = {
  id: string;
  slug: string;
  displayName: string;
  category: ProductCategory;
  imageUrl: string;
  lotNumber: string;
  purityPercent: number;
  testedDate: string;
  labName: string;
  pdfUrl: string;
};

export function resolveCoaPdfUrl(batch: COABatch): string {
  if (batch.pdfUrl.includes("/placeholders/")) {
    return BRAND_SAMPLE_COA_PDF;
  }
  return batch.pdfUrl;
}

function toLibraryEntry(product: Product): CoaLibraryEntry | null {
  const batch = product.coaBatches.find((b) => b.isLatest) ?? product.coaBatches[0];
  if (!batch) return null;

  return {
    id: product.id,
    slug: product.slug,
    displayName: product.displayName,
    category: product.category,
    imageUrl: getExhibitImagePath(product.slug) ?? product.image,
    lotNumber: batch.lotNumber,
    purityPercent: batch.purityPercent,
    testedDate: batch.testedDate,
    labName: batch.labName,
    pdfUrl: resolveCoaPdfUrl(batch),
  };
}

/** Map a library row to batch shape for the COA download modal */
export function coaEntryToBatch(entry: CoaLibraryEntry): COABatch {
  return {
    lotNumber: entry.lotNumber,
    purityPercent: entry.purityPercent,
    labeledWeight: "—",
    actualWeight: "—",
    testedDate: entry.testedDate,
    pdfUrl: entry.pdfUrl,
    labName: entry.labName,
    isLatest: true,
  };
}

/** Searchable COA library rows — one latest batch per compound, client catalog order */
export function getCoaLibraryEntries(): CoaLibraryEntry[] {
  return products
    .filter((p) => !p.isPrivate)
    .map(toLibraryEntry)
    .filter((entry): entry is CoaLibraryEntry => entry !== null)
    .sort((a, b) => compareCatalogOrder(a.slug, b.slug));
}
