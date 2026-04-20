const express = require("express");
const router = express.Router();

let images = []; // temporary storage

// GET images
router.get("/images", (req, res) => {
  res.json(images);
});

// POST upload
router.post("/upload", (req, res) => {
  const { url } = req.body;
  images.push({ url });
  res.json({ message: "Uploaded" });
});

module.exports = router;
