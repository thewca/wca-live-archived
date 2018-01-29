const { STATUS_CODES } = require('http');

module.exports = function (err, req, res, next) {
  if(process.env.NODE_ENV !== 'production') {
    console.error('error', 'Unknown server error...');
    console.error('error', err);
  }

  res.status(err.status || 500).json({
    code: err.code || 500,
    message: err.message || STATUS_CODES[err.status],
  });
};
