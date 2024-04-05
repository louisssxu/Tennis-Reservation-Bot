const fs = require("fs").promises;
const path = require("path");

async function screenshot(page, folder, fileName) {
  const dirPath = path.join(__dirname, "screenshots", folder);

  // const dirPath = path.join(__dirname, folder);

  try {
    // Check if the directory exists, `access` throws an error if it does not
    await fs.access(dirPath);
  } catch (error) {
    // If the directory does not exist, create it
    await fs.mkdir(dirPath, { recursive: true });
  }

  // Proceed to take a screenshot
  await page.screenshot({
    path: path.join(dirPath, `${fileName}.png`),
    fullPage: true,
  });
}

module.exports = { screenshot };
