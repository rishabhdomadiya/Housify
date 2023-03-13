/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/

const express = require("express");
const mongoose = require("mongoose");
const Thread = require("../model/threadSchema");
const users = require("../model/usersModel");
const router = express.Router();

router.post("/addthread", async (req, res) => {
  try {
    await users
      .findOne({ email: req.body.email })
      .exec()
      .then(async (result) => {
        const addThread = new Thread({
          title: req.body.title,
          date: req.body.date,
          description: req.body.description,
          name: result.firstName,
        });
        const insertThread = await addThread.save();
        res.send(insertThread);
      })
      .catch((err) => {
        console.log((err) => {
          return res
            .status(500)
            .json({ message: "Internal Server Erorr", success: false });
        });
      });
  } catch (error) {
    console.log("4$", error);
    return res.status(400).send(error);
  }
});

router.get("/getthread", async (req, res) => {
  try {
    const getthread = await Thread.find({});
    res.send(getthread);
  } catch (error) {
    console.log("4$", error);
    return res.status(400).send(error);
  }
});

module.exports = router;
