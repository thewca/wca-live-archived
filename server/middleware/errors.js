const { STATUS_CODES } = require('http');
const { APIError, InternalServerError } = require('rest-api-errors');

module.exports = function (err, req, res, next) {
  let error = err instanceof APIError ? err : new InternalServerError();

  if(process.env.NODE_ENV !== 'production') {
    console.error('error', err);
  }

  res.status(error.status || 500).json({
    code: error.code || 500,
    message: error.message || STATUS_CODES[error.status],
  });

  next();
};
