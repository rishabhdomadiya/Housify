/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To fetch details of single user
 */

const express = require("express");
const mongoose = require("mongoose");
const users = require("../model/usersModel");

const router = express.Router();

router.post("", async (req, res) => {
  await users
    .findOne({ email: req.body.email })
    .exec()
    .then((result) => {
      if (users || users.length) {
        return res.status(200).json({
          message: "Success",
          success: true,
          users: result,
        });
      }
    })
    .catch((err) => {
      console.log((err) => {
        return res
          .status(500)
          .json({ message: "Internal Server Erorr", success: false });
      });
    });
});

module.exports = router;
