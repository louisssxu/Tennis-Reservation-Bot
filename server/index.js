// index.js
const reserveWeekBefore = require("./jobs/reserveWeekBefore");

(async () => {
  reserveWeekBefore.job;

  // TESTS
  // reserveWeekBefore.jobTest;
  // let testDate = new Date("Feb 2, 2024");
  // console.log(testDate.toString());
  // reserveWeekBefore.reserve(testDate, 8);
})();
