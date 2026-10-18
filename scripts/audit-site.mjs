import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const origin = process.env.AUDIT_ORIGIN || "http://127.0.0.1:4173";
const base = process.env.SITE_BASE || "/";
const routes = JSON.parse(await fs.readFile("dist/routes.json", "utf8"));
const out = ".ai/screenshots/pocketmc";
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  protocolTimeout: 120000,
});
const page = await browser.newPage();
await page.setCacheEnabled(false);
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const href = (route) => `${origin}${base}${route.replace(/^\//, "")}`;
const report = [];
try {
  await page.evaluateOnNewDocument(() => localStorage.setItem("theme", "dark"));
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    for (const route of routes) {
      const response = await page.goto(href(route.path), {
        waitUntil: "networkidle0",
      });
      assert(
        response.ok() || response.status() === 304,
        `${route.path} HTTP ${response.status()}`,
      );
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        await Promise.all(
          [...document.images]
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  if (img.complete) return resolve();
                  img.addEventListener("load", resolve, { once: true });
                  img.addEventListener("error", resolve, { once: true });
                  setTimeout(resolve, 2000);
                }),
            ),
        );
        scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 350));
      const data = await page.evaluate(() => ({
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images]
          .filter(
            (image) =>
              image.offsetParent !== null &&
              (!image.complete || image.naturalWidth === 0),
          )
          .map((image) => image.src),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        description: document.querySelector('meta[name="description"]')
          ?.content,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        links: [...document.querySelectorAll("a[href]")].map((a) =>
          a.getAttribute("href"),
        ),
      }));
      assert.equal(data.h1Count, 1, `${route.path}: exactly one h1`);
      assert.equal(
        data.overflow,
        false,
        `${width} ${route.path}: horizontal overflow`,
      );
      assert.deepEqual(
        data.brokenImages,
        [],
        `${width} ${route.path}: broken images`,
      );
      assert.equal(data.title, route.title);
      assert.equal(data.description, route.description);
      assert.equal(data.ogTitle, route.title);
      assert.equal(
        new URL(data.canonical).pathname,
        `${base}${route.path.replace(/^\//, "")}`,
      );
      for (const link of data.links.filter(
        (link) => link.startsWith(base) && !link.startsWith("//"),
      )) {
        const localPath = new URL(link, origin).pathname.slice(base.length);
        const file = path.join(
          "dist",
          localPath,
          localPath.endsWith("/") || !localPath ? "index.html" : "",
        );
        await fs.access(file).catch(() => {
          throw new Error(`${route.path}: broken internal link ${link}`);
        });
      }
      const name = route.path.split("/").filter(Boolean).join("-") || "home";
      await page.screenshot({
        path: `${out}/${width}-${name}.png`,
        fullPage: true,
      });
      report.push({ route: route.path, width, ...data, links: undefined });
      console.log("PASS", width, route.path);
    }
  }
  // Theme choices persist across full-page navigations and follow system changes.
  await page.goto(href("/"));
  await page.click('[aria-label="Light theme"]');
  assert.equal(
    await page.evaluate(() => document.documentElement.dataset.theme),
    "light",
  );
  await page.goto(href("/install/"));
  // The initial document script in this audit sets dark; explicitly test reload persistence without it on another page.
  const persistence = await browser.newPage();
  await persistence.goto(href("/"));
  await persistence.click('[aria-label="Light theme"]');
  await persistence.reload({ waitUntil: "networkidle0" });
  assert.equal(
    await persistence.evaluate(() => document.documentElement.dataset.theme),
    "light",
  );
  await persistence.screenshot({
    path: `${out}/light-home.png`,
    fullPage: true,
  });
  await persistence.click('[aria-label="System theme"]');
  await persistence.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "dark" },
  ]);
  await persistence.waitForFunction(
    () => document.documentElement.dataset.theme === "dark",
  );
  await persistence.close();
  // Installer tab selection, arrow-key navigation and clipboard control.
  await page.click('[role="tab"]:nth-child(2)');
  assert.match(
    await page.$eval('[role="tabpanel"]', (el) => el.textContent),
    /universal installer/,
  );
  await page.focus('[role="tab"]:nth-child(2)');
  await page.keyboard.press("ArrowRight");
  assert.match(
    await page.$eval('[role="tabpanel"]', (el) => el.textContent),
    /Apple Silicon/,
  );
  await browser
    .defaultBrowserContext()
    .overridePermissions(origin, [
      "clipboard-read",
      "clipboard-write",
      "clipboard-sanitized-write",
    ]);
  await page.click('[aria-label="Copy command"]');
  await page.waitForSelector('[aria-label="Copied"]');
  assert.match(
    await page.evaluate(() => navigator.clipboard.readText()),
    /pocket-mc-linux-mac/,
  );
  // Mobile menu, document navigation and search keyboard interaction.
  await page.click('[aria-label="Open menu"]');
  assert.equal(
    await page.$eval("#menu-toggle", (el) => el.getAttribute("aria-expanded")),
    "true",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.$eval("#menu-toggle", (el) => el.getAttribute("aria-expanded")),
    "false",
  );
  await page.goto(href("/docs/"), { waitUntil: "networkidle0" });
  await page.keyboard.down("Control");
  await page.keyboard.press("k");
  await page.keyboard.up("Control");
  await page.waitForSelector(".search-dialog[open]");
  await page.type(".search-input-row input", "backup");
  assert((await page.$$(".search-results a")).length > 0);
  await page.screenshot({ path: `${out}/mobile-search.png` });
  await page.click(".search-input-row input", { clickCount: 3 });
  await page.keyboard.press("Backspace");
  await page.type(".search-input-row input", "xyzzynothing");
  assert.equal((await page.$$(".search-results a")).length, 0);
  await page.keyboard.press("Escape");
  // Deep-linked FAQs, gallery switching, native dialog Escape and history.
  await page.goto(href("/faq/#runtimes"), { waitUntil: "networkidle0" });
  await page.waitForSelector('#runtimes button[aria-expanded="true"]');
  await page.click("#runtimes button");
  assert.equal(
    await page.$eval("#runtimes button", (el) =>
      el.getAttribute("aria-expanded"),
    ),
    "false",
  );
  // Header brand link navigation to home hero page.
  await page.goto(href("/features/"), { waitUntil: "networkidle0" });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click("a.brand"),
  ]);
  assert.equal(new URL(page.url()).pathname, base);

  // Dedicated Gallery page and Lightbox interaction (commit 1ef48e2).
  await page.goto(href("/gallery/"), { waitUntil: "networkidle0" });
  await page.waitForSelector(".gallery-page");
  assert.equal(
    await page.$eval(".hero-content h1", (el) => el.textContent),
    "Gallery",
  );
  // Test category filtering
  await page.click('.switch-btn:nth-child(2)'); // Dashboard
  assert((await page.$$(".desktop-card")).length >= 1);
  // Test opening Lightbox and Esc to close
  await page.click(".desktop-card:first-child");
  await page.waitForSelector(".lightbox");
  await page.click(".lb-arrow.next");
  await page.keyboard.press("Escape");
  assert.equal(await page.$(".lightbox"), null);

  // Test hero gallery pill navigation on home page
  await page.goto(href("/"), { waitUntil: "networkidle0" });
  await page.waitForSelector(".hero-gallery-pill");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click(".hero-gallery-pill"),
  ]);
  assert.equal(new URL(page.url()).pathname, `${base}gallery/`);

  // Features page screenshot enlargement and history.
  await page.goto(href("/features/"), { waitUntil: "networkidle0" });
  await page.click(".feature-story .screenshot");
  await page.waitForSelector(".image-dialog[open]");
  await page.keyboard.press("Escape");
  assert.equal(await page.$(".image-dialog[open]"), null);
  await page.goBack({ waitUntil: "networkidle0" });
  assert.equal(new URL(page.url()).pathname, `${base}gallery/`);
  await page.goto(href("/missing-page/"));
  assert.match(
    await page.$eval("h1", (el) => el.textContent),
    /hasn’t been generated/,
  );
  // Narrow viewport and static content without JavaScript.
  await page.setViewport({ width: 320, height: 800 });
  for (const route of ["/", "/install/", "/docs/api/", "/privacy/"]) {
    await page.goto(href(route));
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `320px overflow: ${route}`,
    );
  }
  await page.setJavaScriptEnabled(false);
  for (const route of routes) {
    await page.goto(href(route.path));
    assert.equal(
      await page.$$eval("h1", (els) => els.length),
      1,
      `No-JS ${route.path}`,
    );
    assert(
      (await page.$eval("main", (el) => el.innerText.length)) > 100,
      `No-JS content: ${route.path}`,
    );
  }
  assert.deepEqual(errors, [], "No browser runtime errors");
  await fs.writeFile(
    `${out}/report.json`,
    JSON.stringify(
      { pages: report, interactionChecks: "passed", errors },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${report.length} responsive route captures; theme, tabs, clipboard, menu, search, FAQ, lightbox, history, 404, 320px, and 24 no-JS routes.`,
  );
} finally {
  await browser.close();
}
