/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A user model to fetch and store data regarding single user
 */

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contactNumber: { type: String },
  currentCity: { type: String },
  preferredCity: { type: String },
  country: { type: String },
  savedProperties: { type: Array },
  payments: { type: Array },
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("User", userSchema);
