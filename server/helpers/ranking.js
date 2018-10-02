module.exports = async function (ctx) {
  let [ eventId, roundId ] = ctx.params.eventRoundId.split('-r');
  let results = await Result.find({
    competitionId: ctx.params.competitionId,
    eventId: eventId,
    round: roundId
  }).exec();
  results = results.sort((a, b) => {
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
  results.forEach((r, ix) => {
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
    numWithThisRanking++;
    Ranking.findByIdAndUpdate(r._id, r);
  });
};