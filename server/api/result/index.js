const server = require('server');
const { get, post, put, del } = server.router;
const Result = require('../../models/result');

const getForRound = get('/competition/:competitionId/:eventRoundId/results', async ctx => {
  let [eventId, roundId] = ctx.params.eventRoundId.split('-r');
  let results = await Result.find({
    competitionId: ctx.params.competitionId,
    eventId: eventId,
    round: roundId
  }).populate('competitor').exec();
  return results || [];
});

const getForCompetitor = get('/competition/:competitionId/competitors/:registrantId/results', async ctx => {
  let results = await Result.find({
    competitionId: ctx.params.competitionId,
    registrationId: ctx.params.registrantId
  }).populate('competitor').exec();
  return results || [];
});

module.exports = [ getForRound, getForCompetitor ];