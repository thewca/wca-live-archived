const server = require('server');
const { get, post, put, del } = server.router;
const Result = require('../../models/result');

const getForRound = get('/competition/:competitionId/:eventRoundId/results', async ctx => {
  let [eventId, roundId] = ctx.params.eventRoundId.split('-r');
  let results = await Result.find({
    competitionId: ctx.params.competitionId,
    eventId: eventId,
    round: roundId
  }).populate('competitor').sort('ranking').lean().exec();
  results = results || [];
  results.sort((a, b) => {
    if (a.ranking && b.ranking) {
      if (a.ranking < b.ranking) return -1;
      if (a.ranking > b.ranking) return 1;
    }
    if (a.ranking && !b.ranking) return -1;
    if (!a.ranking && b.ranking) return 1;
    let bestA = Math.min(a.attempts.map(s => s.centiseconds));
    let bestB = Math.min(b.attempts.map(s => s.centiseconds));
    if (bestA < bestB) return -1;
    if (bestA > bestB) return 1;
    if (a.competitor.name < b.competitor.name) return -1;
    if (a.competitor.name > b.competitor.name) return 1;
    return 0;
  });
  // results.forEach(r => {
  //   if (r.solves.length === 0) r.ranking = null;
  // });
  return results;
});

const getForCompetitor = get('/competition/:competitionId/competitors/:registrantId/results', async ctx => {
  let results = await Result.find({
    competitionId: ctx.params.competitionId,
    registrationId: ctx.params.registrantId
  }).populate('competitor').exec();
  return results || [];
});

module.exports = [ getForRound, getForCompetitor ];