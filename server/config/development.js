const wcaServer = 'https://staging.worldcubeassociation.org';

module.exports = {
  mongoDb: 'mongodb://localhost:27017/wca-live-dev',
  wcaServer: wcaServer,
  apiBaseUrl: `${wcaServer}/api/v0`,
  wca: {
    oAuth: {
      clientID: '80179a5dc470615566d356d435658baba999e838c8060a4748f6c4cbd5d00af2',
      clientSecret: '7895af1f9f6bbeb2cc39892db186b178d27f0138ae67db8c2ed5446fe7eb1f1f'
    }
  }
};