import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("=== AREA 1: AUTHENTICATION ===");
  
  // 1. Unauthorized Access
  await page.goto('https://bugrisk.vercel.app');
  await page.waitForTimeout(2000);
  const text = await page.evaluate(() => document.body.innerText);
  if (text.includes("BugRisk")) {
    console.log("PASS: Unauthorized access redirects to Landing Page.");
  } else {
    console.log("FAIL: Unauthorized access did not show Landing Page.");
  }

  // 2. Invalid Credentials
  await page.click('text=Initialize Platform'); // Open modal
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="admin or engineer"]', 'wrong');
  await page.fill('input[placeholder="••••••••"]', 'wrong');
  await page.click('button:has-text("Initialize Pipeline")'); // Submit login
  await page.waitForTimeout(1000);
  
  const errorText = await page.evaluate(() => document.body.innerText);
  if (errorText.includes("Authentication failed") || errorText.includes("Bad credentials") || errorText.includes("failed")) {
    console.log("PASS: Invalid credentials rejected.");
  } else {
    console.log("FAIL: Invalid credentials error missing.");
  }

  // 3. Valid Login
  await page.fill('input[placeholder="admin or engineer"]', 'admin');
  await page.fill('input[placeholder="••••••••"]', 'admin123');
  await page.click('button:has-text("Initialize Pipeline")');
  await page.waitForTimeout(5000); // wait for dashboard to load

  const dashboardText = await page.evaluate(() => document.body.innerText);
  if (dashboardText.includes("Dashboard") || dashboardText.includes("Logout")) {
    console.log("PASS: Login successful.");
    await page.screenshot({ path: '/Users/prathamrana/.gemini/antigravity/brain/13b719ab-284f-4e6a-b84a-1dd1faf8a388/artifacts/bugrisk_screenshots/01_Dashboard_After_Login.png' });
  } else {
    console.log("FAIL: Login did not reach dashboard.");
  }

  // 4. Hard Refresh Behavior
  await page.reload();
  await page.waitForTimeout(3000);
  const refreshText = await page.evaluate(() => document.body.innerText);
  if (refreshText.includes("Dashboard") || refreshText.includes("Logout")) {
    console.log("PASS: Session persistence survives hard refresh.");
  } else {
    console.log("FAIL: Hard refresh lost session.");
  }

  // 5. Logout
  await page.click('text=Logout');
  await page.waitForTimeout(1000);
  const logoutText = await page.evaluate(() => document.body.innerText);
  if (logoutText.includes("Enterprise AI")) {
    console.log("PASS: Logout successful.");
  } else {
    console.log("FAIL: Logout failed.");
  }

  await browser.close();
})();
