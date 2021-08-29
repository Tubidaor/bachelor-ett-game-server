const express = require('express')
const { LoginServices } = require('../services/services')
const loginRouter = express.Router()
const jsonBodyParser = express.json()

loginRouter
  .route("/login")
  .post(jsonBodyParser, (req, res, next) => {
    const { email, password } = req.body
    const loginUser = {
      email,
      password
    }
 
    for(const [key, value] of Object.entries(loginUser))
      if(value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body.`
        })
      }
      
    LoginServices.getUserWithUserName(
      req.app.get('db'),
      loginUser.email
    )
    .then(user => {
      if(!user) {
        return res.status(400).json({
          error: 'Incorrect email or password.',
        })
      }
      return LoginServices.checkPassword(loginUser.password, user.password)
        .then(checkMatch => {
          if(!checkMatch) {
            return res.status(400).json({
              error: 'Incorrect email or password',
            })
          }
          const sub = user.email
          const payload = { user_id: user.user_id}
          res.send({
            authToken: LoginServices.createJwt(sub, payload)
          })
        })
    })
    .catch(next)
  })

  module.exports = loginRouter