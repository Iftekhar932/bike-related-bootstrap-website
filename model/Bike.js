const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  model: String,
  type: String,
  engine: String,
  price: Number,
  color: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Bike", bikeSchema);
