const { Unauthorized } = require('rest-api-errors');

module.exports = function (req, res, next) {
  console.log(4, req.isAuthenticated())
  if (!req.isAuthenticated()) {
    throw new Unauthorized();
  }

  return next();
};
