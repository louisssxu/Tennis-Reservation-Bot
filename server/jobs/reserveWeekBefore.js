const puppeteer = require("puppeteer");
const courtResPageActions = require("../pageActions/courtResPage");
const loginPopup = require("../pageActions/loginPopup");

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const reserve = async (targetDay, time) => {
  try {
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
      await browser.close();
      return;
    }
    // reserves and logs in when a court is found
    await loginPopup.login(page);
    await courtResPageActions.confirmReservation(page);
    console.log("\n ## Logged in and secured the court ##");
  } catch {
    courtResPageActions.ss(page, "./screenshots/error");
  }
  await browser.close();
};

const reserveTest = async (targetDay, time) => {
  try {
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
      await browser.close();
      return;
    }
    // reserves and logs in when a court is found
    await loginPopup.login(page);
    // await courtResPageActions.confirmReservation(page);
    console.log("\n ## Logged in and secured the court ##");
  } catch {
    courtResPageActions.ss(page, "./screenshots/error");
  }
  await browser.close();
};

module.exports = { reserve, reserveTest };
