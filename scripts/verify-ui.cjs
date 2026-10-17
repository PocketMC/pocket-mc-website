const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots_verify');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const BASE_URL = 'http://localhost:5198';
  console.log(`Connecting to ${BASE_URL}...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error on ${page.url()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    errors.push(`Page error on ${page.url()}: ${err.message}`);
  });

  async function gotoSafe(urlPath) {
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 600));
  }

  try {
    // 1. Desktop Home Dark
    await page.setViewport({ width: 1440, height: 900 });
    await gotoSafe('/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_desktop_home_dark.png') });
    console.log('Saved 01_desktop_home_dark.png');

    // 2. Showcase Tab click
    const logsTab = await page.$('button[role="tab"]:nth-child(3)');
    if (logsTab) {
      await logsTab.click();
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_showcase_tab_logs.png') });
      console.log('Saved 02_showcase_tab_logs.png');
    }

    // 3. Light Mode Home
    const lightBtn = await page.$('.switch button[aria-label="Light"]');
    if (lightBtn) {
      await lightBtn.click();
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_desktop_home_light.png') });
      console.log('Saved 03_desktop_home_light.png');

      const darkBtn = await page.$('.switch button[aria-label="Dark"]');
      if (darkBtn) {
        await darkBtn.click();
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // 4. Mobile Home
    await page.setViewport({ width: 390, height: 844 });
    await gotoSafe('/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_mobile_home.png') });
    console.log('Saved 04_mobile_home.png');

    // 5. Mobile Drawer
    const mobileMenuBtn = await page.$('button[aria-label="Open menu"]');
    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_mobile_drawer.png') });
      console.log('Saved 05_mobile_drawer.png');
    }

    // 6. Docs Introduction
    await page.setViewport({ width: 1440, height: 900 });
    await gotoSafe('/docs/introduction/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_docs_intro.png') });
    console.log('Saved 06_docs_intro.png');

    // 7. Docs Search Modal
    const searchTrigger = await page.$('button.trigger');
    if (searchTrigger) {
      await searchTrigger.click();
      await new Promise(r => setTimeout(r, 500));
      const searchInput = await page.$('dialog input');
      if (searchInput) {
        await searchInput.type('tunnel');
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_search_modal.png') });
        console.log('Saved 07_search_modal.png');
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // 8. Docs API Reference
    await gotoSafe('/docs/api/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_docs_api.png') });
    console.log('Saved 08_docs_api.png');

    // 9. FAQ Page
    await gotoSafe('/faq/');
    const firstFaqSummary = await page.$('.faq-summary');
    if (firstFaqSummary) {
      await firstFaqSummary.click();
      await new Promise(r => setTimeout(r, 300));
    }
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_faq.png') });
    console.log('Saved 09_faq.png');

    // 10. Changelog
    await gotoSafe('/changelog/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_changelog.png') });
    console.log('Saved 10_changelog.png');

    // 11. About & Contact
    await gotoSafe('/about/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_about.png') });
    console.log('Saved 11_about.png');

    await gotoSafe('/contact/');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12_contact.png') });
    console.log('Saved 12_contact.png');

    console.log('--- Verification Complete ---');
    if (errors.length > 0) {
      console.warn('Errors captured during navigation:');
      errors.forEach(e => console.warn(e));
    } else {
      console.log('Zero console or page errors detected across all tested routes!');
    }
  } catch (err) {
    console.error('Test error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();
