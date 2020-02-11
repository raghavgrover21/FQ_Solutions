const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Models
const User = require("../models/User");

//Services
const generateToken = require("../services/generateToken");
const { validateSignUp } = require("../services/validators");
const sanitizeError = require("../services/sanitizeValidation");

//Signup
router.post("/", async (req, res) => {
  //add new user

  //validations
  const { error } = validateSignUp(req.body);
  if (error) {
    let message = error.details[0].message;
    let invalidType = sanitizeError(message);
    return res.json({
      status: false,
      message: `${invalidType} is invalid`
    });
  }
  //Hashing the password before storing
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const user = {
    name: req.body.userName,
    mobile: req.body.mobile,
    role: req.body.role,
    password: hashPassword,
    is_active: req.body.isActive,
    updated_at: new Date().getTime()
  };

  try {
    const isUser = await User.findOne({ mobile: user.mobile });
    if (isUser) {
      res.json({
        status: true,
        message: "user already exist please try logging in"
      });
    } else {
      const createUser = await User.create(user);
      if (createUser) {
        let token = generateToken(user.userName, user.mobile, user.password);
        res.json({
          status: true,
          message: "user created successfully",
          token: token
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Something went wrong" });
  }
});

module.exports = router;
