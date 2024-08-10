const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const screenshotPath = path.join(__dirname, 'example.png');

// Serve the screenshot at /screenshot
app.get('/screenshot', (req, res) => {
  if (fs.existsSync(screenshotPath)) {
    res.sendFile(screenshotPath);
  } else {
    res.status(404).send('Screenshot not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Function to simulate a delay
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time);
  });
}

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: true });

  // Open a new page
  const page = await browser.newPage();

  // Go to a webpage
  await page.goto('https://mobileminer.org/mine/?auto=1&addr=43WJQfGyaivhEZBr95TZGy3HGei1LVUY5gqyUCAAE4viCRwzJgMcCn3ZVFXtySFxwZLFtrjMPJXhAT9iA9KYf4LoPoKiwBc', {
    waitUntil: "networkidle0",
    timeout: 0
  });

  // Take a screenshot and save it as example.png

  // Wait for the selector to be available
  await page.waitForSelector('#thread-add');

  // Click the button 12 times
  for (let i = 0; i < 12; i++) {
    await page.click('#thread-add');
    // Add a short delay between clicks using the delay function
    await delay(500); // 500ms delay, adjust as needed
  }  
  await page.screenshot({ path: screenshotPath });

  console.log(`Screenshot saved and available at http://localhost:${PORT}/screenshot`);

  // Close the browser
  //await browser.close();

})();
