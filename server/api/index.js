const auth = require('./auth/index');
const competition = require('./competition/index');

const routes = [ ...auth, ...competition ];

module.exports = routes;