const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with api"));
};

const handleGetProfile = db => (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch(err => res.status(400).json("error getting user"));
};

const handleGetEntries = db => (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.status(200).json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleApiCall,
  handleGetProfile,
  handleGetEntries
};
