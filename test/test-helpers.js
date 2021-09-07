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

function makeContestantList() {
  return [
    { 
      first_name: 'Clare',
      last_name: 'Crawley',
      season: 12
    },
    {
      first_name: 'Kaitlyn',
      last_name: 'Bristowe',
      season: 12
    },
    {
      first_name: 'Hannah',
      last_name: 'Brown',
      season: 12
    }, 
    {
      first_name: 'Rebecca',
      last_name: 'Kufrin',
      season: 12
    }, 
    {
      first_name: 'Ashely',
      last_name: 'Laconetti',
      season: 12
    }, 
    {
      first_name: 'Ali',
      last_name: 'Fedotowsky',
      season: 12
    }, 
    {
      first_name: 'Melissa',
      last_name: 'Rycroft',
      season: 12
    }, 
    {
      first_name: 'Catherine',
      last_name: 'Giudici',
      season: 12
    }, 
    {
      first_name: 'Cassie',
      last_name: 'Randolph',
      season: 12
    }, 
    {
      first_name: 'Vanessa',
      last_name: 'Grimaldi',
      season: 12
    }, 
    {
      first_name: 'Amanda',
      last_name: 'Marsh',
      season: 12
    }, 
    {
      first_name: 'Amanda',
      last_name: 'Stanton',
      season: 12
    }, 
    {
      first_name: 'Jade',
      last_name: 'Roper',
      season: 12
    }, 
    {
      first_name: 'Shayne',
      last_name: 'Lamas',
      season: 12
    } 
  ]

}


function makeTeamList() {
  return [
    { id: 1,
      team_id: "c6c77a9a-afa2-4da9-99b0-bad8befd5dd6",
      team_name: "cereal",
      user_id: "73b8bb71-c339-4029-bc70-6204928aa77b",
      season: 22,
    },
    { id: 2,
      team_id: "921bcd8e-bc82-4a3c-aeb0-8b1eaa7733d8",
      team_name: "chumbawomba",
      user_id: "13c0713a-ec31-4378-8aad-37a4c9f4a304",
      season: 22,
    },
  ]
}
function makeContestantListRosters() {
  return [
    { 
      id: 1,
      contestant_id: '0ba58f65-966c-4839-9e31-1f1693aeb326',
      first_name: 'Clare',
      last_name: 'Crawley',
      season: 22
    },
    {
      id: 2,
      contestant_id: '283aad87-9b6a-49f4-bd33-f749bda7a656',
      first_name: 'Kaitlyn',
      last_name: 'Bristowe',
      season: 22
    },
    {
      id: 3,
      contestant_id: '675f409f-bd80-43a9-89a4-bf237dbfadc9',
      first_name: 'Hannah',
      last_name: 'Brown',
      season: 12
    }, 
    {
      id: 4,
      contestant_id: '4bc518b6-18d0-4713-8477-39c7509636a9',
      first_name: 'Rebecca',
      last_name: 'Kufrin',
      season: 22
    }, 
    {
      id: 5,
      contestant_id: '287a2f3e-2129-4e12-935d-d1d1c2cf103f',
      first_name: 'Ashely',
      last_name: 'Laconetti',
      season: 22
    }, 
    {
      id: 6,
      contestant_id: 'a372530f-4e99-492e-9bf5-a9e04632ee96',
      first_name: 'Ali',
      last_name: 'Fedotowsky',
      season: 22
    }, 
    {
      id: 7,
      contestant_id: '6d8bf757-6f99-4e50-9600-485753356506',
      first_name: 'Melissa',
      last_name: 'Rycroft',
      season: 22
    }, 
    {
      id: 8,
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      first_name: 'Catherine',
      last_name: 'Giudici',
      season: 22
    }, 
    {
      id: 9,
      contestant_id: '4b47bd8a-c709-4b17-bc4f-bd6c03781e91',
      first_name: 'Cassie',
      last_name: 'Randolph',
      season: 22
    }, 
    {
      id: 10,
      contestant_id: '753a5791-23df-4157-a237-d46c9229982a',
      first_name: 'Vanessa',
      last_name: 'Grimaldi',
      season: 22
    }, 
    {
      id: 11,
      contestant_id: 'f5479109-c21c-4232-b585-6213a9f89807',
      first_name: 'Amanda',
      last_name: 'Marsh',
      season: 22
    }, 
    {
      id: 12,
      contestant_id: 'b8a6dff8-c822-495e-ac79-c6e08fe6764a',
      first_name: 'Amanda',
      last_name: 'Stanton',
      season: 22
    }, 
    {
      id: 13,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      first_name: 'Jade',
      last_name: 'Roper',
      season: 22
    }, 
    {
      id: 14,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      first_name: 'Shayne',
      last_name: 'Lamas',
      season: 22
    } 
  ]
}
function makeRosters() {
  return [
    {
      id: 1,
      ranking_order: 1,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      week: 1
    },{
      id: 2,
      ranking_order: 2,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      week: 1
    },
    {
      id: 3,
      ranking_order: 3,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      week: 1
    },
    {
      id: 4,
      ranking_order: 1,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      week: 1
    },
    {
      id: 5,
      ranking_order: 2,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      week: 1
    },
    {
      id: 6,
      ranking_order: 3,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: '314fd453-382d-4910-a632-9ee637509150',
      week: 1
    }
  ]
}

function retrieveData() {
  const testUsers = makeUsersArray()
  const contestantList = makeContestantList()
  const teamList = makeTeamList()
  const rostersList = makeRosters()
  const contestantListRosters = makeContestantListRosters()
  // const genQuestions = makeGenQuestions()
  // const userQuestions = makeUserQuestions()
  // const fileUploads = makeFileUploads()
  // const testRelationships = makeTestRelationships()
  // const testAnswers = makeQuestionAnswers()
  // const userRelationship = makeUserRelationship ()

  return {
    testUsers,
    contestantList,
    teamList,
    rostersList,
    contestantListRosters
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

function seedTeams(db, teamList) {
  return db
    .into("bachelor_ett_teams")
    .insert(teamList)
    .then(() =>
      db.raw(
        `SELECT setval('bachelor_ett_teams_id_seq', ?)`,
        [teamList[teamList.length-1].id],
      )
    )
}

function seedContestantsList(db, contestantsList) {
  console.log("CL", contestantsList)
  return db
    .into("bachelor_ett_contestants")
    .insert(contestantsList)
    .then(() => 
      db.raw(
        `SELECT setval('bachelor_ett_contestants_id_seq', ?)`,
        [contestantsList[contestantsList.length-1].id],
      )
    )
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        bachelor_ett_contestants,
        bachelor_ett_teams,
        bachelor_ett_users cascade
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE bachelor_ett_contestants_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_teams_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('bachelor_ett_contestants_id_seq', 0)`),
        trx.raw(`SELECT setval('bachelor_ett_teams_id_seq', 0)`),
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
  seedTeams,
  seedContestantsList,
  makeAuthHeader
}