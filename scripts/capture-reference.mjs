import puppeteer from "puppeteer";
import fs from "node:fs/promises";

const out = ".ai/screenshots/reference";
await fs.mkdir(out, { recursive: true });
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage();
await page.evaluateOnNewDocument(() => localStorage.setItem("theme", "dark"));
const routes = [
  "/",
  "/faq",
  "/changelog",
  "/docs/introduction",
  "/docs/providers",
  "/docs/settings",
  "/docs/themes",
  "/docs/shortcuts",
  "/docs/scrobbling",
  "/docs/logs",
  "/docs/help",
  "/docs/vision",
  "/docs/roadmap",
];
const report = [];
for (const width of [1440, 390]) {
  await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
  for (const route of routes) {
    const response = await page.goto(`http://127.0.0.1:5174${route}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 700));
    const file = `${out}/${width}-${route.replaceAll("/", "-").replace(/^-/, "") || "home"}.png`;
    await page.screenshot({ path: file, fullPage: true });
    report.push({
      route,
      width,
      status: response.status(),
      file,
      ...(await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector("h1")?.textContent,
        font: getComputedStyle(document.body).fontFamily,
        links: [...document.querySelectorAll("a[href]")].map((a) =>
          a.getAttribute("href"),
        ),
      }))),
    });
    console.log(width, route, response.status());
  }
}
await fs.writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
await browser.close();
