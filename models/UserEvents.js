const mongoose = require("mongoose");

const UserEvent = mongoose.model("UserEvent", {
  //mobile - primary key
  mobile: String,
  event_name: String,
  organizer_name: String,
  updated_at: Date
});

module.exports = UserEvent;
