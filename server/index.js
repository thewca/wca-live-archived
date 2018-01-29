const express = require('express');
const config = require('config');
const morgan = require('morgan');
const app = express();

/* Logging */

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stdout
}));

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.stderr
}));

/* Routes */

app.get('/', (req, res) => {
  res.end('Hello World');
});

app.use(require('./middleware/errors'));

/* Run */

app.listen(config.port || 8000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening on port ${config.port}. Access at: http://0.0.0.0:${config.port}/`);
});
