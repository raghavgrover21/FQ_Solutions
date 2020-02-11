const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Models
const User = require("../models/User");

//Services
const generateToken = require("../services/generateToken");

//Login route
router.post("/", async (req, res) => {
  const mobile = req.body.mobile;
  const password = req.body.password;
  const userDetails = await User.findOne({mobile});
  if (!userDetails) {
    return res.json({ status: true, message: "user not found" });
  } else {
    const isPassValid = bcrypt.compareSync(password, userDetails.password);
    if (isPassValid) {
      let token = generateToken(
        userDetails.name,
        userDetails.mobile,
        userDetails.role
      );
      return res.json({ status: true, message: "user logged in", token });
    }
  }
});

module.exports = router;
