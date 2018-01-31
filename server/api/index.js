const express = require('express');
const router = express.Router();
const Competition = require('../models/competition');
const { NotFound } = require('rest-api-errors');

const getCompetition = (req, res, next) => {
  if (!req.params.competitionId) {
    throw new Error({ code: 404, message: 'Missing competitionId' });
  }

  const { competitionId } = req.params;

  Competition.findOne({
    id: competitionId
  }, (err, competition) => {
    if (err) {
      return next(err);
    }

    if (!competition) {
      return next(new NotFound(404, `Competition '${competitionId}' not found`));
    }

    req.competition = competition;
  });
};

router.get('/competitions', function (req, res) {
  Competition.find({}).exec((err, competitions) => {
    if (err) throw err;

    res.json(competitions);
  });
});


router.get('/competitions/:competitionId', getCompetition, function (req, res) {
  res.json(req.competition);
});

module.exports = router;
