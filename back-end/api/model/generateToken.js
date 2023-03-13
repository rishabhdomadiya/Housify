/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To generate token and send to front
 */

const jwt = require("jsonwebtoken");

const generateAuthToken = (id) => {
  const token = jwt.sign({ _id: id }, "Kushang@123", { expiresIn: "1d" });
  return token;
};

module.exports = generateAuthToken;
