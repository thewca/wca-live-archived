const server = require('server');
const { get, post, put, del } = server.router;
const Competition = require('../../models/competition');
const Registration = require('../../models/registration');

const getById = get('/competition/:id', async ctx => {
  if (!ctx.params.id) {
    return server.reply.status(404).send('Missing competition id');
  }
   let competition = await Competition.findOne({ id: ctx.params.id }).exec();
   if (!competition) {
     return server.reply.status(404).send('Competition not found');
   }
   return competition;
});

const getAll = get('/competition', async ctx => {
  let competitions = await Competition.find({}).select(['name', 'id', 'startDate', 'endDate']).exec();
  return competitions;
});

const getCompetitors = get('/competition/:id/competitors', async ctx => {
  if (!ctx.params.id) {
    return server.reply.status(404).send('Missing competition id');
  }
  let competitors = await Registration.find({ competitionId: ctx.params.id }).exec();
  return competitors;
});

module.exports = [ getById, getAll, getCompetitors ];