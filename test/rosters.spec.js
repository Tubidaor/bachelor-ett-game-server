const knex = require('knex')
const supertest = require('supertest')
const { expect } = require('chai')
const helpers = require('./test-helpers')
const app = require('../src/app')

describe("Test for rosters endpoint", () => {

  let db

  const { testUsers, rostersList, teamList, contestantListRosters } = helpers.retrieveData()

  before('Connect to db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })
    app.set('db', db)
  })

  after('Disconnect from db', () => db.destroy())

  before('Clean up tables', () => helpers.cleanTables(db))

  afterEach('Clean up tables', () => helpers.cleanTables(db))

  context("Put: rosters endpoint", () => {
    beforeEach('load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedTeams(db, teamList)
      helpers.seedContestantsList(db, contestantListRosters)
    })
    const reqAttemptBody = {
      starting_lineup: rostersList
    }

    it.only('1: Rosters are updated confirmation received', () => {
      return supertest(app)
        .put('/api/rosters')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(reqAttemptBody)
        .expect(201)
        .expect(res => {
          expect(res.body.length).to.eql(6)
        })
    })

  })

})
