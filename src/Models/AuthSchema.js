const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  selectedCountry: {
    type: Object,
  },
});

const USER = mongoose.model("USERS", Schema);

module.exports = USER;
