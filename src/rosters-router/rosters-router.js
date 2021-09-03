const express = require('express')
const rostersRouter = express.Router()
const jsonBodyParser = express.json()
const { bachelorServices } = require('../services/services')
const { requireAuth } = require('../middleware/jwt-auth')

rostersRouter
  .route('/rosters')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.user

    
  })