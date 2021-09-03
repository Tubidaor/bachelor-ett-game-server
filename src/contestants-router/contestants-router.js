const express = require('express')
const contestantsRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const { v4: uuidv4 } = require('uuid')
const { bachelorServices } = require('../services/services')


contestantsRouter
  .route("/contestants")
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.user
    const  { contestants } = req.body
    console.log('contestants', contestants)

    if(!contestants) {
      return res
        .status(401)
        .json({error: "Please enter contestants."})
    }

    for(let i = 0; i < contestants.length; i++) {
      if(!contestants[i].first_name) {
        return res
          .status(401)
          .json({error: `Please enter a first name on row ${i+1}.`})
      }
      if(!contestants[i].last_name) {
        return res
          .status(401)
          .json({error: `Please enter a last name on row ${i+1}.`})
      }
      if(!contestants[i].season) {
        return res
          .status(401)
          .json({error: `Please enter a season on row ${i+1}.`})
      }
    }

    const contestantData = contestants.map(contestant => {
      return {
        contestant_id: uuidv4(),
        first_name: contestant.first_name,
        last_name: contestant.last_name,
        season: contestant.season
      }
    })

    bachelorServices.addContestants(req.app.get('db'), contestantData)
      .then(contestantsForSeason =>
        res
          .status(201)
          .json(contestantsForSeason)
          //need to serialize contestants
      )
      .catch(next)
  })
  .get(bachelorServives.checkTheresContestants,(req, res, next) => {
    const { user_id } = req.user

    const season = 22

    bachelorServices.getContestantList(req.app.get('db'), season)
      .then(list => {
        return list.map(li => bachelorServices.serializeContestantList(li))
      })
      .then(serializedList =>
        res
          .status(200)
          .json(serializedList)
      )
      .catch(next)
  })

  module.exports = contestantsRouter