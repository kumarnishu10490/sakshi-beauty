const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Register admin (run once only)
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await Admin.create({ username: req.body.username, password: hashed });
  res.json({ message: "Admin created" });
});

// Login
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(req.body.password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

module.exports = router;