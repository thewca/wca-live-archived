const auth = require('./auth/index');
const competition = require('./competition/index');
const competitors = require('./competitors/index');

const routes = [ ...auth, ...competition, ...competitors ];

module.exports = routes;