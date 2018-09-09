const _ = require('lodash');
const express = require('express');
const WCAStrategy = require('passport-wca').Strategy;
const User = require('./models/user');
const auth = require('./middlewares/auth');
const { getCompetitionsManagedByMe } = require('./lib/wcaApi.js');

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
    let redirect = req.query.redirect || '/';
    res.redirect(redirect);
  });

  const userMask = _.partial(_.pick,  _, ['id', 'name', 'email', 'delegateStatus', 'wcaId']);
  app.get('/api/me', auth, (req, res) => {
    res.json(userMask(req.user));
  });

  app.get('/api/me/competitions', auth, (req, res, next) => {
    let now = (new Date(Date.now() - 7 * 86400000)).toISOString().slice(0, 10); // returns yyyy-mm-dd
    getCompetitionsManagedByMe(req.user.accessToken, now)
      .then((competitions) => {
        res.json(_.map(competitions, (competition) => ({
          id: competition.id,
          name: competition.name,
          countryIso2: competition.country_iso2,
          startDate: competition.start_date,
          endDate: competition.end_date,
        })).sort((a, b) => {
          if (a.startDate < b.startDate) {
            return -1;
          }
          if (a.startDate > b.startDate) {
            return 1;
          }
          if (a.endDate < b.endDate) {
            return -1;
          }
          if (a.endDate > b.endDate) {
            return 1;
          }
          return 0;
        }));
      })
      .catch(next);
  });

  return router;
};
