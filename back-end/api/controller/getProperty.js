/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To fetch detail of single property
 */

const express = require("express");
const mongoose = require("mongoose");
const property = require("../model/propertyModel");
const db = require("../model");
const houses = db.house;

const router = express.Router();

router.post("", async (req, res) => {
  await houses
    .findOne({ _id: req.body.id })
    .exec()
    .then((result) => {
      console.log(result);
      if (houses || houses.length) {
        return res.status(200).json({
          message: "Success",
          success: true,
          propertyDetails: result,
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
