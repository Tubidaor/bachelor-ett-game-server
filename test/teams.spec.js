const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { expect } = require('chai')
const helpers = require('./test-helpers')

describe('Tests for teams router', () => {
  let db

  const { testUsers, teamList } = helpers.retrieveData()
  
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

  context("Posting Teams", () => {

    beforeEach('Seed users', () => helpers.seedUsers(db, testUsers))
    
    const teamRequest = {
      team_name: "testTeam",
      season: 22
    }

    const noTeamName = {
      team_name: '',
      season: 22
    }

    const noSeason = {
      team_name: 'testTeam',
      season: ''
    }
    it('1: returns error when no team team', () => {
      return supertest(app)
        .post('/api/teams')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(noTeamName)
        .expect(401)
        .expect({error: 'Please enter team name.'})
    })
    it('2: returns error when no season', () => {
      return supertest(app)
        .post('/api/teams')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(noSeason)
        .expect(401)
        .expect({error: 'Please enter season.'})
    })
    it('3: posts team name and returns json', () => {
      return supertest(app)
        .post('/api/teams')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(teamRequest)
        .expect(201)
        .expect(res => {
          const row = res.body
          console.log("row", row)
          expect(row).to.have.property('team_name')
          expect(row).to.have.property('season')
          expect(row.team_name).to.eql('testTeam')

        })
    })
  } )

  context("Get teams", () => {
    beforeEach('seed users', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedTeams(db, teamList)
    })

    it("1. Return team name", () => {
      return supertest(app)
        .get('/api/teams')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect(res => {
          const row = res.body

          expect(row.team_name).to.eql('cereal')
        })
    })
  })

})