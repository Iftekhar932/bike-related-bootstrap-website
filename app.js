require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json()); // The express. json() function is a middleware function used in Express. js applications to parse incoming JSON data from HTTP requests

// Logic goes here

module.exports = app;
