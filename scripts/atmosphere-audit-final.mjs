/**
 * Hard atmosphere verification audit (post-verification-gate).
 * Usage: node scripts/atmosphere-audit-final.mjs [url] [--visibility]
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || "http://localhost:3010";
const withVisibility = process.argv.includes("--visibility");
const outDir = join(__dirname, "..", "audit-output");

async function main() {
  mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleLogs = [];
  const pageErrors = [];
  page.on("console", (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => pageErrors.push(err.message));

  await page.addInitScript((vis) => {
    localStorage.setItem("pepticaribe_research_verified", "true");
    if (vis) window.DEBUG_ATMOSPHERE_VISIBILITY = true;
  }, withVisibility);

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".bio-atmosphere", { state: "attached", timeout: 20000 });
  await page.waitForTimeout(3000);

  const results = await page.evaluate(() => {
    const atmosphere = document.querySelector(".bio-atmosphere");
    const prototype = document.querySelector(".bio-atmosphere--visibility-prototype");
    const testBox = document.querySelector("#bio-atmosphere-render-test");
    const particles = document.querySelectorAll(".bio-particle");

    let cssProof = { loaded: false, sample: null, hrefMatch: null };
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          const text = rule.cssText || "";
          if (text.includes("bio-atmosphere--visibility-prototype")) {
            cssProof.loaded = true;
            cssProof.sample = text.slice(0, 160);
            cssProof.hrefMatch = sheet.href;
          }
        }
      } catch {
        /* cross-origin */
      }
    }

    let testBoxVisible = false;
    let testBoxRect = null;
    if (testBox) {
      const r = testBox.getBoundingClientRect();
      testBoxRect = { x: r.x, y: r.y, w: r.width, h: r.height };
      const cs = getComputedStyle(testBox);
      testBoxVisible =
        r.width > 0 &&
        r.height > 0 &&
        cs.display !== "none" &&
        cs.visibility !== "hidden" &&
        parseFloat(cs.opacity) > 0;
    }

    let atmosphereStyle = null;
    if (atmosphere) {
      const cs = getComputedStyle(atmosphere);
      atmosphereStyle = {
        display: cs.display,
        position: cs.position,
        zIndex: cs.zIndex,
        opacity: cs.opacity,
        visibility: cs.visibility,
      };
    }

    return {
      q1_bioAtmosphere: atmosphere ? atmosphere.outerHTML.slice(0, 200) + "..." : null,
      q1_mounted: Boolean(atmosphere),
      q2_particleCount: particles.length,
      q2_byLayer: {
        back: document.querySelectorAll(".bio-particle--back").length,
        mid: document.querySelectorAll(".bio-particle--mid").length,
        front: document.querySelectorAll(".bio-particle--front").length,
      },
      q3_debugVisibility: window.DEBUG_ATMOSPHERE_VISIBILITY ?? null,
      q4_prototypeElement: prototype ? prototype.className : null,
      q4_prototypeMounted: Boolean(prototype),
      q5_cssProof: cssProof,
      q6_testBoxPresent: Boolean(testBox),
      q6_testBoxVisible: testBoxVisible,
      q6_testBoxRect: testBoxRect,
      atmosphereStyle,
      gateBypassed: localStorage.getItem("pepticaribe_research_verified"),
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      dataVisibilityPrototype: atmosphere?.getAttribute("data-visibility-prototype") ?? null,
    };
  });

  const shotName = withVisibility ? "audit-verified-with-visibility.png" : "audit-verified-default.png";
  await page.screenshot({ path: join(outDir, shotName), fullPage: false });

  const report = {
    timestamp: new Date().toISOString(),
    url,
    verificationBypassed: true,
    withVisibilityPrototype: withVisibility,
    results,
    pageErrors,
    atmosphereConsoleLogs: consoleLogs.filter(
      (l) => l.toLowerCase().includes("atmosphere") || l.includes("PeptiCaribe"),
    ),
  };

  writeFileSync(
    join(outDir, withVisibility ? "audit-final-with-visibility.json" : "audit-final-default.json"),
    JSON.stringify(report, null, 2),
  );

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
