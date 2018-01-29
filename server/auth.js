const express = require('express');
const WCAStrategy = require('passport-wca').Strategy;
const User = require('./models/user');
const auth = require('./middleware/auth');

module.exports = (app, passport) => {
  const router = express.Router();
  const config = app.get('config');
  const options = config.auth.wca;

  passport.use(new WCAStrategy(options,
    (accessToken, refreshToken, profile, done) => {
      User.findOneAndUpdate({
        id: profile.id,
      }, {
        id: +profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        wca_id: profile.wca.id,
      }, {
        upsert: true,
      }, (err, user) => done(err, user));
    }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({id}, (err, user) => {
      done(err, user);
    });
  });

  router.get('/login', (req, res, next) => {
    req.session.redirect = req.query.redirect || '/';

    next();
  }, passport.authenticate('wca', {
    scope: config.auth.wca.scopes,
  }));

  router.get('/callback',
    passport.authenticate('wca', {
      failureRedirect: '/',
    }),
    (req, res) => {
      let redirect = req.session.redirect;
      delete req.session.redirect;
      res.redirect(redirect);
    });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/v0/me', auth, (req, res) => {
    res.json(req.user);
  });

  return router;
};
