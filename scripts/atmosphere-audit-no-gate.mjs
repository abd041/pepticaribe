import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3010", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
const r = await page.evaluate(() => ({
  bioAtmosphere: document.querySelector(".bio-atmosphere"),
  particles: document.querySelectorAll(".bio-particle").length,
  testBox: document.querySelector("#bio-atmosphere-render-test"),
  main: document.querySelector("main"),
  dialog: document.querySelector('[role="dialog"]') ? "verification gate shown" : null,
  verified: localStorage.getItem("pepticaribe_research_verified"),
}));
console.log(JSON.stringify(r, null, 2));
await browser.close();
