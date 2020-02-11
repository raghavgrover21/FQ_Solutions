const express = require("express");
const router = express.Router();
//lodash - sanatize data
const _ = require("lodash");
//Models
const User = require("../models/User");
const Event = require("../models/Event");

//Services
const checkToken = require("../services/checkToken");

//Fetch all events
router.post("/", checkToken, async (req, res) => {
  try {
    //limit for pagination
    const allEvents = await Event.find().limit(10);

    //Sanitize allEvents data
    if (allEvents.length > 0) {
      let events = _.map(allEvents, obj => {
        return _.pick(obj, ["name", "organizer", "sponsors"]);
      });
      res.json({ status: true, events });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: true, message: "Something went wrong" });
  }
});

module.exports = router;
