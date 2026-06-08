import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const REQUIRED_PNG = [
  "brand/pepticaribe-logo.svg",
  "brand/pepticaribe-logo.png",
  "hero/hero-showcase-reference.png",
  "hero/hero-background.png",
  "products/exhibit/bacteriostatic-water.png",
  "products/exhibit/glp-3-rt.png",
  "products/exhibit/glp-2-t.png",
  "products/exhibit/ghk-cu.png",
  "products/exhibit/wolverine.png",
  "products/exhibit/bpc-157.png",
  "products/exhibit/mots-c.png",
  "products/exhibit/nad-plus.png",
  "products/exhibit/cjc-1295-ipamorelin.png",
  "products/exhibit/ss-31.png",
  "products/exhibit/kpv.png",
  "products/exhibit/glutathione.png",
  "products/exhibit/5-amino-1mq.png",
  "products/exhibit/tesamorelin.png",
  "products/exhibit/klow.png",
  "products/exhibit/adamax.png",
  "products/exhibit/semax.png",
  "products/exhibit/selank.png",
  "products/exhibit/melanotan-ii.png",
  "products/exhibit/dsip.png",
  "products/exhibit/pt-141.png",
];

function checkDerivatives(pngRel) {
  const base = pngRel.replace(/\.png$/i, "");
  return {
    webp: existsSync(join(publicDir, `${base}.webp`)),
    avif: existsSync(join(publicDir, `${base}.avif`)),
  };
}

const missing = REQUIRED_PNG.filter((rel) => !existsSync(join(publicDir, rel)));
const present = REQUIRED_PNG.length - missing.length;

console.log(`Asset check: ${present}/${REQUIRED_PNG.length} critical files present\n`);

if (missing.length) {
  console.log("Missing:");
  for (const rel of missing) console.log(`  - public/${rel}`);
  console.log("\nRun: npm run assets:build");
  process.exit(1);
}

const pngAssets = REQUIRED_PNG.filter((rel) => rel.endsWith(".png"));
const missingOptimized = pngAssets.filter((rel) => {
  const { webp, avif } = checkDerivatives(rel);
  return !webp || !avif;
});

if (missingOptimized.length) {
  console.log("Missing WebP/AVIF derivatives:");
  for (const rel of missingOptimized) console.log(`  - public/${rel} → run npm run assets:build`);
  process.exit(1);
}

console.log("All critical assets present (PNG + WebP + AVIF).");
