const _ = require('lodash');
const express = require('express');
const WCAStrategy = require('passport-wca').Strategy;
const User = require('./models/user');
const auth = require('./middlewares/auth');

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
        wcaId: profile.wca.id,
        delegateStatus: profile.wca.delegate_status,
        accessToken: accessToken,
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

  const userMask = _.partial(_.pick,  _, ['id', 'name', 'email', 'delegateStatus', 'wcaId']);
  app.get('/api/me', auth, (req, res) => {
    res.json(userMask(req.user));
  });

  return router;
};
