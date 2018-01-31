process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../');
const Competition = require('../models/competition');

chai.should();

chai.use(chaiHttp);

describe('Competitions', () => {
  // Empty the database before each test
  beforeEach((done) => {
    Competition.remove({}, done);
  });

  describe('/GET competitions', () => {
    it('Should GET all the competitions', () =>
      chai.request(app)
        .get('/api/competitions/')
        .then(function (res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        }).catch(function (err) {
          throw err;
        }));
  });
});
