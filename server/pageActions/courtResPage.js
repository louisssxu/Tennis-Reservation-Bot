const { reserveurl, Reservation, STATUSCODE } = require("../utlis");
const { PendingXHR } = require("pending-xhr-puppeteer");
const { screenshot } = require("./screenshot");

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const ss = async (page, path) => {
  // await delay(3000);
  await page.screenshot({
    path: `./screenshots/${path}.png`,
    fullPage: true,
  });
};

// actions
const init = async (page) => {
  await page.goto(reserveurl, { waitUntil: "networkidle2" });
};

const findCourt = async (page, targetDay, time) => {
  console.log(
    `Finding courts for ${targetDay.toLocaleDateString("default", {
      month: "long",
    })} ${targetDay.getDate()} from ${time - 2}:00 to ${time + 2}:00`
  );
  await setLocationMTL(page);
  await delay(500);
  await selectCourtDate(page, targetDay);
  // wait for dom to rerender
  // await delay(500);
  // await selectDuration(page, 120);
  await delay(500);
  await selectTime(page, time);
  await submit(page);
  try {
    await reserve(page, time);
  } catch (e) {
    throw e;
  }
};

const confirmReservation = async (page) => {
  const confirmFrame = await page.waitForSelector(
    "#overlay-container > iframe.overlay-element.overlay-active"
  );
  const confirmContentFrame = await confirmFrame.contentFrame();
  await confirmContentFrame.waitForSelector("#mt-modal-actions");
  await screenshot(page, "confirmation");
  await confirmContentFrame.click("#mt-modal-actions");
  console.log("\n ### Reservation Secured ### \n");
  await delay(3000);
};

// helper functions // 1, 2, 12, 11, 10
const reserve = async (page, searchTime) => {
  const buttonOrder = [3, 4, 2, 1, 0];
  await page.waitForSelector("#search-results-container .row");
  // await ss(page, "courts");
  await screenshot(page, "courts");
  for (const number of buttonOrder) {
    const time = searchTime + number - 2;
    const text = await page.$eval(
      `#buttonLink_${number}`,
      (element) => element.innerText
    );
    console.log("\t" + time + ":00 | " + text);
    if (text === "RESERVE") {
      console.log("\t\tFound available court at " + time + ":00");
      await page.waitForSelector(`#buttonLink_${number}`);
      await page.click(`#buttonLink_${number}`);
      return;
    } else if (text === "JOIN WAITLIST") {
      console.log("\t\tCourt unavailable at " + time + ":00");
    } else {
      console.log("\t\tnot loaded");
    }
  }
  throw STATUSCODE.ERROR;
};

const setLocationMTL = async (page) => {
  await page.waitForSelector("#mt-bac-locations");
  await page.select("#mt-bac-locations", "412");
};

const selectTime = async (page, time) => {
  await page.waitForSelector("#book-court-time-select");
  await page.select("#book-court-time-select", `${time}`);
};

const selectDuration = async (page, duration) => {
  await page.waitForSelector("#book-court-duration-select");
  await page.select("#book-court-duration-select", `${duration}`);
};

const selectCourtType = async (page, type) => {
  await page.waitForSelector("#book-court-type-select");
  await page.select("#book-court-type-select", `${type}`);
};

const selectCourtDate = async (page, targetDay) => {
  const pendingXHR = new PendingXHR(page);
  const date = targetDay.getDate();
  await page.waitForSelector("#book-court-date-select");
  await page.click("#book-court-date-select");
  await page.waitForSelector(".ui-datepicker-calendar");
  // checking month
  if (targetDay.getMonth() != new Date().getMonth()) {
    await page.$$eval("#ui-datepicker-div a", (element) =>
      element.forEach((e) => {
        if (e.innerText === `Next`) {
          e.click();
        }
      })
    );
    // to test
    await delay(200);
  }
  //   picking date
  await page.$$eval(
    "#ui-datepicker-div a",
    (element, date) =>
      element.forEach((e) => {
        if (e.innerText === `${date}`) {
          e.click();
        }
      }),
    date
  );
  await pendingXHR.waitForAllXhrFinished();
};

const submit = async (page) => {
  await page.waitForSelector("#book-court-submit-select");
  await page.click("#book-court-submit-select");
  await delay(500);
};

module.exports = { init, findCourt, confirmReservation, ss };
