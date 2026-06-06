import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
  localStorage.setItem("pepticaribe_research_verified", "true");
  window.DEBUG_ATMOSPHERE_VISIBILITY = true;
});
await page.goto("http://localhost:3010", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".bio-atmosphere", { state: "attached" });
await page.waitForTimeout(3000);

const r = await page.evaluate(() => {
  const atm = document.querySelector(".bio-atmosphere");
  const cs = atm ? getComputedStyle(atm) : null;
  const p = document.querySelector(".bio-particle");
  const pcs = p ? getComputedStyle(p) : null;
  const prect = p?.getBoundingClientRect();
  return {
    atmosphere: cs
      ? { position: cs.position, zIndex: cs.zIndex, inset: cs.top + " " + cs.left, width: cs.width, height: cs.height }
      : null,
    sampleParticle: pcs
      ? {
          width: pcs.width,
          height: pcs.height,
          opacity: pcs.opacity,
          background: pcs.backgroundColor,
          boxShadow: pcs.boxShadow.slice(0, 80),
          display: pcs.display,
          rect: prect ? { w: prect.width, h: prect.height } : null,
        }
      : null,
    particleCount: document.querySelectorAll(".bio-particle").length,
  };
});
console.log(JSON.stringify(r, null, 2));
await browser.close();
