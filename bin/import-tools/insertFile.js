const pgp = require("pg-promise")();

const insertFile = async data => {
  // Set up DB connection
  const connection = {
    host: "localhost",
    port: 54321,
    database: "zylo_chance",
    user: "user",
    password: "password"
  };

  const db = pgp(connection);

  const cs = new pgp.helpers.ColumnSet(
    ["amount", "date", "name", "description", "type"],
    { table: "charges" }
  );

  // Generates bulk insert Postgres query
  const query = pgp.helpers.insert(data, cs);

  // Wait for async function to finish before proceeding
  await db
    .none(query)
    .then(res => {
      console.log("Your data has been uploaded to the database!");
    })
    .catch(err => {
      console.log("There has been an error (see below)...");
      console.log(err);
    });
};

module.exports = insertFile;
