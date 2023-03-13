/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * To authenticate user from the database and system
 * Route: /forgetPasswordAuthenticate
 */

const express = require("express");
const mongoose = require("mongoose");
const { validate } = require("../model/usersModel");
const users = require("../model/usersModel");
const nodemailer = require("nodemailer");
const router = express.Router();

/**
 * https://www.itsolutionstuff.com/post/how-to-send-email-using-gmail-account-in-nodejsexample.html
 * Gmail SMTP server address: smtp.gmail.com
Gmail SMTP name: Your full name
Gmail SMTP username: Your full Gmail address (e.g. you@gmail.com)
Gmail SMTP password: The password that you use to log in to Gmail
Gmail SMTP port (TLS): 587
Gmail SMTP port (SSL): 465
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "housify.app@gmail.com",
    pass: "Test@123",
  },
});

router.post("", async (req, res) => {
  try {
    console.log("Got the request from React");
    const user = await users.findOne({ email: req.body.email });
    const email = req.body.email;

    const message = {
      from: "housify.app@gmail.com",
      to: email,
      subject: "Reset your housify password",
      html:
        '<html><head></head><body> Please click on the link here to reset your password <a href= "https://housify-group12.herokuapp.com/new-password/' +
        email +
        '">Click Me</a> </body></html>',
    };

    if (!user) {
      return res.json({ message: "User does not exist", success: false });
    } else {
      const response = await transporter.sendMail(message);
      console.log("response", response);
      return res.status(200).json({ message: response, success: true });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
