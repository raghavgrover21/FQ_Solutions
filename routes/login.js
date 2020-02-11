const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Models
const User = require("../models/User");

//Services
const generateToken = require("../services/generateToken");
const { validateLogin } = require("../services/validators");
const sanitizeError = require("../services/sanitizeValidation");

//Login route
router.post("/", async (req, res) => {
  //Validations
  const { error } = validateLogin(req.body);
  if (error) {
    let message = error.details[0].message;
    let invalidType = sanitizeError(message);
    return res.json({
      status: false,
      message: `${invalidType} is invalid`
    });
  }

  const mobile = req.body.mobile;
  const password = req.body.password;
  const userDetails = await User.findOne({ mobile });
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
    } else {
      res.json({ status: true, message: "invalid username or password" });
    }
  }
});

module.exports = router;
