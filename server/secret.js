require("dotenv").config();
const LOGIN = {
  USERNAME: process.env.ACC_USER,
  PASSWORD: process.env.ACC_PASS,
};

module.exports = { LOGIN };
