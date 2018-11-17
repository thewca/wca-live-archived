const Result = require('../models/result');
const Competition = require('../models/competition');
const rank = require('@wca/helpers').rank;
const formatById = require('../helpers/wca').getFormatById;

module.exports = async function (ctx) {
  let [ eventId, roundId ] = ctx.params.eventRoundId.split('-r');
  let competition = await Competition.findOne({ id: ctx.params.competitionId }).exec();
  let numRounds = competition.events.filter(e => e.id == eventId)[0].rounds.length;
  let isFinal = numRounds == roundId;
  let round = competition.events.filter(e => e.id == eventId)[0].rounds.filter(r => r.id == ctx.params.eventRoundId)[0];
  let results = await Result.find({
    competitionId: ctx.params.competitionId,
    eventId: eventId,
    round: roundId
  }).populate('competitor').lean().exec();
  results = results.filter(r => r.attempts.length > 0);
  let advancePercentage = 75;
  if (round.advancementCondition && round.advancementCondition.type === 'percentage') {
    advancePercentage = Math.min(advancePercentage, round.advancementCondition.level);
  }
  let maxAdvancable = Math.floor((advancePercentage / 100) * results.filter(r => r.attempts.length > 0).length);
  if (round.advancementCondition && round.advancementCondition.type === 'ranking') {
    maxAdvancable = Math.min(maxAdvancable, round.advancementCondition.level);
  }

  let format = formatById(round.format);

  console.log(results);
  let ranked = rank(results, format.sortBy === 'best' ? ['single'] : ['average', 'single'] );

  console.log(ranked.map(r => [r.ranking, r.registrationId]));

  let currentRanking = 1;
  let numWithThisRanking = 0;
  results.forEach(async (r) => {
    let ranking = ranked.filter(rnkd => rnkd.personId === r.personId)[0].ranking;
    r.ranking = ranking;
    if (ranking === currentRanking) {
      numWithThisRanking++;
    } else {
      currentRanking = ranking;
      numWithThisRanking = 0;
    }
    if (isFinal && r.ranking <= 3) {
      r.advancable = true;
    }
    if (!isFinal && round.advancementCondition && (round.advancementCondition.type == 'percentage' || round.advancementCondition.type == 'ranking') ) {
      if (currentRanking + numWithThisRanking <= maxAdvancable) {
        r.advancable = true;
      } else {
        r.advancable = false;
        // also set advancable to false for everyone with same ranking
        await Result.updateMany({
          competitionId: ctx.params.competitionId,
          eventId: eventId,
          round: roundId,
          ranking: currentRanking
        }, {
          advancable: false
        }).exec();
      }
    }
    await Result.findByIdAndUpdate(r._id, { ranking: r.ranking, advancable: r.advancable }).exec();
  });
};