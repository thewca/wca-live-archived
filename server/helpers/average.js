const getFormat = require('./wca').getFormatById;

module.exports = function(attempts, round) {
  let format = getFormat(round.format);
  if (!format.computeAverage) {
    return null;
  }

  let madeCutoff = false;

  if (round.cutoff && round.cutoff.numberOfAttempts > 0 && round.cutoff.attemptResult > 0) {
    let ai = 0;
    attempts.forEach(a => {
      if (ai <= round.cutoff.numberOfAttempts && a > 0 && a < round.cutoff.attemptResult) {
        madeCutoff = true;
      }
    });
  } else {
    madeCutoff = true; // there is no cutoff, so you automatically made it
  }

  if (!madeCutoff) {
    // no avg is calculated when cutoff is not made
    return null;
  }

  if (attempts.length < format.solveCount) {
    // competitor hasn't completed all attempts yet, so no avg can be calculated
    return null;
  }

  let validAttempts = attempts.filter(a => a > 0);

  // check if we have (at least) 3 or 4 valid attempts to calculate average for
  if (validAttempts.length < (format.solveCount === 5 ? 4 : 3)) {
    return -1;
  }

  let avgAttempts = validAttempts;

  if (format.solveCount === 5) {
    let max = Math.max(attempts);
    delete avgAttempts[avgAttempts.indexOf(max)]; // use delete instead of filter to only ever delete 1 max, even when competitor may have 2 attempts with the same best time
  }

  return (avgAttempts.reduce((a,b) => a + b) / avgAttempts.length)
};