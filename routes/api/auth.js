const express = require("express");
const router = express.Router();
const database = require("../../database");

router.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.status(200).json({ success: "user is signed in" });
  } else {
    res.status(400).json({ error: "User not found or incorrect password" });
  }
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const newUser = {
    id: 148,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  };

  database.users.push(newUser);

  res.status(200).json(database.users[database.users.length - 1]);
});

module.exports = router;
