const express = require("express");
const router = express.Router();
//lodash - sanatize data
const _ = require("lodash");

//Models
// const User = require("../models/User");
const Event = require("../models/Event");
const UserEvents = require("../models/UserEvents");

//Services
const checkToken = require("../services/checkToken");

//Fetch all events
router.post("/get/allevents", checkToken, async (req, res) => {
  try {
    //limit for pagination
    const allEvents = await Event.find().limit(10);

    //Sanitize allEvents data
    if (allEvents.length > 0) {
      let events = _.map(allEvents, obj => {
        return _.pick(obj, [
          "event_name",
          "organizer",
          "organizer_name",
          "sponsors"
        ]);
      });
      res.json({ status: true, events });
    } else {
      res.json({ status: true, message: "no events available as of now" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: true, message: "Something went wrong" });
  }
});

router.post("/add/event", checkToken, async (req, res) => {
  const userEvents = {
    mobile: req.decoded.mobile,
    event_name: req.body.eventname,
    organizer_name: req.body.organizername
  };
  try {
    const addEvent = await UserEvents.create(userEvents);
    res.json({
      status: true,
      message: "event successfully added to your wishlist",
      addEvent
    });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "something went wrong" });
  }
});
module.exports = router;
