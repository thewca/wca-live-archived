const express = require('express');
const router = express.Router();
const Competition = require('../models/competition');
const getCompetition = require('../middlewares/competition');

router.get('/competitions', (req, res, next) => {
  Competition.find({}).exec()
    .then((c) => res.json(c))
    .catch(next);
});

router.get('/competitions/:competitionId', getCompetition, (req, res) => {
  res.json(req.competition);
});

module.exports = router;
