import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  const text = await page.evaluate(() => document.body.innerText);
  console.log("PAGE TEXT:", text);
  await browser.close();
})();
