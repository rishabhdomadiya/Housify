/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/

const mongoose = require("mongoose");

const threadReply = new mongoose.Schema({
  threadId: { type: String, required: true },
  replyDesc: { type: String, required: true },
  replyDate: { type: String, default: () => new Date() },
  replyStatus: { type: Boolean, default: () => true },
  userName: { type: String, required: true },
});

module.exports = mongoose.model("reply", threadReply);
