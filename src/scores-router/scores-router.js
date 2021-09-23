const express = require('express')
const jsonBodyParser = express.json()
const scoresRouter = express.Router()
const { bachelorServices } = require('../services/services')
const { requireAuth } = require('../middleware/jwt-auth')

scoresRouter
  .route('/scores')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.user
    const { scores } = req.body
    // console.log("scores", req.body)
    if(!scores || scores.length === 0) {
      return res
            .status(404)
            .json({error: 'Something went wrong, please try again.'})
    }
    bachelorServices.postScores(req.app.get('db'), scores)
      .then(scores => {
        if(!scores) {
          return res
            .status(404)
            .json({error: 'Something went wrong, please try again.'})
        }

        res
          .status(201)
          .json({message: 'Scores have been submitted.'})
      })
      .catch(next)
  })

  module.exports = scoresRouter