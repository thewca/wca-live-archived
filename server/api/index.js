const auth = require('./auth/index');
const competition = require('./competition/index');
const competitors = require('./competitors/index');
const result = require('./result/index');

const routes = [ ...auth, ...competition, ...competitors, ...result ];

module.exports = routes;