/**
 * Hard atmosphere verification audit — run against dev server.
 * Usage: node scripts/atmosphere-audit.mjs [url] [--visibility]
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || "http://localhost:3000";
const withVisibility = process.argv.includes("--visibility");
const outDir = join(__dirname, "..", "audit-output");

async function main() {
  mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleLogs = [];
  page.on("console", (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));

  if (withVisibility) {
    await page.addInitScript(() => {
      window.DEBUG_ATMOSPHERE_VISIBILITY = true;
    });
  }

  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);

  const audit = await page.evaluate(() => {
    const atmosphere = document.querySelector(".bio-atmosphere");
    const particles = document.querySelectorAll(".bio-particle");
    const prototypeEl = document.querySelector(".bio-atmosphere--visibility-prototype");
    const testBox = document.querySelector("#bio-atmosphere-render-test");

    const stylesheets = [...document.styleSheets];
    let visibilityCssLoaded = false;
    let visibilityRuleSample = null;

    for (const sheet of stylesheets) {
      try {
        const rules = sheet.cssRules || [];
        for (const rule of rules) {
          const text = rule.cssText || "";
          if (text.includes("bio-atmosphere--visibility-prototype")) {
            visibilityCssLoaded = true;
            visibilityRuleSample = text.slice(0, 120);
          }
        }
      } catch {
        /* cross-origin */
      }
    }

    const hrefs = [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href);

    let testBoxVisible = false;
    let testBoxRect = null;
    let testBoxComputed = null;
    if (testBox) {
      const rect = testBox.getBoundingClientRect();
      testBoxRect = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      const cs = getComputedStyle(testBox);
      testBoxComputed = {
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        zIndex: cs.zIndex,
        backgroundColor: cs.backgroundColor,
      };
      testBoxVisible =
        rect.width > 0 &&
        rect.height > 0 &&
        cs.display !== "none" &&
        cs.visibility !== "hidden" &&
        parseFloat(cs.opacity) > 0;
    }

    let atmosphereComputed = null;
    if (atmosphere) {
      const cs = getComputedStyle(atmosphere);
      atmosphereComputed = {
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        zIndex: cs.zIndex,
        position: cs.position,
        width: cs.width,
        height: cs.height,
      };
    }

    return {
      atmosphereMounted: Boolean(atmosphere),
      atmosphereTag: atmosphere?.tagName ?? null,
      atmosphereClasses: atmosphere?.className ?? null,
      particleCount: particles.length,
      debugVisibility: window.DEBUG_ATMOSPHERE_VISIBILITY ?? null,
      prototypeClassApplied: Boolean(prototypeEl),
      prototypeClasses: prototypeEl?.className ?? null,
      visibilityCssInRules: visibilityCssLoaded,
      visibilityRuleSample,
      stylesheetHrefs: hrefs,
      testBoxPresent: Boolean(testBox),
      testBoxVisible,
      testBoxRect,
      testBoxComputed,
      atmosphereComputed,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      particlesByLayer: {
        back: document.querySelectorAll(".bio-particle--back").length,
        mid: document.querySelectorAll(".bio-particle--mid").length,
        front: document.querySelectorAll(".bio-particle--front").length,
      },
    };
  });

  await page.screenshot({ path: join(outDir, withVisibility ? "audit-with-visibility.png" : "audit-default.png"), fullPage: false });

  const report = {
    timestamp: new Date().toISOString(),
    url,
    withVisibilityPrototype: withVisibility,
    audit,
    consoleLogs: consoleLogs.filter((l) => l.includes("Atmosphere") || l.includes("atmosphere")),
  };

  writeFileSync(join(outDir, withVisibility ? "audit-with-visibility.json" : "audit-default.json"), JSON.stringify(report, null, 2));

  console.log(JSON.stringify(report, null, 2));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
