import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4173');
  
  await page.click('button:has-text("Deploy Engine")');
  await page.waitForSelector('input[placeholder="admin or engineer"]');
  
  await page.fill('input[placeholder="admin or engineer"]', 'admin');
  await page.fill('input[placeholder="••••••••"]', 'admin123');
  
  await page.click('button:has-text("Initialize Pipeline")');
  
  await page.waitForTimeout(2000); // Wait for whatever is happening
  
  await page.screenshot({ path: 'login_error.png' });

  await browser.close();
})();
