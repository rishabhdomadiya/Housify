/* 
  authorName : Sanjuna Konda 
  email : sn493898@dal.ca
*/

const express = require("express");
const mongoose = require("mongoose");
const houses = require("../model/houseModel");
const db = require("../model");
const House = db.house;

const router = express.Router();

router.get("", async (req, res) => {
  await House
    .find()
    .exec()
    .then((result) => {
      if (House || House.length) {
        console.log(result);
        return res.status(200).json({
          message: "Success",
          success: true,
          houses: result,
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
