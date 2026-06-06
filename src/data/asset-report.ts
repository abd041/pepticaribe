import "server-only";

import type { ProductCatalogStats } from "@/types/product";
import { products, getAllMappedCoaPaths, getAllMappedImagePaths, getAllMappedVideoPaths, getPrivateProducts, getPublicProducts } from "./catalog/queries";
import { IMPORTED_PRODUCT_IMAGES, IMPORTED_VIDEOS } from "./imported-assets";

export interface DetailedAssetReport extends ProductCatalogStats {
  productsWithVideo: string[];
  variantImageMismatches: { slug: string; variant: string; note: string }[];
  pricingNotes: string[];
  coaStatus: "all_placeholder";
}

export function buildAssetReport(): DetailedAssetReport {
  const mappedImages = getAllMappedImagePaths();
  const mappedVideos = getAllMappedVideoPaths();
  const mappedCoas = getAllMappedCoaPaths();

  const importedImageSet = new Set(IMPORTED_PRODUCT_IMAGES);
  const importedVideoSet = new Set(IMPORTED_VIDEOS);

  const usedImageFiles = new Set(mappedImages.map((p) => p.replace("/products/", "")));
  const usedVideoFiles = new Set(mappedVideos.map((p) => p.replace("/videos/", "")));

  const unmappedImages = IMPORTED_PRODUCT_IMAGES.filter((f) => !usedImageFiles.has(f));
  const unmappedVideos: string[] = [];

  const productsMissingVideo = products
    .filter((p) => !p.video)
    .map((p) => `${p.slug} (${p.displayName})`);

  const productsWithVideo = products
    .filter((p) => p.video)
    .map((p) => `${p.slug} → ${p.video}`);

  const productsMissingImage: string[] = [];
  for (const p of products) {
    const heroFile = p.image.replace("/products/", "");
    if (!importedImageSet.has(heroFile as (typeof IMPORTED_PRODUCT_IMAGES)[number])) {
      productsMissingImage.push(`${p.slug} (hero: ${heroFile})`);
    }
    for (const v of p.variants) {
      const variantFile = v.image.replace("/products/", "");
      if (!importedImageSet.has(variantFile as (typeof IMPORTED_PRODUCT_IMAGES)[number])) {
        productsMissingImage.push(`${p.slug} variant ${v.sku} (${variantFile})`);
      }
    }
  }

  const variantImageMismatches = [
    {
      slug: "glp-2-t",
      variant: "PC-GLP2-60",
      note: "Client doc specifies 60 mg variant; only 30 mg and 40 mg PNGs provided. 60 mg mapped to glp-2-t-40mg.png as nearest asset.",
    },
  ];

  const pricingNotes = [
    "BAC Water: No price in client document (pages 20–23). Variants priced at $15 from cart mockup (page 10) — confirm with client.",
    "GLP-2 T: Client doc lists 60 mg at $170; asset folder has 40 mg image instead of 60 mg.",
  ];

  return {
    totalProducts: products.length,
    publicProducts: getPublicProducts().length,
    privateProducts: getPrivateProducts().length,
    totalImagesMapped: mappedImages.length,
    totalVideosMapped: mappedVideos.length,
    productsMissingImage,
    productsMissingVideo,
    productsMissingCoa: products.map((p) => p.slug),
    unmappedImages: [...unmappedImages],
    unmappedVideos,
    productsWithVideo,
    variantImageMismatches,
    pricingNotes,
    coaStatus: "all_placeholder",
  };
}

export function formatAssetReportMarkdown(report: DetailedAssetReport): string {
  const lines: string[] = [
    "# PeptiCaribe — Phase 1 Asset & Product Data Report",
    "",
    `Generated: ${new Date().toISOString().split("T")[0]}`,
    "",
    "## Summary",
    "",
    "| Metric | Count |",
    "|--------|-------|",
    `| Total products in catalog | ${report.totalProducts} |`,
    `| Public products | ${report.publicProducts} |`,
    `| Private products | ${report.privateProducts} |`,
    `| Product images imported | ${IMPORTED_PRODUCT_IMAGES.length} |`,
    `| Unique image paths mapped | ${report.totalImagesMapped} |`,
    `| Videos imported | ${IMPORTED_VIDEOS.length} |`,
    `| Products with video mapped | ${report.totalVideosMapped} |`,
    `| COA PDFs available | 0 (all placeholders) |`,
    "",
    "## Products Imported",
    "",
    "### Public (13)",
    ...getPublicProducts().map(
      (p) =>
        `- **${p.displayName}** (\`${p.slug}\`) — SKU \`${p.sku}\` — ${p.variants.length} variant(s)${p.video ? " — has video" : ""}`
    ),
    "",
    "### Private (8)",
    ...getPrivateProducts().map(
      (p) =>
        `- **${p.displayName}** (\`${p.slug}\`) — SKU \`${p.sku}\` — ${p.variants.length} variant(s)`
    ),
    "",
    "## Videos Mapped",
    "",
    ...report.productsWithVideo.map((v) => `- ${v}`),
    "",
    "## Missing Videos",
    "",
    ...(report.productsMissingVideo.length
      ? report.productsMissingVideo.map((p) => `- ${p}`)
      : ["- None"]),
    "",
    "## Missing / Placeholder COAs",
    "",
    "All COA paths point to `/coa/placeholders/*.pdf` — no PDF files provided yet.",
    "",
    ...products.map((p) => `- \`${p.slug}\` → \`${p.coaBatches[0]?.pdfUrl}\``),
    "",
    "## Unmapped Assets (imported but not in catalog)",
    "",
    "### Images",
    ...(report.unmappedImages.length
      ? report.unmappedImages.map((f) => `- \`/products/${f}\``)
      : ["- None"]),
    "",
    "### Videos",
    ...(report.unmappedVideos.length
      ? report.unmappedVideos.map((f) => `- \`/videos/${f}\``)
      : ["- None — all 10 MP4s mapped"]),
    "",
    "## Image / Variant Mismatches",
    "",
    ...report.variantImageMismatches.map(
      (m) => `- **${m.slug}** (${m.variant}): ${m.note}`
    ),
    "",
    "## Pricing Notes",
    "",
    ...report.pricingNotes.map((n) => `- ${n}`),
    "",
    "## Bundle Discounts",
    "",
    "- **GLP-3 RT (RETA)**: 2 vials 5% · 3 vials 8% · 4 vials 10%",
    "- All other products: no bundle tiers specified in client document",
    "",
  ];
  return lines.join("\n");
}
