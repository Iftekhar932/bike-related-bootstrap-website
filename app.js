require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const JWT = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");

// mongoose schema
const User = require("./model/user");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); // The express. json() function is a middleware function used in Express. js applications to parse incoming JSON data from HTTP requests
const auth = require("./middleware/auth");

// routes
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    // checking if all required information are provided
    if (!(firstName && lastName && password && email)) {
      return res.send(400).json({ msg: "All information is required" }); // bad request 400
    }

    // checking if user already exists
    const oldUser = await User.findOne({ email: email });
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

    // creating token
    const token = JWT.sign({ email: email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // saving user token
    user.token = token;

    res.status(201).send(user);
  } catch (error) {
    console.log(error, "line 13");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    // checking if all required information are provided
    if (!(password && email)) {
      return res.status(400).send({ msg: "All information is required" }); // bad request 400
    }

    // checking if user already exists
    const oldUser = User.find({ email });
    console.log("✨ 🌟  app.post  oldUser:", oldUser);
    /* 
    let accessToken;
    if (oldUser._conditions.email !== email){
      return res.status(403).send({ msg: "Invalid Credentials "})
    } */
    accessToken = JWT.sign({ email: email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.status(200).send("logged in");
  } catch (error) {
    console.log(error, "line 13");
  }
});

// Logic goes here

module.exports = app;
