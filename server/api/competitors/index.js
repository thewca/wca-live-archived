const server = require('server');
const { get, post, put, del } = server.router;
const Registration = require('../../models/registration');

const getCompetitors = get('/competition/:id/competitors', async ctx => {
  if (!ctx.params.id) {
    return server.reply.status(404).send('Missing competition id');
  }
  let competitors = await Registration.find({ competitionId: ctx.params.id }).populate('competitor').exec();
  return competitors;
});

const getCompetitorsForRound = get('/competition/:competitionId/:eventRoundId/competitors', async ctx => {
  let [ eventId, roundId ] = ctx.params.eventRoundId.split('-r');
  if (roundId == 1) {
    // first round, so return all competitors for this event
    let competitors = await Registration.find({
      competitionId: ctx.params.competitionId,
      events: eventId
    }).populate('competitor').exec();
    return competitors;
  } else {
    // TODO: IMPLEMENT BASED ON RESULT IN PREVIOUS ROUND
    return server.reply.status(501).send(`Further rounds not yet implemented. Requested for ${ctx.params.eventRoundId}`);
  }
});

module.exports = [ getCompetitors, getCompetitorsForRound ];