import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const REQUIRED = [
  "brand/pepticaribe-logo.svg",
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
];

const missing = REQUIRED.filter((rel) => !existsSync(join(publicDir, rel)));
const present = REQUIRED.length - missing.length;

console.log(`Asset check: ${present}/${REQUIRED.length} critical files present\n`);

if (missing.length) {
  console.log("Missing:");
  for (const rel of missing) console.log(`  - public/${rel}`);
  console.log("\nRun: npm run assets:placeholders");
  process.exit(1);
}

console.log("All critical assets present.");
