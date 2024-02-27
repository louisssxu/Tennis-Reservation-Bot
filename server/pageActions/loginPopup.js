const { LOGIN } = require("../secret");

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function login(page) {
  console.log("Logging in via iframe");
  const frame = await page.waitForSelector(
    "#overlay-container > iframe.overlay-element.overlay-active"
  );
  const contentFrame = await frame.contentFrame();

  await contentFrame.waitForSelector("#edit-username", { visible: true });
  await contentFrame.$eval(
    "#edit-username",
    (el, value) => (el.value = value),
    LOGIN.USERNAME
  );
  await contentFrame.waitForSelector("#edit-password", { visible: true });
  await contentFrame.$eval(
    "#edit-password",
    (el, value) => (el.value = value),
    LOGIN.PASSWORD
  );
  const loginSelector = "#login-submit";
  await contentFrame.waitForSelector(loginSelector);
  await delay(1000);
  await contentFrame.click(loginSelector);
  await delay(2000);
}

module.exports = { login };
