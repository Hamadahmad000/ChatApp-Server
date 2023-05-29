const mongoose = require("mongoose");

const DATABASE_CONNECT = (URL) => {
  try {
    mongoose.connect(URL);
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("Database Connection Failed");
  }
};

module.exports = DATABASE_CONNECT;
