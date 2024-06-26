// index.js
const reserveWeekBefore = require("./jobs/reserveWeekBefore");
require("dotenv").config();

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

(async () => {
  const today = new Date();
  const targetDay = addDays(today, 7);
  console.log(`\n\n##### Executing on ${today} #####\n`);

  // TESTS IM EDITING THROUHT VIM!
  let testDate = new Date("Apr 09, 2024");
  let testTime = 15;
  // console.log(testDate.toString());
  // await reserveWeekBefore.reserveTest(testDate, testTime);
  // await reserveWeekBefore.reserve(testDate, testTime);

  //Job
  await reserveWeekBefore.reserve(
    targetDay,
    12,
    process.env.ACC_USER,
    process.env.ACC_PASS
  ); // to change back to 12

  console.log(`\n##### Job ended at ${new Date()} #####\n`);
})();
