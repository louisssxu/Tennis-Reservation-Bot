const puppeteer = require("puppeteer");
const courtResPageActions = require("../pageActions/courtResPage");
const loginPopup = require("../pageActions/loginPopup");
const { screenshot } = require("../pageActions/screenshot");

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const reserve = async (targetDay, time, username, password) => {
  // launch browser
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  // get to court reservation page
  await courtResPageActions.init(page);
  try {
    await courtResPageActions.findCourt(page, targetDay, time);
  } catch (e) {
    console.log("\n No court found for this time");
    console.error(e);
    await screenshot(page, "error");
    await browser.close();
    return;
  }
  // reserves and logs in when a court is found
  try {
    await loginPopup.login(page, username, password);
    await courtResPageActions.confirmReservation(page);
  } catch (e) {
    console.log("\n Error logging in and confirming reservation");
    console.error(e);
    await screenshot(page, "error");
    await browser.close();
    return;
  }
  console.log("\n ## Logged in and secured the court ##");

  await screenshot(page, "end");
  await browser.close();
};

const reserveTest = async (targetDay, time) => {
  // launch browser
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  // get to court reservation page
  await courtResPageActions.init(page);
  try {
    await courtResPageActions.findCourt(page, targetDay, time);
  } catch (e) {
    console.log("\n No court found for this time");
    await screenshot(page, "error");
    // await browser.close();
    return;
  }
  // reserves and logs in when a court is found
  await loginPopup.login(page);
  // await courtResPageActions.confirmReservation(page);
  console.log("\n ## Logged in and secured the court ##");

  // await browser.close();
};

module.exports = { reserve, reserveTest };
