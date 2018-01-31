const port = 8088;
const staging = 'https://staging.worldcubeassociation.org';

module.exports = {
  port: port,
  auth: {
    secret: 'wca-live-secret',
    wca: {
      clientID: 'example-application-id',
      clientSecret: 'example-secret',
      scopes: 'public dob email manage_competitions',
      callbackURL: `http://localhost:${port}/auth/wca/callback`,
      authorizationURL: `${staging}/oauth/authorize`,
      tokenURL: `${staging}/oauth/token`,
      userProfileURL: `${staging}/api/v0/me`,
    }
  },
  mongodb: 'mongodb://localhost:27017/wca-live-test',
};
