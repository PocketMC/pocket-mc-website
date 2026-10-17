const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ARTIFACTS_DIR = 'C:\\Users\\divy\\.gemini\\antigravity\\brain\\bf1007bc-a1a3-4b61-aec7-02823097b753';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const BASE_URL = 'http://localhost:5203';
  console.log(`Connecting to ${BASE_URL}...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Landing Page Showcase (Video only + action bar)
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const el = document.getElementById('tour');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_landing_showcase_video_only.png') });
  console.log('Saved 01_landing_showcase_video_only.png');

  // 2. Gallery Page Desktop
  await page.goto(`${BASE_URL}/gallery/`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_gallery_desktop_initial.png') });
  console.log('Saved 02_gallery_desktop_initial.png');

  // 3. Scroll browsing down through the gallery track
  await page.evaluate(() => {
    window.scrollBy({ top: 1200, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_gallery_scrolled_sticky.png') });
  console.log('Saved 03_gallery_scrolled_sticky.png');

  // 4. Filter by Mobile Companion (showing authentic phone bezel mockup)
  const mobileTab = await page.$('.filter-bar button:nth-child(3)');
  if (mobileTab) {
    await mobileTab.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_gallery_mobile_mockup.png') });
    console.log('Saved 04_gallery_mobile_mockup.png');
  }

  // 5. Open Fullscreen Lightbox / Inspect
  const inspectBtn = await page.$('.inspect-btn');
  if (inspectBtn) {
    await inspectBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_gallery_lightbox_inspect.png') });
    console.log('Saved 05_gallery_lightbox_inspect.png');

    // Close lightbox
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  // 6. Mobile Viewport (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/gallery/`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_gallery_mobile_viewport.png') });
  console.log('Saved 06_gallery_mobile_viewport.png');

  await browser.close();
  console.log('All gallery verifications finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
