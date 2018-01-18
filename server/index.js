const express = require('express');
const config = require('config');
const app = express();

app.get('/', (req, res) => {
  res.end('Hello World');
});

app.listen(config.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening on port ${config.port}. Open up http://0.0.0.0:${config.port}/ in your browser.`);
});
