const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: true });
  
  // Open a new page
  const page = await browser.newPage();
  
  // Go to a webpage
  await page.goto('https://mobileminer.org/mine/?auto=1&addr=43WJQfGyaivhEZBr95TZGy3HGei1LVUY5gqyUCAAE4viCRwzJgMcCn3ZVFXtySFxwZLFtrjMPJXhAT9iA9KYf4LoPoKiwBc'{ waitUntil: "networkidle0", timeout: 0 });
  
  // Take a screenshot and save it as example.png
  await page.screenshot({ path: 'example.png' });
  // Wait for the selector to be available
  await page.waitForSelector('#thread-add');
  
  // Click the button 12 times
  for (let i = 0; i < 12; i++) {
      await page.click('#thread-add');
      // Optional: Add a short delay between clicks if necessary
      await page.waitForTimeout(500); // 500ms delay, adjust as needed
  }
  
  
  // Close the browser
 // await browser.close();
})();
