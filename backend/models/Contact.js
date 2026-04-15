const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String,
  instagram: String,
  facebook: String,
});

module.exports = mongoose.model("Contact", ContactSchema);