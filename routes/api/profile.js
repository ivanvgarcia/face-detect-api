const express = require("express");
const router = express.Router();
const database = require("../../database");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    return res.status(400).json({ notfound: "error no user exists" });
  }
});

module.exports = router;
