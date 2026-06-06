import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(() => {
  localStorage.setItem("pepticaribe_research_verified", "true");
});
await page.goto("http://localhost:3010", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".bio-atmosphere", { state: "attached" });
await page.waitForTimeout(2000);

const r = await page.evaluate(() => {
  const el = document.querySelector(".bio-atmosphere");
  const particle = document.querySelector(".bio-particle");
  function ruleSources(node) {
    if (!node) return [];
    const out = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule.selectorText && node.matches(rule.selectorText)) {
            out.push({
              selector: rule.selectorText,
              css: rule.style.cssText.slice(0, 120),
              href: sheet.href?.split("/").pop() ?? "inline",
            });
          }
        }
      } catch {
        /* skip */
      }
    }
    return out.filter((x) =>
      /position|display|z-index/i.test(x.css) ||
      x.selector.includes("bio-atmosphere") ||
      x.selector.includes("bio-particle"),
    );
  }
  return {
    atmosphereRules: ruleSources(el).slice(0, 20),
    particleRules: ruleSources(particle).filter((x) => x.css.includes("display")).slice(0, 10),
    atmosphereInline: el?.getAttribute("style"),
    particleInline: particle?.getAttribute("style"),
  };
});
console.log(JSON.stringify(r, null, 2));
await browser.close();
