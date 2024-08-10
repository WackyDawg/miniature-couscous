const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs')

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

  console.log(`Screenshot saved and available at http://localhost:${PORT}/screenshot`);

  // Close the browser
  //await browser.close();

})();
