const puppeteer = require("puppeteer");
require("dotenv").config();

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function login() {
  const username = process.env.ACC_USER;
  const password = process.env.ACC_PASS;
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 600 });
  await page.goto("https://members.midtown.com/", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector("#edit-username", { visible: true });
  await page.$eval(
    "#edit-username",
    (el, value) => (el.value = value),
    username
  );
  await page.waitForSelector("#edit-password", { visible: true });
  await page.$eval(
    "#edit-password",
    (el, value) => (el.value = value),
    password
  );
  const loginSelector = "#login-submit";
  await page.waitForSelector(loginSelector);
  await page.click(loginSelector);
  await delay(500);
}

async function reserve(date) {
  const dateString = date.toLocaleDateString("en-CA", {
    timeZone: "America/Montreal",
  });
  let timeString = (date.getHours() + 1).toString();

  console.log("Reserving for: ", dateString, "@", timeString + ":00");

  if (timeString.length === 1) {
    timeString = "0" + timeString;
  }

  const rep = await fetch(
    "https://members.midtown.com/shoppingcart/add/schedule",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": '"Not(A:Brand";v="24", "Chromium";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          "SSESS4c3d2f5ab079d6ba071d4d31db300ec2=oVpMWFYyzhh-AW8iDq3TJufBdmUO_aTIYmqKxg5VxCo; has_js=1; _ga=GA1.1.1443520638.1714762149; _gcl_au=1.1.1249650334.1714762149; __hstc=41976570.3fcdb06797b4a00b7392e61e6f0e3d3d.1714762149349.1714762149349.1714762149349.1; hubspotutk=3fcdb06797b4a00b7392e61e6f0e3d3d; __hssrc=1; _fbp=fb.1.1714762149505.931331220; midtown_isloggedin=true; _ga_768SQK2MNE=GS1.1.1714762148.1.1.1714762207.0.0.0; portal_iframe=true; __hssc=41976570.6.1714762149349",
        Referer:
          "https://members.midtown.com/modal/court/reserve?render=overlay",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `clubId=412&serviceGuid=2795f5dc-14ad-4473-9582-32b2ba515738&resourceId=941&date=${dateString}T${timeString}%3A00%3A00&duration=60&memberNum=965491`,
      method: "POST",
    }
  );
  console.log(rep.status, await rep.text());
}

(async () => {
  const today = new Date();
  let targetDay = new Date();
  targetDay.setDate(today.getDate() + 7);
  targetDay.setHours(today.getHours() + 1);
  console.log(
    "\n###",
    today.toLocaleString("en-CA", { timeZone: "America/Montreal" }),
    "###"
  );

  await login();
  await reserve(targetDay);

  console.log("###", Date.now() - today.getTime(), "ms ###");
  process.exit();
})();
