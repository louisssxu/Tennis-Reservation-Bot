const puppeteer = require("puppeteer");
require("dotenv").config();

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function reserveLocal() {
  const rep = await fetch(
    "https://members.midtown.com/shoppingcart/add/schedule",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          "hubspotutk=eeea06fd1e9f170fa82590b90d6cc0f9; ken_gclid=Cj0KCQiAnfmsBhDfARIsAM7MKi3EjivS1w1nHZy0pRiVpLPn3kf2gPXMVoUIwsJo721-Rltqtb074QgaAhreEALw_wcB; _uetvid=255a3d50989911ee8bd5d378f030e09d; _ga=GA1.1.145876100.1702349402; _clck=8ep1tr%7C2%7Cfia%7C0%7C1441; _ga_CV2XYPV8K0=GS1.1.1704924010.11.0.1704924010.60.0.0; _ga_B2DRBWL098=GS1.1.1704924010.11.0.1704924010.0.0.0; _ga_PBFSMYPPMW=GS1.1.1704924010.11.0.1704924010.60.0.0; _gcl_au=1.1.857690776.1710130258; SSESS4c3d2f5ab079d6ba071d4d31db300ec2=4x_ZHumYtreewMS0fkRjL0hQJlTxx2I__NRP7B8u0x8; has_js=1; __hssrc=1; __hstc=41976570.eeea06fd1e9f170fa82590b90d6cc0f9.1702349402715.1714519844496.1714529883381.86; midtown_isloggedin=true; _ga_768SQK2MNE=GS1.1.1714529877.101.1.1714531830.0.0.0; portal_iframe=true; __hssc=41976570.33.1714529883381",
        Referer:
          "https://members.midtown.com/modal/court/reserve?render=overlay",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "clubId=412&serviceGuid=2795f5dc-14ad-4473-9582-32b2ba515738&resourceId=946&date=2024-05-10T11%3A00%3A00&duration=60&memberNum=965491",
      method: "POST",
    }
  );
  console.log(rep.status, await rep.text());
}
async function reserveAuto() {
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
      body: "clubId=412&serviceGuid=2795f5dc-14ad-4473-9582-32b2ba515738&resourceId=941&date=2024-05-07T06%3A00%3A00&duration=60&memberNum=965491",
      method: "POST",
    }
  );
  console.log(rep.status, await rep.text());
}

(async () => {
  const today = new Date();
  const targetDay = addDays(today, 7);

  console.log(today.toLocaleDateString({ timeZone: "America/Montreal" }));
  console.log(targetDay.toLocaleDateString({ timeZone: "America/Montreal" }));

  // const username = process.env.ACC_USER;
  // const password = process.env.ACC_PASS;
  // const browser = await puppeteer.launch({
  //   // executablePath: "/usr/bin/chromium-browser",
  //   headless: true,
  // });
  // const page = await browser.newPage();
  // await page.setViewport({ width: 1280, height: 600 });
  // await page.goto("https://members.midtown.com/", {
  //   waitUntil: "networkidle2",
  // });
  // await page.waitForSelector("#edit-username", { visible: true });
  // await page.$eval(
  //   "#edit-username",
  //   (el, value) => (el.value = value),
  //   username
  // );
  // await page.waitForSelector("#edit-password", { visible: true });
  // await page.$eval(
  //   "#edit-password",
  //   (el, value) => (el.value = value),
  //   password
  // );
  // const loginSelector = "#login-submit";
  // await page.waitForSelector(loginSelector);
  // await delay(1000);
  // await page.click(loginSelector);
  // await delay(2000);

  // await reserveAuto();
})();
