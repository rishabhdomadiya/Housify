/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A property model to fetch and store data regarding single property
 */

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  owner: { type: String, required: true },
  price: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },

  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Property", propertySchema);
