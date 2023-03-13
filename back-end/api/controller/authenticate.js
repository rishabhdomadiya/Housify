/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * Authenticates the if user is abailable or not
 */

const express = require("express");
const mongoose = require("mongoose");
const { validate } = require("../model/usersModel");
const users = require("../model/usersModel");
const generateToken = require("../model/generateToken");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await users.findOne({ email: req.body.email });
    if (user === null)
      return res
        .status(401)
        .json({ message: "User Does not Exist", success: false });
    else {
      if (user.password != req.body.password) {
        return res
          .status(401)
          .json({ message: "Invalid Password", success: false });
      }

      const token = generateToken(user.id);
      return res
        .status(200)
        .json({ message: "Loggin Successful", data: token, success: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});

module.exports = router;
