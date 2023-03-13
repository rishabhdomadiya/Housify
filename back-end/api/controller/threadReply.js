/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/
const express = require("express");
const mongoose = require("mongoose");
const url = require("url");
const Reply = require("../model/threadReply");
const users = require("../model/usersModel");
const thread = require("../model/threadSchema");
const router = express.Router();

router.post("/addThreadReply", async (req, res) => {
  try {
    await users
      .findOne({ email: req.body.email })
      .exec()
      .then(async (result) => {
        const addThreadReply = new Reply({
          threadId: req.body.threadId,
          replyDesc: req.body.replyDesc,
          userName: result.firstName,
        });
        const insertThreadReply = await addThreadReply.save();
        res.send(insertThreadReply);
      })
      .catch((err) => {
        console.log((err) => {
          return res
            .status(500)
            .json({ message: "Internal Server Error", success: false });
        });
      });
  } catch (error) {
    console.log("4$", error);
    return res.status(400).send(error);
  }
});

router.get("/getThreadData", async (req, res) => {
  try {
    const requestParams = url.parse(req.url, true).query;
    const threadData = {};
    const threadInfo = await thread.find({
      _id: requestParams.threadId,
    });
    threadData.title = threadInfo[0].title;
    threadData.description = threadInfo[0].description;
    const threadReplies = await Reply.find({
      threadId: requestParams.threadId,
    });
    threadData.replies = threadReplies;
    res.send(threadData);
  } catch (error) {
    return res.status(400).send("Thread not found");
  }
});

module.exports = router;
