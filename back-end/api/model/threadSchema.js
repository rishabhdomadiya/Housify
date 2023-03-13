/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/

const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, default: () => new Date() },
  description: { type: String, required: true },
  status: { type: Boolean, default: () => true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("thread", threadSchema);
