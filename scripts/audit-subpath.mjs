import assert from "node:assert/strict";
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const base = "/pocket-mc-website/";
const origin = "http://127.0.0.1:4175";
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "",
    "install/",
    "faq/",
    "docs/",
    "docs/api/",
    "privacy/",
  ]) {
    const response = await page.goto(`${origin}${base}${route}`, {
      waitUntil: "networkidle0",
    });
    assert(response.ok());
    await page.reload({ waitUntil: "networkidle0" });
    const result = await page.evaluate(() => ({
      title: document.querySelector("h1")?.textContent,
      canonical: document.querySelector('link[rel="canonical"]').href,
      image: document.querySelector('meta[property="og:image"]').content,
      rootLinks: [...document.querySelectorAll('a[href^="/"]')].map((a) =>
        a.getAttribute("href"),
      ),
      fonts: document.fonts.check('14px "Inter Variable"'),
      broken: [...document.images]
        .filter(
          (image) =>
            image.offsetParent !== null &&
            image.complete &&
            image.naturalWidth === 0,
        )
        .map((image) => image.src),
    }));
    assert(result.title && !result.title.includes("hasn’t been generated"));
    assert(new URL(result.canonical).pathname.startsWith(base));
    assert(new URL(result.image).pathname.startsWith(base));
    assert(
      result.rootLinks.every((href) => href.startsWith(base)),
      `${route}: links escaped the base path`,
    );
    assert(result.fonts);
    assert.deepEqual(result.broken, []);
    console.log("PASS subpath direct entry and reload:", route || "/");
  }
  await page.goto(`${origin}${base}docs/api/`);
  await Promise.all([page.waitForNavigation(), page.click(".legacy-prose a")]);
  assert.equal(new URL(page.url()).pathname, `${base}docs/`);
  assert.deepEqual(errors, []);
  await fs.writeFile(
    ".ai/screenshots/subpath-report.json",
    JSON.stringify({ status: "passed", pages: 6, errors }, null, 2),
  );
} finally {
  await browser.close();
}
