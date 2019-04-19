require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");

// Routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", auth);
app.use("/profile", profile);

app.get("/", (req, res) => {
  res.status(200).json(db.users);
});

app.listen(4000, () => {
  console.log("Server is Running!");
});
