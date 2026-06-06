import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";

// Dynamic import of compiled data via JSON extraction from source
// We parse products.ts exports by evaluating a minimal extract
import { pathToFileURL } from "url";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Use dynamic import of TS — fallback: run via node after build
// For reliability, import from transpiled path using tsx if available
let products, getPublicProducts, getPrivateProducts;

try {
  const mod = await import(pathToFileURL(join(root, "src/data/products.ts")).href);
  products = mod.products;
  getPublicProducts = mod.getPublicProducts;
  getPrivateProducts = mod.getPrivateProducts;
} catch {
  console.error("Run with: npx tsx scripts/audit-products.mjs");
  process.exit(1);
}

function findDuplicates(arr) {
  const seen = new Map();
  for (const v of arr) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()]
    .filter(([, c]) => c > 1)
    .map(([value, count]) => ({ value, count }));
}

const ids = products.map((p) => p.id);
const slugs = products.map((p) => p.slug);
const parentSkus = products.map((p) => p.sku);
const variantSkus = products.flatMap((p) => p.variants.map((v) => v.sku));
const variantIds = products.flatMap((p) => p.variants.map((v) => v.id));
const allSkus = [...parentSkus, ...variantSkus];

const dupIds = findDuplicates(ids);
const dupSlugs = findDuplicates(slugs);
const dupSkus = findDuplicates(allSkus);
const dupVariantIds = findDuplicates(variantIds);
const dupComposite = findDuplicates(products.map((p) => `${p.name}|${p.sku}`));

const publicProducts = getPublicProducts();
const publicMissingImage = publicProducts.filter((p) => !p.image?.trim());
const missingDescription = products.filter((p) => !p.description?.trim());
const variantsMissingPrice = products.flatMap((p) =>
  p.variants
    .filter((v) => v.price == null || v.price <= 0)
    .map((v) => ({ slug: p.slug, variantSku: v.sku, price: v.price }))
);
const productsNoVariants = products.filter((p) => p.variants.length === 0);

const checks = [
  {
    name: "All 21 products present",
    pass: products.length === 21,
    detail: `${products.length} products`,
  },
  {
    name: "Unique product IDs",
    pass: dupIds.length === 0,
    detail: dupIds.length ? JSON.stringify(dupIds) : `${ids.length} IDs, all unique`,
  },
  {
    name: "Unique product slugs",
    pass: dupSlugs.length === 0,
    detail: dupSlugs.length ? JSON.stringify(dupSlugs) : `${slugs.length} slugs, all unique`,
  },
  {
    name: "Unique SKUs (parent + variant)",
    pass: dupSkus.length === 0,
    detail: dupSkus.length ? JSON.stringify(dupSkus) : `${allSkus.length} SKUs, all unique`,
  },
  {
    name: "Unique variant IDs",
    pass: dupVariantIds.length === 0,
    detail: dupVariantIds.length ? JSON.stringify(dupVariantIds) : `${variantIds.length} variant IDs, all unique`,
  },
  {
    name: "Every public product has hero image",
    pass: publicMissingImage.length === 0,
    detail: publicMissingImage.length ? JSON.stringify(publicMissingImage.map((p) => p.slug)) : "13/13 public products have images",
  },
  {
    name: "Every product has description",
    pass: missingDescription.length === 0,
    detail: missingDescription.length ? JSON.stringify(missingDescription.map((p) => p.slug)) : "21/21 have descriptions",
  },
  {
    name: "Every variant has pricing (> 0)",
    pass: variantsMissingPrice.length === 0,
    detail: variantsMissingPrice.length ? JSON.stringify(variantsMissingPrice) : `${variantIds.length}/${variantIds.length} variants priced`,
  },
  {
    name: "No duplicate products (name + parent SKU)",
    pass: dupComposite.length === 0,
    detail: dupComposite.length ? JSON.stringify(dupComposite) : "No duplicates",
  },
  {
    name: "All products have >= 1 variant",
    pass: productsNoVariants.length === 0,
    detail: productsNoVariants.length ? JSON.stringify(productsNoVariants.map((p) => p.slug)) : "21/21 have variants",
  },
];

const allPass = checks.every((c) => c.pass);
const today = new Date().toISOString().split("T")[0];

const lines = [
  "# PeptiCaribe — Product Data Audit",
  "",
  "**Source:** `src/data/products.ts`",
  `**Generated:** ${today}`,
  `**Result:** ${allPass ? "✅ ALL CHECKS PASSED" : "❌ ISSUES FOUND"}`,
  "",
  "## Summary",
  "",
  "| Metric | Value |",
  "|--------|-------|",
  `| Total products | ${products.length} |`,
  `| Public products | ${publicProducts.length} |`,
  `| Private products | ${getPrivateProducts().length} |`,
  `| Total variants | ${variantIds.length} |`,
  `| Parent SKUs | ${parentSkus.length} |`,
  `| Variant SKUs | ${variantSkus.length} |`,
  `| Total SKUs (parent + variant) | ${allSkus.length} |`,
  "",
  "## Verification Checks",
  "",
  "| Check | Status | Details |",
  "|-------|--------|---------|",
  ...checks.map((c) => {
    const status = c.pass ? "✅ Pass" : "❌ Fail";
    return `| ${c.name} | ${status} | ${c.detail} |`;
  }),
  "",
  "## Product Inventory",
  "",
  "| # | ID | Slug | Display Name | Parent SKU | Private | Variants | Hero Image | Video | Description |",
  "|---|-----|------|--------------|------------|---------|----------|------------|-------|-------------|",
  ...products.map((p, i) =>
    `| ${i + 1} | \`${p.id}\` | \`${p.slug}\` | ${p.displayName} | \`${p.sku}\` | ${p.isPrivate ? "Yes" : "No"} | ${p.variants.length} | \`${p.image}\` | ${p.video ? `\`${p.video}\`` : "—"} | ${p.description.length} chars |`
  ),
  "",
  "## Variant Pricing",
  "",
  "| Product Slug | Variant ID | Variant SKU | Size | Price | Image |",
  "|--------------|------------|-------------|------|-------|-------|",
  ...products.flatMap((p) =>
    p.variants.map(
      (v) =>
        `| \`${p.slug}\` | \`${v.id}\` | \`${v.sku}\` | ${v.sizeLabel} | $${v.price} | \`${v.image}\` |`
    )
  ),
  "",
  `## SKU Registry (${allSkus.length} total)`,
  "",
  "### Parent SKUs (21)",
  ...parentSkus.map((s) => `- \`${s}\``),
  "",
  "### Variant SKUs (26)",
  ...variantSkus.map((s) => `- \`${s}\``),
  "",
  "## ID Registry (21)",
  "",
  ...ids.map((id) => `- \`${id}\``),
  "",
  "## Slug Registry (21)",
  "",
  ...slugs.map((s) => `- \`${s}\``),
  "",
  "## Data Quality Notes",
  "",
  "| Note | Severity |",
  "|------|----------|",
  "| BAC Water pricing ($15) from cart mockup (page 10), not pricing doc (pages 20–23) | ⚠️ Review |",
  "| GLP-2 T 60 mg variant mapped to `glp-2-t-40mg.png` — no 60 mg image asset | ⚠️ Asset gap |",
  "| All COA paths are placeholders — no PDFs on disk | ℹ️ Expected |",
  "| `original.png` imported but not referenced in catalog | ℹ️ Unmapped |",
  "",
];

writeFileSync(join(root, "DATA_AUDIT.md"), lines.join("\n"));
console.log("Written DATA_AUDIT.md");
console.log("All checks passed:", allPass);
checks.forEach((c) => console.log(c.pass ? "PASS" : "FAIL", c.name));
