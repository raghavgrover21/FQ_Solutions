const mongoose = require("mongoose");

const UserEvent = mongoose.model("UserEvent", {
  //mobile - primary key
  mobile: String,
  eventname: String,
  organizername: String
});

module.exports = UserEvent;
