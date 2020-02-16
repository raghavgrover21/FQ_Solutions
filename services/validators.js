//Validations file as per each API
//Note - Token based API are not required to be validated
const Joi = require("@hapi/joi");

//validate signup
const validateSignUp = data => {
  const schema = Joi.object({
    mobile: Joi.string().required(),
    userName: Joi.string().required(),
    role: Joi.string().required(),
    isActive: Joi.string().required(),
    password: Joi.string().required()
  }).strict();
  return schema.validate(data);
};

//Validate login
const validateLogin = data => {
  const schema = Joi.object({
    mobile: Joi.string().required(),
    password: Joi.string().required()
  }).strict();
  return schema.validate(data);
};

module.exports.validateSignUp = validateSignUp;
module.exports.validateLogin = validateLogin;
