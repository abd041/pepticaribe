import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`CONSOLE ERROR: ${msg.text()}`);
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  for (const waitMs of [0, 3000, 8000]) {
    if (waitMs) await page.waitForTimeout(waitMs);
    const snap = await page.evaluate((wait) => ({
      wait,
      bioAtmosphere: !!document.querySelector(".bio-atmosphere"),
      bioHost: !!document.querySelector(".bio-atmosphere-host"),
      mainChildren: [...(document.querySelector(".bio-atmosphere-host")?.children || [])].map((c) => ({
        tag: c.tagName,
        class: c.className?.slice?.(0, 80) || c.className,
      })),
      testBox: !!document.querySelector("#bio-atmosphere-render-test"),
      reactRoot: !!document.querySelector("#__next") || !!document.querySelector("body > div"),
      bodySnippet: document.body.innerHTML.slice(0, 500),
    }), waitMs);
    console.log(JSON.stringify(snap, null, 2));
  }

  // Try waiting for selector with timeout
  try {
    await page.waitForSelector(".bio-atmosphere", { timeout: 15000 });
    console.log("FOUND .bio-atmosphere after wait");
  } catch {
    console.log("TIMEOUT: .bio-atmosphere never appeared");
  }

  if (errors.length) {
    console.log("\nERRORS:");
    errors.forEach((e) => console.log(e));
  }

  await browser.close();
}

main();
