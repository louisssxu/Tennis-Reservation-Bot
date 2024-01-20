const utils = require("./utlis");
const puppeteer = require("puppeteer");

class Scrapper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log("starting window");
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1280, height: 720 });
  }

  async screenshot() {
    await this.page.screenshot({ path: "current.png", fullPage: true });
  }

  async goToResservePage() {
    console.log("going to reservation page");
    await this.page.goto(utils.reserveurl);
    await this.page.waitForTimeout("1000");
  }

  async goToLoginPage() {
    console.log("traveling to login page");
    await this.page.goto(utils.URL);
  }

  async loginPopup() {
    console.log("logging in via iframe");
    const frame = await this.page.waitForSelector(
      "#overlay-container > iframe.overlay-element.overlay-active"
    );
    const contentFrame = await frame.contentFrame();

    await contentFrame.waitForSelector("#edit-username", { visible: true });
    await contentFrame.$eval(
      "#edit-username",
      (el, value) => (el.value = value),
      utils.LOGIN.USERNAME
    );
    await contentFrame.waitForSelector("#edit-password", { visible: true });
    await contentFrame.$eval(
      "#edit-password",
      (el, value) => (el.value = value),
      utils.LOGIN.PASSWORD
    );
    const loginSelector = "#login-submit";
    await contentFrame.waitForSelector(loginSelector);
    await contentFrame.waitForTimeout("2000");
    await contentFrame.click(loginSelector);
    await contentFrame.waitForTimeout("1000");
  }

  async confirmReservation() {
    const confirmFrame = await this.page.waitForSelector(
      "#overlay-container > iframe.overlay-element.overlay-active"
    );
    const confirmContentFrame = await confirmFrame.contentFrame();
    await confirmContentFrame.waitForSelector("#mt-modal-actions");
    await confirmContentFrame.click("#mt-modal-actions");
  }

  async login() {
    console.log("logging in");
    await this.page.waitForTimeout("3000");

    const text = await this.page.evaluate(() => document.body.innerText);
    console.log(text);

    await this.page.waitForSelector("#edit-username", { visible: true });
    await this.page.$eval(
      "#edit-username",
      (el, value) => (el.value = value),
      utils.LOGIN.USERNAME
    );
    await this.page.waitForSelector("#edit-password", { visible: true });
    await this.page.$eval(
      "#edit-password",
      (el, value) => (el.value = value),
      utils.LOGIN.PASSWORD
    );
    const loginSelector = "#login-submit";
    await this.page.waitForSelector(loginSelector);
    await this.page.click(loginSelector);
    await this.page.waitForNavigation();
  }

  async travelHomeToReserveCourt() {
    console.log("traveling home to court reservation page");
    const [link] = await this.page.$x(
      "//a[contains(text(), 'Court Reservation')]"
    );
    link.click();
    await this.page.waitForNavigation();
    await this.page.waitForTimeout("500");
  }

  async RCselectMontrealLocation() {
    await this.page.waitForSelector("#mt-bac-locations");
    await this.page.select("#mt-bac-locations", "412");
    await this.page.waitForTimeout("500");
  }

  async RCselectTime(time) {
    await this.page.waitForSelector("#book-court-time-select");
    await this.page.select("#book-court-time-select", `${time}`);
    await this.page.waitForTimeout("500");
  }

  async RCselectDuration(duration) {
    await this.page.waitForSelector("#book-court-duration-select");
    await this.page.select("#book-court-duration-select", `${duration}`);
    await this.page.waitForTimeout("500");
  }

  async RCselectCourtType(type) {
    await this.page.waitForSelector("#book-court-type-select");
    await this.page.select("#book-court-type-select", `${type}`);
    await this.page.waitForTimeout("500");
  }

  // to improve: remove prev and next, add dates if overlap to next month, format with month
  async RCgetValidDates() {
    return await this.page.$$eval("#ui-datepicker-div a", (element) =>
      element.map((e) => e.innerText)
    );
  }

  // to improve: include month
  async RCselectCourtDate(date) {
    await this.page.waitForSelector("#book-court-date-select");
    await this.page.click("#book-court-date-select");
    await this.page.waitForSelector(".ui-datepicker-calendar");
    await this.page.$$eval(
      "#ui-datepicker-div a",
      (element, date) =>
        element.forEach((e) => {
          // console.log(e.innerText);
          if (e.innerText === `${date}`) {
            e.click();
          }
        }),
      date
    );
    await this.page.waitForTimeout("400");
  }

  async RCsubmit() {
    await this.page.waitForSelector("#book-court-submit-select");
    await this.page.click("#book-court-submit-select");
    await this.page.waitForTimeout("500");
  }

  // todo
  async RCreserve(date, searchTime) {
    const buttonOrder = [2, 3, 1, 0, 4];
    await this.RCselectCourtDate(date);
    await this.RCselectTime(searchTime);

    await this.RCsubmit();
    await this.page.waitForSelector("#search-results-container .row");
    const times = await this.page.$$eval(
      "#search-results-container .row",
      (element) =>
        element.map(
          (e) => e.querySelector(".mt-bac-result-time").innerText.split("- ")[1]
        )
    );
    console.log(times);

    for (const number of buttonOrder) {
      const time = searchTime + number - 2;
      const text = await this.page.$eval(
        `#buttonLink_${number}`,
        (element) => element.innerText
      );
      console.log(time + ":00 | " + text);
      if (text === "RESERVE") {
        console.log(
          "Found available court at " + (searchTime + number - 2) + ":00"
        );
        await this.page.waitForSelector(`#buttonLink_${number}`);
        await this.page.click(`#buttonLink_${number}`);
        break;
      } else if (text === "JOIN WAITLIST") {
        console.log(
          "Court unavailable at " + (searchTime + number - 2) + ":00"
        );
      } else {
        console.log("not loaded");
      }
    }
  }

  async close() {
    console.log("screenshot and closing");
    await this.page.waitForTimeout("2000");
    await this.screenshot();
    await this.browser.close();
  }
}

module.exports = Scrapper;
