const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// existing
const contactRoutes = require("./routes/Contact");
app.use("/api/contact", contactRoutes);

// new lines added
app.use("/api/auth", require("./routes/auth"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/services", require("./routes/services"));

app.listen(5000, () => console.log("Server running on port 5000"));