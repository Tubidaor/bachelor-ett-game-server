const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')
const { v4: uuidv4 } = require('uuid')

describe("Contestants", () => {
  let db
  const { testUsers, contestantList } = helpers.retrieveData()
  const contestantListCopy = JSON.parse(JSON.stringify(contestantList))

  console.log(contestantList === contestantListCopy)
  console.log(contestantList, contestantListCopy)
  before('Make next instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })
    app.set('db', db)
  })

  after("Disconnect from knex instance", () => db.destroy())

  before("Clean tables", () => helpers.cleanTables(db))

  afterEach("Clean tables", () => helpers.cleanTables(db))

  context.only('Post: contestants get posted to database', () => {

    beforeEach("load tables", () => {
      helpers.seedUsers(db,testUsers)
    })

    describe("Contestants: Returns error when data is incorrect", () => {
      it('1 error when no data', () => {

        // const contestantData = contestantList.map(contestant => {
        //   contestant.contestant_id = contestant_id 
        // })
        return supertest(app)
          .post('/api/contestants')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({})
          .expect(401)
          .expect({error: 'Please enter contestants.'})
      })

      it('2 error when first name is missing field', () => {
        let row = 1
        const contestantsFN = contestantListCopy.slice(0,4)
        contestantsFN[row -1].first_name = ''

        return supertest(app)
          .post('/api/contestants')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({contestants: contestantsFN})
          .expect(401)
          .expect({error: `Please enter a first name on row ${row}.`})
      })

      it('3 error when last name is missing field', () => {
        let rowLN = 2
        const contestantsLN = contestantListCopy.slice(1,5)
        contestantsLN[rowLN -1].last_name = ''

        return supertest(app)
          .post('/api/contestants')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({contestants: contestantsLN})
          .expect(401)
          .expect({error: `Please enter a last name on row ${rowLN}.`})
      })

      it('4 error when season is missing field', () => {
        let rowLN = 3
        const contestantsLN = contestantListCopy.slice(3,7)
        contestantsLN[rowLN -1].season = ''

        return supertest(app)
          .post('/api/contestants')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({contestants: contestantsLN})
          .expect(401)
          .expect({error: `Please enter a season on row ${rowLN}.`})
      })

      it('5 responds with 200 and list of contestants', () => {
        console.log('original', contestantList,'Copy', contestantListCopy)
        return supertest(app)
          .post('/api/contestants')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({contestants: contestantList})
          .expect(201)
          .expect(res => {
            console.log(res.body)
            const row = res.body[0]

            expect(row).to.have.property("contestant_id")
            expect(row).to.have.property("first_name")
            expect(row).to.have.property("last_name")
            expect(row).to.have.property("season")
            expect(row.first_name).to.eql(contestantList[0].first_name)
            expect(row.last_name).to.eql(contestantList[0].last_name)
            expect(res.body.length).to.eql(14)
          })
      })
    })
  })


})