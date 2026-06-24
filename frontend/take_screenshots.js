import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const OUT_DIR = '/Users/prathamrana/.gemini/antigravity/brain/13b719ab-284f-4e6a-b84a-1dd1faf8a388/artifacts/bugrisk_screenshots';

  console.log("Taking Landing Page screenshot...");
  await page.goto('https://bugrisk.vercel.app');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT_DIR}/01_LandingPage.png` });

  console.log("Taking Login screenshot...");
  await page.click('text=Initialize Platform');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT_DIR}/02_Login.png` });

  console.log("Logging in...");
  await page.fill('input[placeholder="admin or engineer"]', 'admin');
  await page.fill('input[placeholder="••••••••"]', 'admin123');
  await page.click('button:has-text("Initialize Pipeline")');
  await page.waitForTimeout(5000);
  
  console.log("Taking Dashboard screenshot...");
  await page.screenshot({ path: `${OUT_DIR}/03_Dashboard.png` });

  console.log("Taking Rules Explorer screenshot...");
  await page.click('button:has-text("Rules Explorer")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT_DIR}/04_RulesExplorer.png` });

  console.log("Taking Hotspots screenshot...");
  await page.click('button:has-text("Module Hotspots")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT_DIR}/05_Hotspots.png` });

  console.log("Taking Graph Explorer screenshot...");
  await page.click('button:has-text("Graph Explorer")');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT_DIR}/06_GraphExplorer.png` });

  console.log("Taking ML Analytics screenshot...");
  await page.click('button:has-text("ML Analytics")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT_DIR}/07_MLAnalytics.png` });

  console.log("Taking Algorithm Playground screenshot...");
  await page.click('button:has-text("Algorithm Playground")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT_DIR}/08_AlgorithmPlayground.png` });

  console.log("Taking Dataset Profile screenshot...");
  await page.click('button:has-text("Dataset Profile")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT_DIR}/09_DatasetProfile.png` });

  await browser.close();
  console.log("Done taking screenshots.");
})();
