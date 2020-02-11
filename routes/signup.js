const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Models
const User = require("../models/User");

//Services
const generateToken = require("../services/generateToken");

//Signup
router.post("/", async (req, res) => {
  //add new user
  //Hashing the password before storing
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const user = {
    userName: req.body.username,
    mobile: req.body.mobile,
    role: req.body.role,
    password: hashPassword
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
