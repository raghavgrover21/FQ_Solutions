module.exports = message => {
  let invalidValue = message.replace(/[^a-zA-Z ]/g, " ").split(" ");
  return invalidValue[1];
};
