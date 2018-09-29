const server = require('server');
const { get, post, put, del } = server.router;
const Registration = require('../../models/registration');

const getCompetitors = get('/competition/:id/competitors', async ctx => {
  if (!ctx.params.id) {
    return server.reply.status(404).send('Missing competition id');
  }
  let competitors = await Registration.find({ competitionId: ctx.params.id }).exec();
  return competitors;
});

module.exports = [ getCompetitors ];