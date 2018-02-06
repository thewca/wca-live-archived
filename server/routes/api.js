const express = require('express');
const router = express.Router();
const Competition = require('../models/competition');
const auth = require('../middlewares/auth');
const getCompetition = require('../middlewares/competition');
const { getCompetitionWCIF } = require('../lib/wcaApi');

router.get('/competitions', (req, res, next) => {
  Competition.find({}).select(['name', 'id']).exec()
    .then((c) => res.json(c))
    .catch(next);
});

router.get('/competitions/:competitionId', getCompetition, (req, res) => {
  res.json(req.competition);
});

// Grabs competition from WCA website and imports it here.
router.post('/competitions/:competitionId', auth, (req, res, next) => {
  getCompetitionWCIF(req.params.competitionId, req.user.accessToken)
    .then((data) =>
      Competition.findOneAndUpdate({
        id: req.params.competitionId,
      }, data, {
        upsert: true,
      }))
    .then((competition) => {
      res.json(competition);
    })
    .catch(next);
});

module.exports = router;
