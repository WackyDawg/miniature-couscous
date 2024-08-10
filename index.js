const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send({ message: "Server running" })
})
app.listen(PORT, () => {
  console.log(`Test server is running on http://localhost:${PORT}`);
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
  for (let i = 0; i < 2; i++) {
    await page.click('#thread-add');
    // Add a short delay between clicks using the delay function
    await delay(500); // 500ms delay, adjust as needed
  }  

  // Wait for the button to be available in the DOM
  await page.waitForSelector('#start');

  // Click the button
  //await page.click('#start');

  // Optionally, you can wait for the chart to be shown or any other actions after the click
  await page.waitForSelector('.minerBarChart', { visible: true });
  console.log('chart shown')

  // Wait for the span to be available in the DOM
  await page.waitForSelector('#hashes-per-second');

  // Function to extract the value of the span element
  const getHashesPerSecond = async () => {
    return await page.$eval('#hashes-per-second', span => span.textContent.trim());
  };

  // Initial value
  let previousValue = await getHashesPerSecond();
  console.log(`Initial Hashes Per Second: ${previousValue}`);

  // Continuously monitor for changes
  setInterval(async () => {
    const currentValue = await getHashesPerSecond();
    if (currentValue !== previousValue) {
      console.log(`Hashes Per Second changed to: ${currentValue}`);
      previousValue = currentValue;
    }
  }, 1000); // Check every second

  // console.log(`Screenshot saved and available at http://localhost:${PORT}/screenshot`);

  // Close the browser
  //await browser.close();

})();
