const handleRegister = (db, bcrypt, saltRounds) => (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "please fill in all inputs" });
  }

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
};

module.exports = {
  handleRegister
};
