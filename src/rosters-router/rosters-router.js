const express = require('express')
const rostersRouter = express.Router()
const jsonBodyParser = express.json()
const { bachelorServices } = require('../services/services')
const { requireAuth } = require('../middleware/jwt-auth')

rostersRouter
  .route('/rosters')
  .all(requireAuth)
  .put(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.user
    const { starting_lineup } = req.body
    
    bachelorServices.updateStartingLineup(req.app.get('db'), starting_lineup)
      .then(confirm => 
        res
          .status(201)
          .json(confirm)
      )
      .catch(next)

  })
  .get((req, res, next) => {

    const { user_id } = req.user
    console.log('running the rest')
    bachelorServices.checkRosterIsSet(req.app.get('db'), user_id)
      .then(startingLineup => {
        console.log('starginlineup', startingLineup)
        return startingLineup.map(starter =>
          bachelorServices.serializeStarters(starter)
        )}
      )
      .then(serializedStartingLineup =>
        res
          .status(200)
          .json(serializedStartingLineup)
      )
      .catch(next)
  })

  module.exports = rostersRouter