'use strict';

const logger = require('./api/helpers/logger');
const middleware = require('./middleware');

const swaggerParser = require('swagger-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = '4000';
process.env.NODE_ENV = 'development';

app.use('/static', express.static(`${__dirname}/client/build/static`));

middleware.beforeSwagger(app);

swaggerParser.validate('./api/swagger/swagger.yaml', (err, api) => {
  if (err) throw err;

  middleware.afterSwagger(app, api);

  app.listen(port);
  logger.info(`===== Chance api has started on port: ${port}`);
  logger.info('===== forwarded http://localhost:8080');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = app;
