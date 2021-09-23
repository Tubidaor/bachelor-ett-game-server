const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const expect = require('chai')
const helpers = require('./test-helpers')


describe('Scores end points', () => {
  let db
  let { testUsers, contestantScores, categoryList, contestantListRosters } = helpers.retrieveData()

  before('create connection to DB', () => {
  
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('Disconnect from db', () => db.destroy())

  before('Clean up tables', () => helpers.cleanTables(db))

  afterEach('Clean up tables', () => helpers.cleanTables(db))

  context('Successful scores upload', () => {
    beforeEach('load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedCategories(db, categoryList)
      helpers.seedContestantsList(db, contestantListRosters)
    })
    const reqAttemptBody = {
      scores: contestantScores
    }
    it('1: scores are uploaded and confirmed.', () => {
      return supertest(app)
        .post('/api/scores')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(reqAttemptBody)
        .expect(201)
        .expect({message: "Scores have been submitted."})
    })
  })

  context('Unsuccessful scores upload', () => {
    beforeEach('load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedCategories(db, categoryList)
      helpers.seedContestantsList(db, contestantListRosters)
    })
    const reqAttemptBody = {
      scores: ""
    }
    it.only('1: no scores are uploaded and error received.', () => {
      return supertest(app)
        .post('/api/scores')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(reqAttemptBody)
        .expect(404)
        .expect({error: 'Something went wrong, please try again.'})
    })
  })


})
