import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

/** 1×1 transparent PNG */
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

const PLACEHOLDER_PATHS = [
  "brand/pepticaribe-logo.png",
  "hero/hero-showcase-reference.png",
  "hero/hero-background.png",
  "products/exhibit/glp-3-rt.png",
  "products/exhibit/glp-2-t.png",
  "products/exhibit/ghk-cu.png",
  "products/exhibit/wolverine.png",
  "products/exhibit/bpc-157.png",
  "products/exhibit/mots-c.png",
  "products/exhibit/nad-plus.png",
  "products/exhibit/cjc-1295-ipamorelin.png",
  "products/glp-3-rt.png",
  "products/glp-2-t.png",
  "products/bpc-157.png",
  "products/ghk-cu.png",
  "products/mots-c.png",
  "products/nad-plus.png",
  "products/bpc-157-tb-500.png",
  "products/cjc-1295-ipamorelin.png",
  "products/bac-water.png",
  "products/bac-water-30ml.png",
];

let created = 0;
let skipped = 0;

for (const rel of PLACEHOLDER_PATHS) {
  const full = join(publicDir, rel);
  if (existsSync(full)) {
    skipped += 1;
    continue;
  }
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, PLACEHOLDER_PNG);
  created += 1;
  console.log(`Created placeholder: public/${rel}`);
}

console.log(`\nDone — ${created} created, ${skipped} already present.`);
console.log("Replace placeholders with optimized production assets when available.");
