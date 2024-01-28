// index.js
const reserveWeekBefore = require("./jobs/reserveWeekBefore");

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

(async () => {
  const today = new Date();
  const targetDay = addDays(today, 7);
  console.log(`\n\n##### Executing on ${today} #####\n`);

  // TESTS
  // let testDate = new Date("Feb 3, 2024");
  // let testTime = 17;
  // console.log(testDate.toString());
  // await reserveWeekBefore.reserveTest(testDate, testTime);

  //Job
  await reserveWeekBefore.reserve(targetDay, 13);

  console.log(`\n##### Job ended at ${new Date()} #####\n`);
})();
