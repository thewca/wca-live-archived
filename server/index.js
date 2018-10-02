const server = require('server');
const { get } = server.router;
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(server.session);
let configFile = 'config/' + process.env.NODE_ENV;
const config = require(configFile);
const { error } = server.router;
const { status } = server.reply;
const corsExpress = require('cors')({
  origin: ['http://localhost:4200', 'https://live.worldcubeassociation.org'],
  credentials: true
});
const port = process.env.PORT || 3000;

const routes = require('./api/index');


mongoose.Promise = Promise;

const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  db: 'sessions',
});

mongoose.connect(config.mongoDb, { useNewUrlParser: true });

server(
  {
    session: { store },
    security: { csrf: false },
    port: port
  },
  server.utils.modern(corsExpress),
  server.utils.modern(passport.initialize()),
  server.utils.modern(passport.session()),
  ...routes,
  get('/', ctx => 'Hello WCA Live!'),
  error(ctx => status(500).send(ctx.error.message))
);

console.log('Server started on port ' + port);