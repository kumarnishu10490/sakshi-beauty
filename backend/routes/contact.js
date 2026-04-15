const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET contact details
router.get("/", async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
});

// UPDATE contact details
router.post("/update", async (req, res) => {
  await Contact.findOneAndUpdate({}, req.body, { upsert: true });
  res.json({ message: "Contact updated" });
});

module.exports = router;