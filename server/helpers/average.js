const getFormat = require('./wca').getFormatById;
const Mo3 = require('@wca/helpers').Mo3;
const Ao5 = require('@wca/helpers').Ao5;

module.exports = function(attempts, round) {
  let format = getFormat(round.format);
  if (!format.computeAverage) {
    return null;
  }

  let madeCutoff = true;

  if (round.cutoff && round.cutoff.numberOfAttempts > 0) {
    madeCutoff = false;
    for (let i = 0; i < round.cutoff.numberOfAttempts; i++) {
      let r = attempts[i];
      if (r > 0 && r < round.cutoff.attemptResult) {
        madeCutoff = true;
      }
    }
  }

  if (!madeCutoff) {
    return null;
  }

  return format.id === 'a' ? Ao5(attempts) : Mo3(attempts);
};