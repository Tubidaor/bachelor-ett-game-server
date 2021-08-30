const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      first_name: 'juan',
      last_name: 'baltazar',
      email: 'juan.baltazar1@gmail.com',
      password: 'Faith17!',
      date_created: '07/07/2020'
    },
    {
      id: 2,
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      first_name: 'german',
      last_name: 'baltazar',
      email: 'german.baltazar@gmail.com',
      password: 'Faith17!',
      date_created: '07/07/2020'
    }
  ]
}

function makeShoppingList() {
  return [
    {
      id: 1,
      product_id: "c6c77a9a-afa2-4da9-99b0-bad8befd5dd6",
      product_name: "cereal",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b"
    },
    {
      id: 2,
      product_id: "8613a9d3-37e5-4341-9575-01fa55691c46",
      product_name: "milk",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b"
    },
    {
      id: 3,
      product_id: "20597516-0bb2-4d35-846f-2f3baf6b6755",
      product_name: "bread",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b"
    },
    {
      id: 4,
      product_id: "3d20348a-4d64-4427-9509-72440e682232",
      product_name: "orange juice",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b"
    },
    {
      id: 5,
      product_id: "921bcd8e-bc82-4a3c-aeb0-8b1eaa7733d8",
      product_name: "salmon",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b"
    }
  ]

}

function makeInventoryList() {
  return [
    { id: 1,
      product_id: "c6c77a9a-afa2-4da9-99b0-bad8befd5dd6",
      product_name: "cereal",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b",
      purchase_date: "01/11/2021"
    },
    {
      id: 2,
      product_id: "8613a9d3-37e5-4341-9575-01fa55691c46",
      product_name: "milk",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b",
      purchase_date: "01/11/2021"

    },
    {
      id: 3,
      product_id: "20597516-0bb2-4d35-846f-2f3baf6b6755",
      product_name: "bread",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b",
      purchase_date: "01/11/2021"
    },
    {
      id: 4,
      product_id: "3d20348a-4d64-4427-9509-72440e682232",
      product_name: "orange juice",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b",
      purchase_date: "01/11/2021"
    },
    {
      id: 5,
      product_id: "921bcd8e-bc82-4a3c-aeb0-8b1eaa7733d8",
      product_name: "salmon",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b",
      purchase_date: "01/11/2021"
    }
  ]
}
function retrieveData() {
  const testUsers = makeUsersArray()
  const shoppingList = makeShoppingList()
  const inventoryList = makeInventoryList()
  // const genQuestions = makeGenQuestions()
  // const userQuestions = makeUserQuestions()
  // const fileUploads = makeFileUploads()
  // const testRelationships = makeTestRelationships()
  // const testAnswers = makeQuestionAnswers()
  // const userRelationship = makeUserRelationship ()

  return {
    testUsers,
    shoppingList,
    inventoryList
    // genQuestions,
    // userQuestions,
    // fileUploads,
    // testRelationships,
    // testAnswers,
    // userRelationship
  }
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  
  return db.into('bachelor_ett_users').insert(preppedUsers)
    .then(() =>
    db.raw(
      `SELECT setval('bachelor_ett_users_id_seq', ?)`,
      [users[users.length-1].id],
    )
  )
}

function seedShoppingList(db, shoppingList) {
  return db
    .into("shopping_list")
    .insert(shoppingList)
    .then(() =>
      db.raw(
        `SELECT setval('shopping_list_id_seq', ?)`,
        [shoppingList[shoppingList.length-1].id],
      )
    )
}

function seedInventoryList(db, inventoryList) {
  return db
    .into("inventory")
    .insert(inventoryList)
    .then(() => 
      db.raw(
        `SELECT setval('inventory_id_seq', ?)`,
        [inventoryList[inventoryList.length-1].id],
      )
    )
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        bachelor_ett_users cascade
      `
    )
    .then(() =>
      Promise.all([
        // trx.raw(`ALTER SEQUENCE inventory_id_seq minvalue 0 START WITH 1`),
        // trx.raw(`ALTER SEQUENCE shopping_list_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_users_id_seq minvalue 0 START WITH 1`),
        // trx.raw(`SELECT setval('inventory_id_seq', 0)`),
        // trx.raw(`SELECT setval('shopping_list_id_seq', 0)`),
        trx.raw(`SELECT setval('bachelor_ett_users_id_seq', 0)`),
      ])
    )
  )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign(
    {user_id: user.user_id},
    secret,
    {subject: user.email,
    algorithm: 'HS256'}
  )

  return `Bearer ${token}`
}

module.exports = {
  retrieveData,
  seedUsers,
  cleanTables,
  seedShoppingList,
  seedInventoryList,
  makeAuthHeader
}