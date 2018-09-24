const { NotFound } = require('rest-api-errors');

module.exports = function (req, res, next) {
  let event = req.competition.events.find((event) => event.id === req.eventId);

  if (!event) {
    throw new NotFound(404, `Event '${req.eventId}' not found`);
  }

  req.round = event.rounds[req.roundNumber - 1];

  if (!req.round) {
    throw new NotFound(404, `Round '${req.roundNumber}' not found for event '${req.eventId}'`);
  }

  return next();
};
