const knex = require("knex");

const postgres = knex({
  client: "pg",
  connection: {
    host: "postgresql-convex-89162",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

module.exports = postgres;
