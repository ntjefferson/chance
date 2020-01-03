'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: 'zylo_chance',
  user: 'user',
  password: 'password'
});

function getData(appName, cb) {
  pool.query(
    `
  SELECT
  name, SUM(amount), COUNT(*), ROUND(AVG(amount)::numeric,2)
  FROM
      charges
  WHERE
      name = $1
  GROUP BY
      1
  `,
    [appName],
    (err, res) => {
      if (err) {
        cb(new Error('Failed to aggregate data.'));
      } else {
        cb(null, res);
      }
    }
  );
}

module.exports = getData;
