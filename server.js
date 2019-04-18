const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
var cors = require("cors");

db.select("*")
  .from("users")
  .then(data => {
    console.log(data);
  });

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");

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
