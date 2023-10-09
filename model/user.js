const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: "string" },
  lastName: { type: "string" },
  email: { type: "string" },
  password: { type: "string" },
});

module.exports = mongoose.model("user", userSchema);
