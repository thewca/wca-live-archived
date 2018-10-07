const Result = require('../models/result');
const Competition = require('../models/competition');

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
  let advancePercentage = 75;
  if (round.advancementCondition && round.advancementCondition.type === 'percentage') {
    advancePercentage = Math.min(advancePercentage, round.advancementCondition.level);
  }
  let maxAdvancable = Math.floor((advancePercentage / 100) * results.filter(r => r.solves.length > 0).length);
  if (round.advancementCondition && round.advancementCondition.type === 'ranking') {
    maxAdvancable = Math.min(maxAdvancable, round.advancementCondition.level);
  }
  results.sort((a, b) => {
    let avgA = null;
    let avgB = null;

    if (a.average) {
      // make DNF and DNS very high numbers so we can still compare them normally, while maintaining DNF > DNS
      avgA = a.average.centiseconds === -1 ? Number.MAX_SAFE_INTEGER - 2 : (a.average.centiseconds === -2 ? Number.MAX_SAFE_INTEGER - 1 : a.average.centiseconds);
    }
    if (b.average) {
      // make DNF and DNS very high numbers so we can still compare them normally, while maintaining DNF > DNS
      avgB = b.average.centiseconds === -1 ? Number.MAX_SAFE_INTEGER - 2 : (b.average.centiseconds === -2 ? Number.MAX_SAFE_INTEGER - 1 : b.average.centiseconds);
    }
    if (avgA && avgB) {
      if (avgA < avgB) {
        return -1;
      }
      if (avgA > avgB) {
        return 1;
      }
    }

    // average vs no average
    if (a.average && !b.average) {
      return -1;
    }
    if (b.average && !a.average) {
      return 1;
    }

    // same average, so sorting by best single
    let bestA;
    let bestB;
    a.solves.forEach(s => {
      let c = s.centiseconds;
      // make DNF and DNS very high numbers so we can still compare them normally, while maintaining DNF > DNS
      if (c === -1) c = Number.MAX_SAFE_INTEGER - 2;
      if (c === -2) c = Number.MAX_SAFE_INTEGER - 1;
      if (c < bestA || bestA === null) bestA = c;
    });
    b.solves.forEach(s => {
      let c = s.centiseconds;
      // make DNF and DNS very high numbers so we can still compare them normally, while maintaining DNF > DNS
      if (c === -1) c = Number.MAX_SAFE_INTEGER - 2;
      if (c === -2) c = Number.MAX_SAFE_INTEGER - 1;
      if (c < bestB || bestB === null) bestB = c;
    });
    if (bestA && bestB) {
      if (bestA < bestB) {
        return -1;
      }
      if (bestA > bestB) {
        return 1;
      }
    }
    if (bestA && !bestB) {
      return -1;
    }
    if (bestB && !bestA) {
      return 1;
    }
    if (a.competitor.name < b.competitor.name) {
      return -1;
    }
    if (a.competitor.name > b.competitor.name) {
      return 1;
    }
    return 0;
  });
  let currentRanking = 1;
  let numWithThisRanking = 0;
  results.forEach(async (r, ix) => {
    if (ix > 0) {
      let a = results[ix - 1];
      let b = results[ix];
      let bestA;
      let bestB;
      a.solves.forEach(s => {
        let c = s.centiseconds;
        // make DNF and DNS very high numbers so we can still compare them normally, while maintaining DNF > DNS
        if (c === -1) c = Number.MAX_SAFE_INTEGER - 2;
        if (c === -2) c = Number.MAX_SAFE_INTEGER - 1;
        if (c < bestA || bestA === null) bestA = c;
      });
      b.solves.forEach(s => {
        let c = s.centiseconds;
        // make DNF and DNS very high numbers so we can still compare them normally, while maintaining DNF > DNS
        if (c === -1) c = Number.MAX_SAFE_INTEGER - 2;
        if (c === -2) c = Number.MAX_SAFE_INTEGER - 1;
        if (c < bestB || bestB === null) bestB = c;
      });
      if ((b.average === null && a.average !== null) || (b.average && a.average && b.average.centiseconds !== a.average.centiseconds) || bestB !== bestA) {
        currentRanking += numWithThisRanking;
        numWithThisRanking = 0;
      }
    }
    r.ranking = currentRanking;
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
    numWithThisRanking++;
    await Result.findByIdAndUpdate(r._id, { ranking: r.ranking, advancable: r.advancable }).exec();
  });
};