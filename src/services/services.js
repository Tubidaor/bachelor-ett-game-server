const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const REGEX_PW_CHECK = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
const xss = require('xss')

const LoginServices = {
  getUserWithUserName(db, email) {
    return db
      .from('bachelor_ett_users')
      .where({ email })
      .first()
  },
  checkPassword(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256',
    })
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256']
    })
  },
}



const UserServices = {

  validatePassword(password) {
    if(password.length < 8) {
      return 'Password must be longer than 8 characters.'
    }
    if(password.length > 72) {
      return 'Password must be less than 72 characters.'
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces.'
    }
    if(!REGEX_PW_CHECK.test(password)) {
      return  `Password must contain 1 upper case, lower case, number, and special character.`
    }
    return null
  },
  getUserWithEmail(db, email) {
    return db('bachelor_ett_users')
      .where({ email })
      .first()
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('bachelor_ett_users')
      .returning('*')
      .then(([user]) => user)
  },
  serializeUser(user) {
    return {
      id: user.user_id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      email: xss(user.email),
      date_created: user.date_created
    }
  },
}

const bachelorServices = {
  addContestants(db, contestantData) {
    return db
      .insert(contestantData)
      .into("bachelor_ett_contestants")
      .returning("*")
  },
  addTeam(db, team) {
    return db
      .insert(team)
      .into("bachelor_ett_teams")
      .returning("*")
      .then(([team]) => team)
  },
  getTeamName(db, user_id) {
    return db
      .from("bachelor_ett_teams")
      .select("*")
      .where({user_id})
      .then(([team]) => team)
      // .where({user_id: user_id})
  },
  serializeTeam(team) {
    return {
      team_name: xss(team.team_name),
      season: xss(team.season),
    }
  },
  getContestantList(db, season) {
    return db
      .from("bachelor_ett_contestants")
      .select("*")
      .where({season})
      .orderBy('first_name', 'asc')
  },

  getShoppingItem(db, product) {
    return db
      .from("shopping_list")
      .select("product_id")
      .whereIn("product_id", product)
  },
 

  serializeShoppingList(list) {
    return {
      product_id: xss(list.product_id),
      product_name: xss(list.product_name)
    }
  },



  async checkTheresContestants(req, res, next) {
    const season = 22
    // const user_id = "73b8bb71-c339-4029-bc70-6204928aa77b"
    try {
      const entry = await bachelorServices
        .getContestantList(req.app.get("db"), season)
      
      if(!entry || entry.length === 0)
        return res.status(404).json({
          error: "Contestant list is empty. Please contact your admin."
        })

        res.entry = entry
        next()
    } catch(error) {
      next(error)
    }
  },

  serializeContestantList(contestant) {
    return {
      contestant_id: xss(contestant.contestant_id),
      first_name: xss(contestant.first_name),
      last_name: xss(contestant.last_name)
    }
  },

  async checkTheresItem(req, res, next) {
    const { product } = req.body
    try {
      const entry = await ShopListServices
        .getShoppingItem(req.app.get("db"), product)
      
      if(!entry || entry.length === 0)
        return res.status(404).json({
          error: 'Shopping item does not exist.'
        })

        return entry
    } catch(error) {
      next(error)
    }
  },

  updateStartingLineup(db, startingLineup) {
    return db
      .insert(startingLineup)
      .into("bachelor_ett_rosters")
      .returning("*")
  }
  ,
  async checkRosterIsSet(req, res, next) {
    const { user_id } = req.user
    console.log('checkinglineup')
    try {
      const roster = await bachelorServices.getStartingLineup(
        req.app.get('db'),
        user_id
      )

        if(!roster || roster.length === 0) {
          return res
            .status(404)
            .json({error: 'Please set your starting lineup.'})
        }
        return roster
    }
    catch(error) {
      next(error)
    }
  },
  getStartingLineup(db, user_id) {
    return db
      .select('*')
      .from('bachelor_ett_rosters')
      .where({user_id})
      .orderBy("ranking_order", "desc")
  },
  serializeRoster(startingLineup) {
    return {
      id: startingLineup.id,
      ranking_order: startingLineup.ranking_order,
      team_id: startingLineup.team_id,
      user_id: startingLineup.user_id,
      contestant_id: startingLineup.contestant_id,
      week: startingLineup.week,
    }
  }
  
}

const InventoryServices = {
  
  async checkTheresInventory(req, res, next) {
    const { user_id } = req.user
    try {
      const inventory = await InventoryServices
        .getInventory(req.app.get("db"), user_id)
      
      
      if(!inventory || inventory.length === 0)
        return res.status(404).json({
          error: "No food in inventory."
        })

        res.inventory = inventory
        next()
    }
    catch(error) {
      next(error)
    }
  },
  async checkTheresItem(req, res, next) {
    const { product_id } = req.body

    try {

      const product = await InventoryServices
      .getInventoryItem(req.app.get("db"), product_id)
      
      if(!product || product.length === 0) 
      return res.status(404).json({error: "Product does not exist."})
      
      res.product = product
      next()
    } catch(error) {
      next(error)
    }
  }
}

module.exports = {
  LoginServices,
  UserServices,
  bachelorServices,
  InventoryServices
}