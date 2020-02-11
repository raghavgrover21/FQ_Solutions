// External libraries
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Cross origin so that this application communicate with another port on same pc or another pc.
const cors = require("cors");

//Routes
const admin = require("./routes/admin");
const signup = require("./routes/signup");
const login = require("./routes/login");
const user = require("./routes/user");

//Initializing express
const app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/FQsol", { useNewUrlParser: true });

//Server port number
const port = process.env.port || 80;
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});

//Test route
app.post("/", (req, res) => {
  res.send("working");
});

//Admin Route
app.use("/admin", admin);

//Signup Route
app.use("/signup", signup);

//Login Route
app.use("/login", login);

//User Route
app.use("/user", user);
