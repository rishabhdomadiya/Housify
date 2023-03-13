/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To update user profile to the database and system
 */

const express = require("express");
const mongoose = require("mongoose");
const { validate } = require("../model/usersModel");
const users = require("../model/usersModel");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    var query = { email: req.body.email };

    const update = {
      password: req.body.password,
    };
    const filter = { email: req.body.email };
    const updatedDocument = await users.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Password Changed Successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});

module.exports = router;
