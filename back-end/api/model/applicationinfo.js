/* 
  authorName : Dhruv Oza 
  email : dhruv.oza@dal.ca
*/

const mongoose = require("mongoose");


const applicationSchema = {
  email: { type: String, required: true },
  fullName: String,
  currentaddress: String,
  contactnumber: String,
  postalcode: String,
  noofpeople: String,
  date: String,
  applicationID: String,
  status: String,
  house_id: String,
  house_email: String,
  applieddate: { type: Date, default: Date.now },
  _id: mongoose.Schema.Types.ObjectId,
};

module.exports = mongoose.model("Application", applicationSchema);
