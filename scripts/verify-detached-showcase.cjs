const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots_verify');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const BASE_URL = 'http://localhost:5202';
  console.log(`Connecting to ${BASE_URL}...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to showcase preview
  await page.evaluate(() => {
    const el = document.getElementById('preview');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'detached_showcase_desktop.png') });
  console.log('Saved detached_showcase_desktop.png');

  // Click on "Real-time Logs" tab (3rd button)
  const tabBtn = await page.$('.switcher-bar .tab-btn:nth-child(3)');
  if (tabBtn) {
    await tabBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'detached_showcase_tab_switched.png') });
    console.log('Saved detached_showcase_tab_switched.png');
  }

  // Mobile viewport
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const el = document.getElementById('preview');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'detached_showcase_mobile.png') });
  console.log('Saved detached_showcase_mobile.png');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
