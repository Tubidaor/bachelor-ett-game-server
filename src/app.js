require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const loginRouter = require('./users-router/login-router')
const regRouter = require('./users-router/registration-router')
const contestantsRouter = require('./contestants-router/contestants-router')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
let whiteList= ['https://stockchef.vercel.app','http://localhost:3000']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate)
)
app.use('/api',loginRouter)
app.use('/api',regRouter)
app.use('/api', contestantsRouter)

app.get("/", (req, res) => {
  res.send("Hello, world!")
})
app.use(function errorHandler(error, req, res, next) {
  let response
  if(NODE_ENV === 'production') {
    reponse = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error}
  }
  res.status(500).json(response)
})

module.exports = app
