const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Models
const User = require("../models/User");
const Event = require("../models/Event");

//Services
const checkToken = require("../services/checkToken");
const checkRole = require("../services/checkRole");
//used async and await instead of callbacks and promises to maintain a clean code

//Add a user
router.post("/add/user", checkToken, async (req, res) => {
  //Encrpyt the users password
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  if (!checkRole(req.decoded.role)) {
    return res.json({ status: false, message: "access denied" });
  }
  const user = {
    name: req.body.userName,
    mobile: req.body.mobile,
    role: req.body.role,
    password: hashPassword,
    is_active: req.body.isActive,
    updated_at: new Date().getTime()
  };

  try {
    const newUser = await User.create(user);
    return res.json({
      status: true,
      message: "user created successfully",
      newUser
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: "something went wrong" });
  }
});

//Remove a user
router.post("/remove/user", checkToken, async (req, res) => {
  console.log(req.decoded);
  if (!checkRole(req.decoded.role)) {
    return res.json({ status: false, message: "access denied" });
  }
  const mobile = req.body.mobile;
  try {
    const removedUser = await User.findOneAndUpdate(
      { mobile },
      { is_active: false },
      { new: true }
    );
    if (removedUser) {
      return res.json({
        status: true,
        removedUser,
        message: " User removed successfully"
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "something went wrong" });
  }
});

//Add event
router.post("/add/event", checkToken, async (req, res) => {
  const eventDetails = {
    organizer_id: req.body.organizerid,
    event_name: req.body.eventname,
    organizer_name: req.body.organizername,
    sponsors: req.body.sponsors,
    is_active: req.body.isActive
  };
  try {
    const addEvent = await Event.create(eventDetails);
    res.json({ status: true, message: "event added successfully", addEvent });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "something went wrong" });
  }
});

//Remove an event

module.exports = router;
