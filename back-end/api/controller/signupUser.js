/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To add user to the database and system
 */

const express = require("express");
const mongoose = require("mongoose");
const { validate } = require("../model/usersModel");
const users = require("../model/usersModel");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    console.log("Got the request from React");
    const user = await users.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ message: "User Already Exist", success: false });

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    const newUser = new users({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password,
    });

    await newUser
      .save()
      .then((result) => {
        console.log(result);
        return res.status(201).json({ message: "User Created", success: true });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Internal Server Error", success: false });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});

module.exports = router;
