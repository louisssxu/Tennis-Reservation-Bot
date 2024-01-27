const puppeteer = require("puppeteer");
const courtResPageActions = require("../pageActions/courtResPage");
const loginPopup = require("../pageActions/loginPopup");
const schedule = require("node-schedule");
const { FREQUENCES } = require("../utlis");

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const reserve = async (targetDay, time) => {
  // launch browser
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // get to court reservation page
  await courtResPageActions.init(page);
  try {
    await courtResPageActions.findCourt(page, targetDay, time);
  } catch (e) {
    console.log("No court found for this time");
    await browser.close();
    console.log(`\n##### Job ended at ${new Date()} #####\n`);
    return;
  }

  // reserves and logs in when a court is found
  await loginPopup.login(page);
  await courtResPageActions.confirmReservation(page);
  await browser.close();
  console.log(`\n##### Job ended at ${new Date()} #####\n`);
};

const job = schedule.scheduleJob("0 0 0 * * *", async () => {
  const today = new Date();
  console.log(`\n\n##### Executing on ${today} #####\n`);
  const targetDay = addDays(today, 7);
  await reserve(targetDay, 13);
});

module.exports = { job, reserve };
