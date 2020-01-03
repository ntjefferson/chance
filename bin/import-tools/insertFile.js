const pgp = require('pg-promise')();

// Set up DB connection
let connection;
if (process.env.NODE_ENV === 'test') {
  connection = {
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  };
} else {
  connection = {
    host: 'localhost',
    port: 54321,
    database: 'zylo_chance',
    user: 'user',
    password: 'password'
  };
}


const db = pgp(connection);

const insertFile = async (data, table) => {
  const cs = new pgp.helpers.ColumnSet(
    ['amount', 'date', 'name', 'description', 'type'],
    { table: table }
  );

  // Generates bulk insert Postgres query
  const query = pgp.helpers.insert(data, cs);

  // Wait for async function to finish before proceeding
  let response;
  await db
    .none(query)
    .then(() => {
      response = 'Your data has been uploaded to the database!';
    })
    .catch(() => {
      response = 'There has been an error uploading to the database.';
    });

  return response;
};

module.exports = { insertFile: insertFile, db: db };
