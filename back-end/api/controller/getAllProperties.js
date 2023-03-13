/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To fetch details of all properties
 */

const express = require("express");
const mongoose = require("mongoose");
const { house } = require("../model");

const router = express.Router();

router.post("", async (req, res) => {
  await house
    .find({ _id: { $in: req.body.idList } })
    .then((result) => {
      return res.status(200).json({
        message: "Success",
        success: true,
        propertyDetails: result,
      });
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
