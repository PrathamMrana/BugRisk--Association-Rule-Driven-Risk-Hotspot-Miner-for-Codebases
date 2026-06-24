import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:5173');
  // Wait a bit for animations/blobs to load
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '../docs/screenshots/00_landing_page.png' });
  
  await browser.close();
  console.log("Screenshot updated successfully!");
})();
