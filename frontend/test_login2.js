import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`Error text: "${msg.text()}"`);
  });
  page.on('pageerror', error => {
    console.log(`Page Error: ${error.message}`);
  });

  await page.goto('http://localhost:4173');
  
  await page.click('button:has-text("Deploy Engine")');
  await page.waitForSelector('input[placeholder="admin or engineer"]');
  
  await page.fill('input[placeholder="admin or engineer"]', 'admin');
  await page.fill('input[placeholder="••••••••"]', 'admin123');
  
  await page.click('button:has-text("Initialize Pipeline")');
  
  // wait for dashboard to appear, e.g., looking for "Command Center" or "Pipeline"
  try {
    await page.waitForSelector('text="Command Center"', { timeout: 3000 });
    console.log("Dashboard loaded successfully");
  } catch (e) {
    console.log("Dashboard failed to load or timed out");
  }

  await browser.close();
})();
