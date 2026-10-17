const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ARTIFACTS_DIR = 'C:\\Users\\divy\\.gemini\\antigravity\\brain\\bf1007bc-a1a3-4b61-aec7-02823097b753';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const BASE_URL = 'http://localhost:5205';
  console.log(`Connecting to ${BASE_URL}...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Landing page video check
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  const videoAttrs = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? { src: v.src, poster: v.poster, preload: v.preload, readyState: v.readyState } : null;
  });
  console.log('Video attributes:', videoAttrs);

  await page.evaluate(() => {
    const el = document.getElementById('tour');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'instant_video_showcase.png') });
  console.log('Saved instant_video_showcase.png');

  // 2. Gallery page: Landscape slide
  await page.goto(`${BASE_URL}/gallery/`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'stable_gallery_landscape.png') });
  console.log('Saved stable_gallery_landscape.png');

  // Measure container height & width for landscape
  const landscapeBox = await page.evaluate(() => {
    const el = document.querySelector('.frame-wrap');
    return el ? { width: el.offsetWidth, height: el.offsetHeight } : null;
  });
  console.log('Landscape container box:', landscapeBox);

  // 3. Switch to mobile portrait item
  const mobileFilterBtn = await page.$('.controls-bar .switch:first-child button:nth-child(3)');
  if (mobileFilterBtn) {
    await mobileFilterBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'stable_gallery_portrait.png') });
    console.log('Saved stable_gallery_portrait.png');

    // Measure container height & width for portrait
    const portraitBox = await page.evaluate(() => {
      const el = document.querySelector('.frame-wrap');
      return el ? { width: el.offsetWidth, height: el.offsetHeight } : null;
    });
    console.log('Portrait container box:', portraitBox);
  }

  // 4. Grid view cards with rounded corners
  const gridModeBtn = await page.$('.view-switch button:nth-child(2)');
  if (gridModeBtn) {
    await gridModeBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'rounded_gallery_grid.png') });
    console.log('Saved rounded_gallery_grid.png');
  }

  await browser.close();
  console.log('Verification finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
