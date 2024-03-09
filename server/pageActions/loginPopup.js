const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const { screenshot } = require("./screenshot");

async function login(page) {
  console.log(process.env.ACC_USER);
  console.log(process.env.ACC_PASS);
  console.log("Logging in via iframe");
  const frame = await page.waitForSelector(
    "#overlay-container > iframe.overlay-element.overlay-active"
  );
  const contentFrame = await frame.contentFrame();

  await contentFrame.waitForSelector("#edit-username", { visible: true });
  await contentFrame.$eval(
    "#edit-username",
    (el, value) => (el.value = value),
    process.env.ACC_USER
  );
  await contentFrame.waitForSelector("#edit-password", { visible: true });
  await contentFrame.$eval(
    "#edit-password",
    (el, value) => (el.value = value),
    process.env.ACC_PASS
  );
  await screenshot(page, "login");
  // const loginSelector = "#login-submit";
  // await contentFrame.waitForSelector(loginSelector);
  // await delay(2000);
  // await contentFrame.click(loginSelector);
  // await delay(2000);
}

module.exports = { login };
