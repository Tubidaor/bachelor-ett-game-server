const express = require('express')
const teamsRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const { bachelorServices } = require('../services/services')
const { v4:uuidv4 } = require('uuid')

teamsRouter
  .route('/teams')
  .all(requireAuth)
  .post(jsonBodyParser,(req, res, next) => {
    const { user_id } = req.user
    const { team_name, season } = req.body
    const team = {
      team_id: uuidv4(),
      team_name: team_name,
      user_id: user_id,
      season: season
    }

    if(!team_name) {
      return res
        .status(401)
        .json({error: "Please enter team name."})
    }

    if(!season) {
      return res
        .status(401)
        .json({error: "Please enter season."})
    }

    bachelorServices.addTeam(req.app.get('db'), team)
      .then(team => {
        return bachelorServices.serializeTeam(team)
      })
      .then(serializedTeam => {
        res
          .status(201)
          .json(serializedTeam)
      })
      .catch(next)

  })
  .get((req, res, next) => {
    const { user_id } = req.user

    bachelorServices.getTeamName(req.app.get('db'), user_id)
      .then(team => {

        return bachelorServices.serializeTeam(team)
      })
      .then(serializedTeam => {

        res
          .status(200)
          .json(serializedTeam)
      })
      .catch(next)

  })

  module.exports = teamsRouter