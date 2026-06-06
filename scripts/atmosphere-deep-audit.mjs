import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3010";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const logs = [];
  page.on("pageerror", (e) => logs.push(`PAGEERROR: ${e.message}\n${e.stack?.slice(0, 500)}`));
  page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("requestfailed", (req) =>
    logs.push(`REQFAIL: ${req.url()} — ${req.failure()?.errorText}`),
  );

  const htmlRes = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  const initialHtml = await page.content();
  const ssrHasBioHost = initialHtml.includes("bio-atmosphere-host");
  const ssrHasBioAtmosphere = initialHtml.includes("bio-atmosphere");
  const ssrHasTestBox = initialHtml.includes("bio-atmosphere-render-test");

  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(5000);

  const hydrated = await page.evaluate(() => ({
    bioAtmosphere: document.querySelector(".bio-atmosphere"),
    bioHost: document.querySelector(".bio-atmosphere-host"),
    particleCount: document.querySelectorAll(".bio-particle").length,
    testBox: document.querySelector("#bio-atmosphere-render-test"),
    main: document.querySelector("main"),
    hero: document.querySelector(".ref-hero-section"),
    allMainClasses: document.querySelector("main")?.className ?? null,
  }));

  console.log("=== SSR HTML CHECK ===");
  console.log("status:", htmlRes?.status());
  console.log("ssrHasBioHost:", ssrHasBioHost);
  console.log("ssrHasBioAtmosphere:", ssrHasBioAtmosphere);
  console.log("ssrHasTestBox:", ssrHasTestBox);

  console.log("\n=== HYDRATED DOM ===");
  console.log("document.querySelector('.bio-atmosphere'):", hydrated.bioAtmosphere);
  console.log("document.querySelectorAll('.bio-particle').length:", hydrated.particleCount);
  console.log("document.querySelector('#bio-atmosphere-render-test'):", hydrated.testBox);
  console.log("main present:", !!hydrated.main, hydrated.allMainClasses?.slice(0, 100));
  console.log("hero present:", !!hydrated.hero);

  if (logs.length) {
    console.log("\n=== CONSOLE / ERRORS ===");
    logs.slice(0, 40).forEach((l) => console.log(l));
  }

  await page.screenshot({ path: "audit-output/deep-audit.png", fullPage: true });
  await browser.close();
}

main().catch(console.error);
