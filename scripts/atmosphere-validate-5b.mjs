import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3010";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
  localStorage.setItem("pepticaribe_research_verified", "true");
});
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector(".bio-atmosphere", { state: "attached", timeout: 20000 });
await page.waitForTimeout(3000);

const v = await page.evaluate(() => {
  const atm = document.querySelector(".bio-atmosphere");
  const particle = document.querySelector(".bio-particle");
  const pcs = particle ? getComputedStyle(particle) : null;
  const acs = atm ? getComputedStyle(atm) : null;
  const rect = atm?.getBoundingClientRect();
  return {
    particleCount: document.querySelectorAll(".bio-particle").length,
    particleDisplay: pcs?.display ?? null,
    atmospherePosition: acs?.position ?? null,
    atmosphereWidth: acs?.width ?? null,
    atmosphereHeight: acs?.height ?? null,
    viewport: { w: window.innerWidth, h: window.innerHeight },
    boundingRect: rect ? { w: rect.width, h: rect.height, x: rect.x, y: rect.y } : null,
    pass:
      document.querySelectorAll(".bio-particle").length > 0 &&
      pcs?.display !== "none" &&
      acs?.position === "fixed" &&
      rect &&
      rect.width >= window.innerWidth * 0.99 &&
      rect.height >= window.innerHeight * 0.99,
  };
});

console.log(JSON.stringify(v, null, 2));
await browser.close();
process.exit(v.pass ? 0 : 1);
