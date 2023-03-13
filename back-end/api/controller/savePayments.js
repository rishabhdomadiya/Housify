/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To update user profile to the database and system
 * /saveProperty
 */

const express = require("express");
const mongoose = require("mongoose");
const { validate } = require("../model/usersModel");
const users = require("../model/usersModel");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    var query = { email: req.body.email };
    console.log("Got the request from React");

    const updatedDocument = await users.findOneAndUpdate(
      { email: req.body.email },
      { $push: { payments: req.body.paymentDetails } }
    );

    return res
      .status(200)
      .json({ message: "Payment recorded Successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});

module.exports = router;
