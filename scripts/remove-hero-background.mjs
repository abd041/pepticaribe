/**
 * Remove solid dark backdrop from hero vial PNG (edge flood-fill).
 * Usage: node scripts/remove-hero-background.mjs <input.png> <output.png>
 */
import { readFileSync, writeFileSync } from "fs";
import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/remove-hero-background.mjs <input.png> <output.png>");
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

function idx(x, y) {
  return (y * width + x) * channels;
}

function colorDist(i, br, bg, bb) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  return Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);
}

/** Background sample from corners */
const corners = [
  [0, 0],
  [width - 1, 0],
  [0, height - 1],
  [width - 1, height - 1],
  [Math.floor(width / 2), 0],
  [0, Math.floor(height / 2)],
];
let br = 0;
let bg = 0;
let bb = 0;
for (const [x, y] of corners) {
  const i = idx(x, y);
  br += data[i];
  bg += data[i + 1];
  bb += data[i + 2];
}
br = Math.round(br / corners.length);
bg = Math.round(bg / corners.length);
bb = Math.round(bb / corners.length);

const MATCH = 38;
const visited = new Uint8Array(width * height);
const queue = [];

function tryPush(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (visited[p]) return;
  const i = idx(x, y);
  if (colorDist(i, br, bg, bb) > MATCH) return;
  visited[p] = 1;
  queue.push(p);
}

for (let x = 0; x < width; x++) {
  tryPush(x, 0);
  tryPush(x, height - 1);
}
for (let y = 0; y < height; y++) {
  tryPush(0, y);
  tryPush(width - 1, y);
}

while (queue.length) {
  const p = queue.pop();
  const x = p % width;
  const y = (p - x) / width;
  tryPush(x - 1, y);
  tryPush(x + 1, y);
  tryPush(x, y - 1);
  tryPush(x, y + 1);
}

for (let p = 0; p < width * height; p++) {
  if (!visited[p]) continue;
  const i = p * channels;
  data[i + 3] = 0;
}

/** Soft edge on boundary pixels */
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const p = y * width + x;
    if (visited[p]) continue;
    const neighbors = [
      visited[p - 1],
      visited[p + 1],
      visited[p - width],
      visited[p + width],
    ].filter(Boolean).length;
    if (neighbors > 0 && neighbors < 4) {
      const i = p * channels;
      data[i + 3] = Math.min(data[i + 3], 200);
    }
  }
}

await sharp(data, { raw: { width, height, channels } }).png({ compressionLevel: 9 }).toFile(output);

console.log(`Wrote transparent PNG: ${output} (${width}×${height}, bg≈rgb(${br},${bg},${bb}))`);
