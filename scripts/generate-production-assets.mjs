/**
 * Generate branded PNG placeholders at production dimensions + WebP/AVIF derivatives.
 * Replace PNGs with real photography, then re-run: npm run assets:build
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const BRAND = {
  navy: "#07141a",
  teal: "#0ea5c6",
  gold: "#e8b547",
  ivory: "#faf7f0",
};

/** Critical assets with target dimensions and labels */
const SPECS = [
  { rel: "brand/pepticaribe-logo.png", w: 512, h: 512, label: "PeptiCaribe", sub: "Research Grade" },
  { rel: "hero/hero-showcase-reference.png", w: 1536, h: 1024, label: "Research Peptides", sub: "Premium Exhibit" },
  { rel: "hero/hero-background.png", w: 1920, h: 1080, label: "PeptiCaribe", sub: "Laboratory Atmosphere" },
  { rel: "products/exhibit/glp-3-rt.png", w: 1060, h: 2274, label: "GLP-3 RT", sub: "Exhibit" },
  { rel: "products/exhibit/glp-2-t.png", w: 1060, h: 2274, label: "GLP-2 T", sub: "Exhibit" },
  { rel: "products/exhibit/ghk-cu.png", w: 1060, h: 2274, label: "GHK-Cu", sub: "Exhibit" },
  { rel: "products/exhibit/wolverine.png", w: 1060, h: 2274, label: "Wolverine", sub: "Exhibit" },
  { rel: "products/exhibit/bpc-157.png", w: 1060, h: 2274, label: "BPC-157", sub: "Exhibit" },
  { rel: "products/exhibit/mots-c.png", w: 1060, h: 2274, label: "MOTS-C", sub: "Exhibit" },
  { rel: "products/exhibit/nad-plus.png", w: 1060, h: 2274, label: "NAD+", sub: "Exhibit" },
  { rel: "products/exhibit/cjc-1295-ipamorelin.png", w: 1060, h: 2274, label: "CJC/IPA", sub: "Exhibit" },
  { rel: "products/glp-3-rt.png", w: 480, h: 720, label: "GLP-3 RT", sub: "Research Vial" },
  { rel: "products/glp-2-t.png", w: 480, h: 720, label: "GLP-2 T", sub: "Research Vial" },
  { rel: "products/bpc-157.png", w: 480, h: 720, label: "BPC-157", sub: "Research Vial" },
  { rel: "products/bac-water.png", w: 480, h: 720, label: "BAC Water", sub: "Accessory" },
  { rel: "products/bac-water-30ml.png", w: 480, h: 720, label: "BAC 30ml", sub: "Accessory" },
];

function svgPlaceholder(w, h, label, sub) {
  const fontSize = Math.max(18, Math.round(w * 0.04));
  const subSize = Math.max(12, Math.round(fontSize * 0.55));
  const vialW = Math.round(w * 0.12);
  const vialH = Math.round(h * 0.35);

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BRAND.navy}"/>
      <stop offset="55%" stop-color="#0d2028"/>
      <stop offset="100%" stop-color="#122a34"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="50%">
      <stop offset="0%" stop-color="${BRAND.teal}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${BRAND.teal}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vial" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${BRAND.ivory}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${BRAND.teal}" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="${(w - vialW) / 2}" y="${h * 0.22}" width="${vialW}" height="${vialH}" rx="${vialW * 0.15}" fill="url(#vial)" opacity="0.9"/>
  <rect x="${(w - vialW) / 2 + vialW * 0.2}" y="${h * 0.18}" width="${vialW * 0.6}" height="${vialW * 0.35}" rx="4" fill="${BRAND.gold}" opacity="0.85"/>
  <text x="50%" y="${h * 0.72}" text-anchor="middle" fill="${BRAND.ivory}" font-family="Georgia, serif" font-size="${fontSize}" font-weight="700">${label}</text>
  <text x="50%" y="${h * 0.72 + subSize * 1.6}" text-anchor="middle" fill="${BRAND.teal}" font-family="Arial, sans-serif" font-size="${subSize}" letter-spacing="3">${sub.toUpperCase()}</text>
  <text x="50%" y="${h - subSize * 2}" text-anchor="middle" fill="${BRAND.ivory}" opacity="0.35" font-family="Arial, sans-serif" font-size="${subSize * 0.85}">RUO · Replace with production asset</text>
</svg>`);
}

async function ensurePng(spec) {
  const full = join(publicDir, spec.rel);
  mkdirSync(dirname(full), { recursive: true });

  const stat = existsSync(full) ? statSync(full) : null;
  const isTinyPlaceholder = stat && stat.size < 500;

  if (!existsSync(full) || isTinyPlaceholder) {
    await sharp(svgPlaceholder(spec.w, spec.h, spec.label, spec.sub))
      .png({ compressionLevel: 9 })
      .toFile(full);
    console.log(`Generated PNG: public/${spec.rel} (${spec.w}×${spec.h})`);
    return "created";
  }

  return "kept";
}

async function deriveFormats(pngPath) {
  const input = sharp(readFileSync(pngPath));
  const meta = await input.metadata();
  const base = pngPath.replace(/\.png$/i, "");

  await sharp(pngPath)
    .webp({ quality: 82, effort: 4 })
    .toFile(`${base}.webp`);

  await sharp(pngPath)
    .avif({ quality: 62, effort: 4 })
    .toFile(`${base}.avif`);

  return { w: meta.width, h: meta.height };
}

function walkPngs(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkPngs(full, acc);
    else if (entry.name.endsWith(".png")) acc.push(full);
  }
  return acc;
}

let pngCreated = 0;
let pngKept = 0;

for (const spec of SPECS) {
  const result = await ensurePng(spec);
  if (result === "created") pngCreated += 1;
  else pngKept += 1;
}

const allPngs = walkPngs(publicDir);
let derived = 0;

for (const pngPath of allPngs) {
  await deriveFormats(pngPath);
  derived += 1;
  const rel = relative(publicDir, pngPath);
  const webpSize = statSync(pngPath.replace(/\.png$/i, ".webp")).size;
  const avifSize = statSync(pngPath.replace(/\.png$/i, ".avif")).size;
  const pngSize = statSync(pngPath).size;
  console.log(
    `Optimized public/${rel} → webp ${(webpSize / 1024).toFixed(1)}KB, avif ${(avifSize / 1024).toFixed(1)}KB (png ${(pngSize / 1024).toFixed(1)}KB)`,
  );
}

console.log(`\nDone — ${pngCreated} PNGs generated, ${pngKept} kept, ${derived} assets optimized.`);
