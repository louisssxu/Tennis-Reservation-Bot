const URL = "https://members.midtown.com/home";

const reserveurl = "https://members.midtown.com/reserve-a-court";

const STATUSCODE = { SUCCESS: 1, ERROR: 0 };

const Reservation = {
  CourtType: {
    inside: "2795f5dc-14ad-4473-9582-32b2ba515738",
    outside: "35763BF2-3155-4F62-BEEC-25F49CA5FE93",
  },
  CourtDuration: { oneHour: 60, twoHour: 120 },
  CourtTime: {
    "6:00AM": 6,
    "7:00AM": 7,
    "8:00AM": 8,
    "9:00AM": 9,
    "10:00AM": 10,
    "11:00AM": 11,
    "12:00PM": 12,
    "1:00PM": 13,
    "2:00PM": 14,
    "3:00PM": 15,
    "4:00PM": 16,
    "5:00PM": 17,
    "6:00PM": 18,
    "7:00PM": 19,
    "8:00PM": 20,
  },
};

module.exports = {
  URL,
  reserveurl,
  Reservation,
  STATUSCODE,
};
