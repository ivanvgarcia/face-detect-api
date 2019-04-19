const handleLogin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "please fill in all inputs" });
  }

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
};

module.exports = {
  handleLogin
};
