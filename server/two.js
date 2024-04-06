const reserveWeekBefore = require("./jobs/reserveWeekBefore");
require("dotenv").config();

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const today = new Date();
  const targetDay = addDays(today, 7);
  console.log(`\n\n##### Executing on ${today} #####\n`);

  // TESTS
  let testDate = new Date("Apr 09, 2024");
  let testTime = 15;
  // console.log(testDate.toString());
  // await reserveWeekBefore.reserveTest(testDate, testTime);
  // await reserveWeekBefore.reserve(testDate, testTime);

  //Job
  await reserveWeekBefore.reserve(
    targetDay,
    17,
    process.env.ACC_USER_2,
    process.env.ACC_PASS_2
  ); // to change back to 17

  console.log(`\n##### Job ended at ${new Date()} #####\n`);
})();
