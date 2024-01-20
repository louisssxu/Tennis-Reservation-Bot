const puppeteer = require("puppeteer");
const courtResPage = require("../pageActions/courtResPage");
const loginPopup = require("../pageActions/loginPopup");
const schedule = require("node-schedule");
const { FREQUENCES } = require("../utlis");

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const reserve = async (time) => {
  const today = new Date();
  const targetDay = addDays(today, 7);
  console.log(`\n\n##### Executing on ${today} #####\n`);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  await courtResPage.init(page);
  try {
    await courtResPage.findCourt(page, targetDay, time);
  } catch (e) {
    console.log("No court found for this time");
    await browser.close();
    console.log(`\n##### Job ended at ${new Date()} #####\n`);
    return;
  }
  await loginPopup.login(page);
  await courtResPage.confirmReservation(page);
  await browser.close();
  console.log(`\n##### Job ended at ${new Date()} #####\n`);
};

const job = schedule.scheduleJob("0 0 0 * * *", async () => {
  await reserve(13);
});

module.exports = { job, reserve };
