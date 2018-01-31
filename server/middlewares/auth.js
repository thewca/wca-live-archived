const { Unauthorized } = require('rest-api-errors');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new Unauthorized();
  }

  return next();
};
