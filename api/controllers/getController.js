'use strict';

const getData = require('../services/getService');

/**
 * Swagger Controller method for GET /charges/get Endpoint
 */

function getCharges(req, res) {
  const { appName } = req.swagger.params.appName.value;
  getData(appName, (err, results) => {
    if (err) {
      res
        .status(400)
        .json({ code: 400, message: err.message })
        .end();
    } else {
      res
        .status(200)
        .json(results.rows[0])
        .end();
    }
  });
}

module.exports = {
  getCharges: getCharges
};
