const server = require('server');
const { get, post, put, del } = server.router;
const passport = require('passport');
const WCAStrategy = require('passport-wca').Strategy;
const User = require('../../models/user');
const pluck = require('../../helpers/object.pluck');
const moment = require('moment');
const fetch = require('node-fetch');
const Competition = require('../../models/competition');
const Person = require('../../models/person');
const Registration = require('../../models/registration');

let configFile = 'config/' + process.env.NODE_ENV;
const config = require(configFile);

const port = process.env.PORT || 3000;

const wcaOptions = {
  clientID: config.wca.oAuth.clientID,
  clientSecret: config.wca.oAuth.clientSecret,
  scopes: 'public dob email manage_competitions',
  callbackURL: `http://localhost:${port}/auth/callback`,
  authorizationURL: `${config.wcaServer}/oauth/authorize`,
  tokenURL: `${config.wcaServer}/oauth/token`,
  userProfileURL: `${config.wcaServer}/api/v0/me`,
};

const auth = ctx => {
  if (!(ctx.user && ctx.user.accessToken)) {
    return server.reply.status(401).send('Unauthorized');
  }
};

passport.use(new WCAStrategy(wcaOptions,
  (accessToken, refreshToken, profile, done) => {
    User.findOneAndUpdate({
      id: profile.id,
    }, {
      id: +profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      wcaId: profile.wca.id,
      delegateStatus: profile.wca.delegate_status,
      avatar: profile._json.me.avatar.thumb_url,
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


const login = get(
  '/auth/login',
  ctx => {
    ctx.session.redirect = ctx.query.redirect || '/';
  },
  server.utils.modern(passport.authenticate('wca', { scope: wcaOptions.scopes }))
);

const callback = get(
  '/auth/callback',
  server.utils.modern(passport.authenticate('wca', { failureRedirect: '/' })),
  ctx => {
    let redirect = ctx.session.redirect || '/';
    delete ctx.session.redirect;
    return server.reply.redirect(redirect);
  }
);

const logout = get('/auth/logout', ctx => {
  ctx.logout();
  return server.reply.redirect(ctx.query.redirect || '/');
});

const me = get('/auth/me', auth, ctx => {
  return server.reply.json(pluck(ctx.user, 'id', 'name', 'wcaId', 'avatar'));
});

const competitions = get('/auth/me/competitions', auth, async (ctx) => {
  let headers = {};
  if (ctx.user && ctx.user.accessToken) {
    headers.Authorization = `Bearer ${ctx.user.accessToken}`;
  }
  let start = moment().add(-70, 'day');
  let result;
  try {
    let data = await fetch(`${config.apiBaseUrl}/competitions?managed_by_me=true&start=${start.format('YYYY-MM-DD')}`, {headers});
    if (data.ok) {
      result = await data.json();
    } else {
      return server.reply.status(data.status).send(data.statusText);
    }
  } catch (err) {
    if (err.code === 404) {
      return server.reply.status(404).send('No competitions found.');
    }
    return server.reply.status(err.code).send(err.msg);
  }
  if (result) {
    return server.reply.json(result
      .map(c => pluck(c, 'id', 'name', 'country_iso2', 'start_date', 'end_date'))
      .map(c => {
        return {
          id: c.id,
          name: c.name,
          countryIso: c.country_iso2,
          startDate: c.start_date,
          endDate: c.end_date
        };
      }));
    } else {
      return server.reply.json([]);
    }
});

const importCompetition = post('/auth/competition/:id', auth, async ctx => {
  let headers = {};
  if (ctx.user && ctx.user.accessToken) {
    headers.Authorization = `Bearer ${ctx.user.accessToken}`;
  }
  let result = await fetch(`${config.apiBaseUrl}/competitions/${ctx.params.id}/wcif`, {headers})
    .then(data => {
      if (data.ok) {
        return data.json();
      }
      return server.reply.status(data.status).send(data.statusText);
    })
    .catch(err => {
      if (err.code === 404) {
        return server.reply.status(404).send('Competition WCIF not found.');
      }
      return server.reply.status(err.code).send(err.msg);
    })
  ;
  return result;
  let competition = await Competition.findOneAndUpdate({
    id: ctx.params.id
  }, {
    id: ctx.params.id,
    name: result.name,
    shortName: result.shortName,
    startDate: moment(result.schedule.startDate, 'YYYY-MM-DD').toDate(),
    endDate: moment(result.schedule.startDate, 'YYYY-MM-DD').add(result.schedule.numberOfDays - 1, 'day').toDate(),
    events: result.events
  }, {
    upsert: true
  });
  result.persons.forEach(async person => {
    await Person.findOneAndUpdate({
      id: person.wcaUserId
    }, {
      id: person.wcaUserId,
      wcaId: person.wcaId,
      thumbnailUrl: person.avatar.thumbUrl,
      avatarUrl: person.avatar.url,
      dateOfBirth: moment(person.birthdate, 'YYYY-MM-DD').toDate(),
      country: person.countryIso2,
      gender: person.gender,
      name: person.name,
      personalBests: person.personalBests || []
    }, { upsert: true });

    if (person.registration && person.registration.status === 'accepted') {
      await Registration.findOneAndUpdate({
        competitionId: ctx.params.id,
        competitorId: person.wcaUserId
      }, {
        competitionId: ctx.params.id,
        competitorId: person.wcaUserId,
        registrantId: person.registrantId,
        events: person.registration.eventIds
      }, { upsert: true });
    }
  });
  result.events.forEach(event => {
    event.rounds.forEach(round => {
      round.roundResults.forEach(result => {
        // save results
      });
    });
  });
  if (competition) {
    return competition;
  } else {
    return await Competition.findOne({ id: ctx.params.id });
  }
});

module.exports = [ login, callback, logout, me, competitions, importCompetition ];