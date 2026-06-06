/**
 * Phase 6A visibility test — section screenshots + particle metrics.
 * Usage: node scripts/atmosphere-6a-visibility-test.mjs [url]
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || "http://localhost:3012";
const outDir = join(__dirname, "..", "audit-output", "phase6a");

const SECTIONS = [
  { id: "hero", selector: ".ref-hero-section", label: "Hero" },
  { id: "best-sellers", selector: "#best-sellers", label: "Best Sellers" },
  { id: "bpc", selector: ".ref-featured-compound", label: "BPC" },
  { id: "testimonials", selector: ".ref-reviews-faq", label: "Testimonials" },
  { id: "footer", selector: ".ref-footer", label: "Footer" },
];

async function main() {
  mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    localStorage.setItem("pepticaribe_research_verified", "true");
  });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".bio-atmosphere", { state: "attached", timeout: 20000 });
  await page.waitForTimeout(3500);

  const metrics = await page.evaluate(() => {
    const sample = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        display: cs.display,
        width: cs.width,
        height: cs.height,
        opacity: cs.opacity,
        boxShadow: cs.boxShadow.slice(0, 80),
        rect: { w: r.width, h: r.height },
      };
    };
    return {
      particleCount: document.querySelectorAll(".bio-particle").length,
      frontCount: document.querySelectorAll(".bio-particle--front").length,
      sampleFront: sample(".bio-particle--front"),
      sampleBack: sample(".bio-particle--back"),
      atmospherePosition: document.querySelector(".bio-atmosphere")
        ? getComputedStyle(document.querySelector(".bio-atmosphere")).position
        : null,
    };
  });

  console.log("METRICS:", JSON.stringify(metrics, null, 2));

  for (const section of SECTIONS) {
    const el = page.locator(section.selector).first();
    if ((await el.count()) === 0) {
      console.warn(`Missing: ${section.label}`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: join(outDir, `${section.id}.png`),
      fullPage: false,
    });
    console.log(`Screenshot: ${section.label} -> phase6a/${section.id}.png`);
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
