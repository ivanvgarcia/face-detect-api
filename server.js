const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require("./database");

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");

app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/profile", profile);

app.get("/", (req, res) => {
  res.status(200).json(database.users);
});

app.listen(5000, () => {
  console.log("Server is Running!");
});
