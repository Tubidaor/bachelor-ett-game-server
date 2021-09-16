const express = require('express')
const adminRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')
const { v4: uuidv4 } = require('uuid')
const { bachelorServices } = require('../services/services')

adminRouter
  .route('/admin')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.user
    const { categories } = req.body

    if(!categories || categories.length === 0) {
      return res
        .status(404)
        .json({error: 'Please include category.'})
    }
    for(let i = 0; i < categories.length; i++) {
      if(!categories[i].category) {
        return res
          .status(401)
          .json({error: `Please enter a category on row ${i+1}.`})
      }
      if(categories[i].point_value === '') {
        return res
          .status(401)
          .json({error: `Please enter a point value on row ${i+1}.`})
      }
    }

    const newCategory = categories.map(cat => {
      return {
        category_id: uuidv4(),
        category: cat.category,
        point_value: cat.point_value,
      }
    })
    console.log(
      "newCat", newCategory)
    bachelorServices.createCategory(req.app.get('db'), newCategory)
      .then(cat =>
        res
          .status(201)
          .json(cat)
      )
      .catch(next)
  })
  .get(bachelorServices.checkForCategories, (req, res, next) => {
    try {

      const { category } = res
      category.map(cat => bachelorServices.serializeCategories(cat))
      
      res
        .status(200)
        .json(category)
    }
    catch(error) {
      next(error)
    }      
    
  })

  module.exports = adminRouter