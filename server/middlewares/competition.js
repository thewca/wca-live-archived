const { NotFound } = require('rest-api-errors');
const Competition = require('../models/competition');

module.exports = (req, res, next) => {
  if (!req.params.competitionId) {
    throw new Error({ code: 404, message: 'Missing competitionId' });
  }

  const { competitionId } = req.params;

  Competition.findOne({ id: competitionId }).exec()
    .then((competition) => {
      if (!competition) {
        throw new NotFound(404, `Competition '${competitionId}' not found`);
      }

      req.competition = competition;
    })
    .then(next)
    .catch(next);
};
