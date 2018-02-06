const port = process.env.PORT || 8080;
const staging = 'https://staging.worldcubeassociation.org';

module.exports = {
  port: port,
  domain: staging,
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
  mongodb: 'mongodb://localhost:27017/wca-live-dev',
};
