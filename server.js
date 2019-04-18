const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require("./database");

const auth = require("./routes/api/auth");

app.use(bodyParser.json());

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.status(200).json(database.users);
});

app.listen(5000, () => {
  console.log("Server is Running!");
});
