const express = require('express')
const jsonBodyParser = express.json()
const scoresRouter = express.Router()
const { bachelorServices } = require('../services/services')
const { requireAuth } = require('../middleware/jwt-auth')

scoresRouter
  .route('/scores')
  .all(requireAuth)
  .post((req, res, next) => {
    const { user_id } = req.user
    const { scores } = req.body

    bachelorServices.postScores(req.app.get('db'), scores)
      .then(scores => {
        if(scores) {
          res
            .status(201)
            .json({message: 'Scores have been submitted.'})
        }
      })
      .catch(next)
  })

  module.exports = scoresRouter