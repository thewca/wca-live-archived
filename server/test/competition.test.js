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
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        }).catch((err) => {
          throw err;
        }));
  });

  describe('/GET competitions/:competitionId', () => {
    it('Should throw error on GET undefined competition', () =>
      chai.request(app)
        .get('/api/competitions/foo')
        .then(() => {
          throw 'Should not be ran';
        }).catch((err) => {
          err.should.have.status(404);
          err.response.body.should.have.property('message');
          err.response.body.message.should.eql('Competition \'foo\' not found');
        }));
  });

  describe('/POST competitions/AtomicCubingFall2017', () => {
    it('Should fail import from authentication', () =>
      chai.request(app)
        .post('/api/competitions/AtomicCubingFall2017')
        .then(() => {
          throw 'Should not be ran';
        }).catch((err) => {
          err.should.have.status(401);
          err.response.body.should.have.property('message');
          err.response.body.message.should.eql('Unauthorized');
        }));
  });
});
