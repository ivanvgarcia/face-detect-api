const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .where("email", "=", email)
    .from("login")
    .then(data => {
      bcrypt.compare(password, data[0].hash, (err, response) => {
        if (response) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then(user => res.json(user[0]))
            .catch(err =>
              res.status(400).json({ error: "unable to get user" })
            );
        }
        res.status(400).json({ error: "invalid credentials" });
      });
    })
    .catch(err => res.status(400).json({ error: "invalid credentials" }));
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds).then(hash => {
    db.transaction(trx => {
      trx
        .insert({
          hash,
          email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name,
              joined: new Date()
            })
            .then(user => {
              res.status(200).json(user[0]);
            })
            .catch(err => {
              res.status(400).json(err);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err =>
      res
        .status(400)
        .json({ error: "there was an error registering your account" })
    );
  });
});

module.exports = router;
