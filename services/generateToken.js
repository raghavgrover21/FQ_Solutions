const jwt = require("jsonwebtoken");
const secret = "azby@saltString#bde23x";

module.exports = (userName, mobile, role) => {
  return jwt.sign({ userName, mobile, role }, secret, {
    expiresIn: "1d"
  });
};
