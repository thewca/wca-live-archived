const { STATUS_CODES } = require('http');
const { APIError, InternalServerError } = require('rest-api-errors');

module.exports = (err, req, res, next) => {
  let error = err instanceof APIError ? err : new InternalServerError();

  let errorResponse = {
    code: error.code || error.status || 500,
    message: error.message || STATUS_CODES[error.status],
    WCAError: !!err.WCAError
  };

  if(process.env.NODE_ENV !== 'production') {
    console.error(err);
    console.error('error', errorResponse);
  }

  res.status(error.status || 500).json(errorResponse);

  next();
};
