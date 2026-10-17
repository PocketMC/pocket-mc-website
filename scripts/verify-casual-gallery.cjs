const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const ARTIFACTS_DIR = 'C:\\Users\\divy\\.gemini\\antigravity\\brain\\bf1007bc-a1a3-4b61-aec7-02823097b753';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const BASE_URL = 'http://localhost:5204';
  console.log(`Connecting to ${BASE_URL}...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Landing Page Showcase (Clean video + casual footer)
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const el = document.getElementById('tour');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'casual_landing_showcase.png') });
  console.log('Saved casual_landing_showcase.png');

  // 2. Gallery Page Desktop (Scroll mode)
  await page.goto(`${BASE_URL}/gallery/`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'casual_gallery_desktop.png') });
  console.log('Saved casual_gallery_desktop.png');

  // 3. Filter to Mobile tab (natural portrait photo, no fake notch)
  const mobileBtn = await page.$('.controls-bar .switch:first-child button:nth-child(3)');
  if (mobileBtn) {
    await mobileBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'casual_gallery_mobile_photo.png') });
    console.log('Saved casual_gallery_mobile_photo.png');
  }

  // 4. Switch to Grid View
  const gridBtn = await page.$('.view-switch button:nth-child(2)');
  if (gridBtn) {
    await gridBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'casual_gallery_grid.png') });
    console.log('Saved casual_gallery_grid.png');
  }

  // 5. Mobile Screen Viewport (390x844) in Scroll mode
  await page.setViewport({ width: 390, height: 844 });
  const scrollBtn = await page.$('.view-switch button:first-child');
  if (scrollBtn) await scrollBtn.click();
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'casual_gallery_smartphone.png') });
  console.log('Saved casual_gallery_smartphone.png');

  await browser.close();
  console.log('All casual verifications finished.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
