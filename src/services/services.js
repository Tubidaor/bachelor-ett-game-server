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
  serializeTeam(team) {
    return {
      team_name: xss(team.team_name),
      season: xss(team.season),
    }
  },
  getShoppingList(db, user) {
    return db
      .from("shopping_list")
      .select("*")
      .where({user_id: user})
      .orderBy('product_name', 'asc')
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



  async checkTheresList(req, res, next) {
    const { user_id } = req.user
    // const user_id = "73b8bb71-c339-4029-bc70-6204928aa77b"
    try {
      const entry = await ShopListServices
        .getShoppingList(req.app.get("db"), user_id)
      
      if(!entry || entry.length === 0)
        return res.status(404).json({
          error: "Shopping list is empty."
        })

        res.entry = entry
        next()
    } catch(error) {
      next(error)
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

  deleteShopItem(db, product) {
    return db
      .from("shopping_list")
      .whereIn("product_id", product)
      .del()
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
  },
  getInventoryItem(db, product_id) {
    return db
      .from("inventory")
      .select(
        "product_id",
        "product_name",
        "purchase_date",
      )
      .where({product_id})
      .first()
  },
  deleteInventoryItem(db, product_id) {
    return db
      .from("inventory")
      .where({product_id})
      .del()
  },
  serializeInventoryList(inventory) {
    return {
      product_id: xss(inventory.product_id),
      product_name: xss(inventory.product_name),
      purchase_date: xss(inventory.purchase_date)
    }
  },
  getInventory(db, user_id) {
    return db
      .from("inventory")
      .select(
        "product_id",
        "product_name",
        "purchase_date",
      )
      .where({user_id})
      .orderBy("product_name", "asc")
  },
  addToInventory(db, inventoryList) {
    return db
      .insert(inventoryList)
      .into("inventory")
      .returning("*")
      .then(([inventoryList]) => [inventoryList])
  }
}

module.exports = {
  LoginServices,
  UserServices,
  bachelorServices,
  InventoryServices
}