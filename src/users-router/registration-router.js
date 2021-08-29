const express = require('express')
const path = require('path')
const regRouter = express.Router()
const jsonBodyParser = express.json()
const  { UserServices } = require('../services/services')
const { v4: uuidv4 } = require('uuid')

regRouter
  .route('/register')
  .post(jsonBodyParser, (req, res, next) => {
    const {
      first_name,
      last_name,
      email,
      password,
    } = req.body
    
    for(const field of [
      'first_name',
      'last_name',
      'email',
      'password',
    ])
      if(!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body.`
        })
      }

    const passwordError = UserServices.validatePassword(password)

    if(passwordError) {
      return res.status(400).json({ error: passwordError})
    }

    UserServices.getUserWithEmail(
      req.app.get('db'),
      email
      )
      .then(emailAlreadyExists => {
        const id = uuidv4()
        
        if(emailAlreadyExists) {
          return res.status(400).json({ error: 'email already exists.'})
        }
        return UserServices.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_id: id,
              first_name,
              last_name,
              email,
              password: hashedPassword
            }

            return UserServices.insertUser(
              req.app.get('db'),
              newUser
            )
            .then(user => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.user_id}`))
                .json(UserServices.serializeUser(user))
            })
          })
      })
      .catch(next)
  })

  module.exports = regRouter