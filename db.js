const knex = require("knex");
const environment = process.env.NODE_ENV || "development";

let postgres;

if (environment === "development") {
  postgres = knex({
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  });
} else {
  postgres = knex({
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });
}

module.exports = postgres;
