const express = require('express');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { NotFound } = require('rest-api-errors');
const app = express();

mongoose.Promise = Promise;

app.set('config', config);
app.set('dev', process.env.NODE_ENV === 'dev');

/* Logging */

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stdout
}));

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.stderr
}));

/* Auth */

const sess = {
  secret: config.auth.secret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    db: 'sessions',
  }),
  cookie: { },
};


if (!app.get('dev')) {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/wca', require('./auth')(app, passport));

/* Routes */

app.use('/api', require('./api'));

app.use('/*', () => {
  throw new NotFound();
});

app.use(require('./middlewares/errors'));

/* Run */
mongoose.connect(config.mongodb);

const server = app.listen(config.port || 8000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening on port ${config.port}. Access at: http://0.0.0.0:${config.port}/`);
});

module.exports = server;
