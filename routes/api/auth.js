const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .compare(
      password,
      "$2b$10$mll.a63715tb2QMNL2F0iuQeaPu1ZDfJiS6vCOsjolK23oJd4oT1i"
    )
    .then(response => {
      if (response == true && email === db.users[0].email) {
        res.status(200).json(db.users[0]);
      } else {
        res.status(400).json({ error: "User not found or incorrect password" });
      }
    });
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // bcrypt.hash(password, saltRounds).then(hash => {
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.status(200).json(user[0]);
    })
    .catch(err => {
      res.status(400).json("unable to register");
    });

  // });
});

module.exports = router;
