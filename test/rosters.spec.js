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

  context("Put: rosters endpoint - intial post", () => {
    beforeEach('load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedTeams(db, teamList)
      helpers.seedContestantsList(db, contestantListRosters)
    })
    const reqAttemptBody = {
      starting_lineup: rostersList
    }

    it('1: Rosters are updated confirmation received, intial posting', () => {
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

  context("Put: rosters endpoint updating", () => {

    beforeEach('load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedContestantsList(db, contestantListRosters)
      helpers.seedTeams(db, teamList)
      helpers.seedRostersList(db, rostersList)
    })

    const reqAttemptBody = {
      starting_lineup: rostersList
    }

    it('1: Rosters are updated confirmation received, updating.', () => {
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
    
  context("Get: Get starting lineup", () => {

    beforeEach('load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedContestantsList(db, contestantListRosters)
      helpers.seedTeams(db, teamList)
      helpers.seedRostersList(db, rostersList)
    })

    it('1: Get staring line up status 200.', () => {
      return supertest(app)
        .get('/api/rosters')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        // .expect(res => {
        //   expect(res.body.length).to.eql(6)
        // })
    })
    

  })


})
