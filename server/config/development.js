const wcaServer = 'https://staging.worldcubeassociation.org';

module.exports = {
  mongoDb: 'mongodb://localhost:27017/wca-live-dev',
  wcaServer: wcaServer,
  apiBaseUrl: `${wcaServer}/api/v0`,
  wca: {
    oAuth: {
      clientID: '95e3fc3b58b7cc12e7e8ef968219c7ed3187a8a4d3378c0a6d5066c2124a864a',
      clientSecret: '565dcb045eedf913cd646a6e90a4c539b69b89d83ed2fe6f13470a299d578f57'
    }
  }
};