const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { expect } = require('chai')
const helpers = require('./test-helpers')

describe('Categories endpoint', () => {
  let db
  const { testUsers, categoryList } = helpers.retrieveData()
  // testUsers,
  //   contestantList,
  //   teamList,
  //   rostersList,
  //   contestantListRosters,
  //   categoryList
  before('Make Knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })
    app.set('db', db)
  })

  after("Disconnect from knex instance", () => db.destroy())

  before("Clean tables", () => helpers.cleanTables(db))

  afterEach("Clean tables", () => helpers.cleanTables(db))

  context("Post: 1 Posts categories and returns 201.", () => {
    beforeEach('Load tables', () => {
      helpers.seedUsers(db, testUsers)
    })
    const loadCats =  JSON.parse(JSON.stringify(categoryList))
    const reqAttemptBody = {
      categories: loadCats
    }

    it('1 Posts categories and returns 201', () => {
      return supertest(app)
        .post('/api/admin')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(reqAttemptBody)
        .expect(201)
        .expect(res => {
          console.log("resbody", res.body)
          expect(res.body.length).to.eql(25)
        }
        )
    } )
  })
  context("Post: 2 Unsuccessful Posts categories.", () => {
    beforeEach('Load tables', () => {
      helpers.seedUsers(db, testUsers)
    })
    const noCategory = JSON.parse(JSON.stringify(categoryList))
    const noPointValue = JSON.parse(JSON.stringify(categoryList))
    noCategory[1].category = ""
    noPointValue[3].point_value = ""
    const noCatAttemptBody = {
      categories: noCategory
    }
    const noPointAttemptBody = {
      categories: noPointValue
    }
    it('1 Posts categories and returns 404: No category', () => {
      return supertest(app)
        .post('/api/admin')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(noCatAttemptBody)
        .expect(401)
        .expect({error: "Please enter a category on row 2."})
    } )
    it('2 Posts categories and returns 404: No point value', () => {
      return supertest(app)
        .post('/api/admin')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(noPointAttemptBody)
        .expect(401)
        .expect({error: "Please enter a point value on row 4."})
    } )
  })

  context("Get categories success.", () => {
    beforeEach('Load tables', () => {
      helpers.seedUsers(db, testUsers)
      helpers.seedCategories(db, categoryList)
    })

    it('1: Get categories and returns 200', () => {
      return supertest(app)
        .get('/api/admin')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect(res =>
          expect(res.body.length).to.eql(25)
        )
    } )
  })
  context("Get categories unsuccessfull.", () => {
    beforeEach('Load tables', () => {
      helpers.seedUsers(db, testUsers)
    })

    it('1: Get categories and returns 404.', () => {
      return supertest(app)
        .get('/api/admin')
        .set('authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(404)
        .expect(res => {
          console.log(res.body)
          // {error: 'No categories. Please contanct your admin.'}
        })
    } )
  
  })
})