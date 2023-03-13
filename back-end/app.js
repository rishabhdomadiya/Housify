/**
 * @author Kushang Arunbhai Mistry (B00870521) (Base file)
 * A main file for routing purposes and request handling purposes.
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const req = require("express/lib/request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

const mongoURL =
  "mongodb+srv://admin:admin@snapshareusers.xd7ya.mongodb.net/usersDatabase?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

const thread = require("./api/controller/thread");
app.use("/", thread);

const reply = require("./api/controller/threadReply");
app.use("/thread", reply);

const signupUser = require("./api/controller/signupUser");
app.use("/sign-up-user", signupUser);

const getAllUsers = require("./api/controller/getUserDetails");
app.use("/get-all-users", getAllUsers);

const authenticateUser = require("./api/controller/authenticate");
app.use("/sign-in-user", authenticateUser);

const getOneUserDetails = require("./api/controller/getSingleUser");
app.use("/getOneUserDetails", getOneUserDetails);

const getProperty = require("./api/controller/getProperty");
app.use("/getProperty", getProperty);

const getAllProperties = require("./api/controller/getAllProperties");
app.use("/getallproperties", getAllProperties);

const applicationdashboardRoute = require("./api/controller/applicationdashboardRoute");
app.use("/applicationdashboardRoute", applicationdashboardRoute);

const getHouses = require("./api/controller/getHouseList");
app.use("/getallhouses", getHouses);

var houseRoutes = require("./api/routes/house.routes.js");
app.use("/api/houses", houseRoutes);

var updateUserProfile = require("./api/controller/updateUserProfile");
app.use("/updateUserProfile", updateUserProfile);

var forgetPasswordAuthenticate = require("./api/controller/forgotPasswordAuthenticate");
app.use("/forgetPasswordAuthenticate", forgetPasswordAuthenticate);

var changePassword = require("./api/controller/changePassword");
app.use("/changePassword", changePassword);

var saveProperty = require("./api/controller/saveProperty");
app.use("/saveProperty", saveProperty);

var savePayment = require("./api/controller/savePayments");
app.use("/savePayment", savePayment);

app.use("/", (req, res) => {
  return res.status(404).json({ message: "Route not found", success: false });
});

module.exports = app;
