require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const JWT = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const refreshTokenAuth = require("./middleware/refreshTokenAuth");

// mongoose schema
const User = require("./model/User");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json()); // The express. json() function is a middleware function used in Express. js applications to parse incoming JSON data from HTTP requests
const auth = require("./middleware/auth");
const authenticateUser = require("./middleware/auth");

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    // checking if all required information are provided
    if (!(firstName && lastName && password && email)) {
      return res.send(400).json({ msg: "All information is required" }); // bad request 400
    }

    // checking if user already exists
    const oldUser = await User.findOne({ email: email }).exec();

    // check for duplicate usernames in the db
    if (oldUser) {
      return res.status(409).send({ msg: "User already exists" }); // conflict with existing resource 409
    }

    // hashing the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // saving user  info with mongoose schema
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json(`Created account`);
  } catch (error) {
    console.log(error, "line 13");
    res.status(500).json({ error: error.message });
  }
});
app.post("/login", authenticateUser);

app.get("/logout", async (req, res) => {
  res.clearCookie("cookieHolder");
  res.sendStatus(200);
});

app.post("/refresh", refreshTokenAuth);
app.use(verifyJWT);

app.get("/allEmployees", async (req, res) => {
  try {
    const employees = await User.find({});
    console.log("✨ 🌟  app.get  employees: ", employees);
    res.status(200).send(employees);
  } catch (error) {
    console.log("✨ 🌟  app.get  error line: 😀", error);
  }
});

// routes
app.get("/welcome", (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.get("/deleteAll", async function (req, res) {
  try {
    await User.deleteMany({});
    return res.json("deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
