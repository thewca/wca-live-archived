const wcaServer = 'https://staging.worldcubeassociation.org';

module.exports = {
  mongoDb: 'mongodb://localhost:27017/wca-live-dev',
  wcaServer: wcaServer,
  apiBaseUrl: `${wcaServer}/api/v0`,
  wca: {
    oAuth: {
      clientID: '1168e1fbe4a11055c9dca879752050a01c460133c5c3a336ddfca5afa8445774',
      clientSecret: '6d0b6dcd3943213e37231a0867e95410e085e1e9d42f31da026b58378b838e05'
    }
  }
};