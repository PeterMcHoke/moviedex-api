const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const expectedKeys = ["filmtv_ID", "film_title","year","genre","duration","country","director","actors","avg_vote","votes"];

describe('GET /movies endpoint', () => {
  it('should return an array of objects with expected keys', () => {
    return supertest(app)
      .get('/movies') // invoke the endpoint
      .set({ "Authorization": `Bearer ${process.env.API_TOKEN}` })
      .query({
          "genre" : "drama",
          "country": "Italy",
          "avg_vote": "6"
        })
      .expect(200)  // assert that you get a 200  OK status
      .expect('Content-Type', /json/)
      .then(res => {
          expect(res.body).to.be.an('array')
          .and.to.have.property(0)
          .that.includes.all.keys(expectedKeys)
      });
  })
});
