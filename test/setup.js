process.env.TZ = "UTC"
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'waltermercado'
process.env.JWT_EXPIRY = '3m'

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || "postgresql://tubidaor@localhost/bachelor_test"

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest