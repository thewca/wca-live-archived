const { Unauthorized } = require('rest-api-errors');

module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    throw new Unauthorized();
  }

  return next();
};
