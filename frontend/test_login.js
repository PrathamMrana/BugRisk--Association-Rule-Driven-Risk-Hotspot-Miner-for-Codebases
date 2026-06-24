import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Start dev server in background? No, let's just run it if we can.
  // Actually, we can just compile and serve it locally on port 4173.
  await page.goto('http://localhost:4173');
  
  console.log("Navigated to page");
  // Click Deploy Engine
  await page.click('button:has-text("Deploy Engine")');
  console.log("Clicked Deploy Engine");
  
  // Wait for login screen
  await page.waitForSelector('input[placeholder="admin or engineer"]');
  console.log("Found login screen");
  
  await page.fill('input[placeholder="admin or engineer"]', 'admin');
  await page.fill('input[placeholder="••••••••"]', 'admin123');
  console.log("Filled form");
  
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/auth/login')),
    page.click('button:has-text("Initialize Pipeline")')
  ]).then(resps => {
    console.log("Login response status:", resps[0].status());
  }).catch(e => {
    console.error("Login request failed to fire:", e);
  });

  await browser.close();
})();
