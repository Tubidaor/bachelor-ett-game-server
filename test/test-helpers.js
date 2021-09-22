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
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      week: 1
    },{
      id: 2,
      ranking_order: 2,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      week: 1
    },
    {
      id: 3,
      ranking_order: 3,
      team_id: 'c6c77a9a-afa2-4da9-99b0-bad8befd5dd6',
      user_id: '73b8bb71-c339-4029-bc70-6204928aa77b',
      contestant_id: 'b8a6dff8-c822-495e-ac79-c6e08fe6764a',
      week: 1
    },
    {
      id: 4,
      ranking_order: 1,
      team_id: '921bcd8e-bc82-4a3c-aeb0-8b1eaa7733d8',
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      contestant_id: 'f5479109-c21c-4232-b585-6213a9f89807',
      week: 1
    },
    {
      id: 5,
      ranking_order: 2,
      team_id: '921bcd8e-bc82-4a3c-aeb0-8b1eaa7733d8',
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      contestant_id: 'f5479109-c21c-4232-b585-6213a9f89807',
      week: 1
    },
    {
      id: 6,
      ranking_order: 3,
      team_id: '921bcd8e-bc82-4a3c-aeb0-8b1eaa7733d8',
      user_id: '13c0713a-ec31-4378-8aad-37a4c9f4a304',
      contestant_id: '6d8bf757-6f99-4e50-9600-485753356506',
      week: 1
    }
  ]
}
function makeCategories() {
  return [
    {
      id: 1,
      category_id: '37f3a587-7985-4645-912f-24bceb7cd199',
      category: 'bachelor-ett-proposes',
      point_value: 200,
    },
    {
      id: 2,
      category_id: '2f22d43f-e506-4c98-bff0-ac8fdd33bcab',
      category: 'Sex (confirmed or group consensus)',
      point_value: 100,
    },
    {
      id: 3,
      category_id: '5aebf50d-09a5-4ec7-a82c-94e19ab9903d',
      category: 'Katie says "I love you" (or variants)',
      point_value: 50,
    },
    {
      id: 4,
      category_id: 'a0c0c1de-b81f-435b-8593-b3d2fb8ccc69',
      category: 'Involved in physical altercation',
      point_value: 25,
    },
    {
      id: 5,
      category_id: '4cc686ae-a6f5-4b41-876c-e34ac0801678',
      category: '1 on 1 date',
      point_value: 20,
    },
    {
      id: 6,
      category_id: '9e9b8916-c880-414f-9314-fa4bd490caec',
      category: 'Receives a rose pre-ceremony',
      point_value: 20,
    },
    {
      id: 7,
      category_id: '963236c4-5661-4a9a-9feb-dbde0786d0ea',
      category: 'Kiss',
      point_value: 0,
    },
    {
      id: 8,
      category_id: 'b82fec52-c16a-483f-8161-a5484d098851',
      category: 'Destroys property',
      point_value: 15,
    },
    {
      id: 9,
      category_id: '15a77cea-903b-434d-94c5-55953a2a05aa',
      category: 'Chaos points',
      point_value: 0,
    },
    {
      id: 10,
      category_id: '759f2993-961a-4cfd-9edd-e3206a6d3526',
      category: 'Provides a service to humanity',
      point_value: 0,
    },
    {
      id: 11,
      category_id: 'f4d306be-50d3-4b2f-a564-4afbc9c78e1d',
      category: 'Receives a rose',
      point_value: 10,
    },
    {
      id: 12,
      category_id: '9ca5be2d-e122-4d8a-8481-00065dad8668',
      category: `Interrupts another contestant's alone time`,
      point_value: 10,
    },
    {
      id: 13,
      category_id: '21cefa9c-2a7d-4481-94fc-8665b8b9b3b2',
      category: 'Is obviously drunk',
      point_value: 10,
    },
    {
      id: 14,
      category_id: 'b1bc1db0-db1d-4d78-b000-d01390e8be20',
      category: 'Talks about another contestant to bachelor-ett',
      point_value: 5,
    },
    {
      id: 15,
      category_id: '6f8cac49-7f5d-406d-bc66-d445f3f28d5b',
      category: 'Group date',
      point_value: 5,
    },
    {
      id: 16,
      category_id: '044fefcc-0083-43e9-a34f-287fec0a20fa',
      category: 'bachelor-ett-says could see himself with him/her',
      point_value: 5,
    },
    {
      id: 17,
      category_id: 'fb0d107a-0044-4b07-b1ef-c5f7dfb285d2',
      category: 'Refers to sexual anatomy',
      point_value: 5,
    },
    {
      id: 18,
      category_id: 'a65dea19-a3ac-44cc-8910-55c37a146376',
      category: 'Gets one-on-one time in a group setting',
      point_value: 5,
    },
    {
      id: 19,
      category_id: 'ec64f6b8-e3db-471d-a010-a9e6e4d3d482',
      category: 'Parent takehome category 1',
      point_value: 0,
    },
    {
      id: 20,
      category_id: 'fd8fbc30-445f-4992-9fb7-27da3938a25c',
      category: 'Parent takehome category 2',
      point_value: 0,
    },
    {
      id: 21,
      category_id: '0b71db51-1a23-41f6-988a-70b9b89e6912',
      category: 'Ugly cries in the limo leaving',
      point_value: -5,
    },
    {
      id: 22,
      category_id: '0f0d7b99-5e24-47ec-9001-b1d41138d52a',
      category: 'Fights with Bachelor-ett (verbal or otherwise)',
      point_value: -10,
    },
    {
      id: 23,
      category_id: '68f0fe41-45bc-4930-a254-7c3d1369e8c9',
      category: 'Is a overly sensitive',
      point_value: -10,
    },
    {
      id: 24,
      category_id: 'be220e93-f27b-45ea-b653-82f792191242',
      category: 'Says "I love you" (or variants) first',
      point_value: -10,
    },
    {
      id: 25,
      category_id: 'c78f770f-2802-4d96-b743-2b90da318498',
      category: 'Leaves outside of a rose ceremony',
      point_value: -50,
    },
  ]
}

function makeTestScores() {
  return [
    {
      id: 1,
      week: 1,
      category_id: '37f3a587-7985-4645-912f-24bceb7cd199',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 2,
      week: 1,
      category_id: '2f22d43f-e506-4c98-bff0-ac8fdd33bcab',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 3,
      week: 1,
      category_id: '5aebf50d-09a5-4ec7-a82c-94e19ab9903d',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 4,
      week: 1,
      category_id: 'a0c0c1de-b81f-435b-8593-b3d2fb8ccc69',
      score: 25,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 5,
      week: 1,
      category_id: '4cc686ae-a6f5-4b41-876c-e34ac0801678',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 6,
      week: 1,
      category_id: '9e9b8916-c880-414f-9314-fa4bd490caec',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 7,
      week: 1,
      category_id: '963236c4-5661-4a9a-9feb-dbde0786d0ea',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 8,
      week: 1,
      category_id: 'b82fec52-c16a-483f-8161-a5484d098851',
      score: 15,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 9,
      week: 1,
      category_id: '15a77cea-903b-434d-94c5-55953a2a05aa',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 10,
      week: 1,
      category_id: '759f2993-961a-4cfd-9edd-e3206a6d3526',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 11,
      week: 1,
      category_id: 'f4d306be-50d3-4b2f-a564-4afbc9c78e1d',
      score: 10,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 12,
      week: 1,
      category_id: '9ca5be2d-e122-4d8a-8481-00065dad8668',
      score: 10,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 13,
      week: 1,
      category_id: '21cefa9c-2a7d-4481-94fc-8665b8b9b3b2',
      score: 10,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 14,
      week: 1,
      category_id: 'b1bc1db0-db1d-4d78-b000-d01390e8be20',
      score: 5,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 15,
      week: 1,
      category_id: '6f8cac49-7f5d-406d-bc66-d445f3f28d5b',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 16,
      week: 1,
      category_id: '044fefcc-0083-43e9-a34f-287fec0a20fa',
      score: 5,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 17,
      week: 1,
      category_id: 'fb0d107a-0044-4b07-b1ef-c5f7dfb285d2',
      score: 5,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 18,
      week: 1,
      category_id: 'a65dea19-a3ac-44cc-8910-55c37a146376',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 19,
      week: 1,
      category_id: 'ec64f6b8-e3db-471d-a010-a9e6e4d3d482',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 20,
      week: 1,
      category_id: 'fd8fbc30-445f-4992-9fb7-27da3938a25c',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 21,
      week: 1,
      category_id: '0b71db51-1a23-41f6-988a-70b9b89e6912',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 22,
      week: 1,
      category_id: '0f0d7b99-5e24-47ec-9001-b1d41138d52a',
      score: -10,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 23,
      week: 1,
      category_id: '68f0fe41-45bc-4930-a254-7c3d1369e8c9',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 24,
      week: 1,
      category_id: 'be220e93-f27b-45ea-b653-82f792191242',
      score: 0,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 25,
      week: 1,
      category_id: 'c78f770f-2802-4d96-b743-2b90da318498',
      score: -50,
      contestant_id: 'd6b177c2-b9ee-4aaa-b340-1f3fb7c1c2ad',
      season: 2
    },
    {
      id: 1,
      week: 1,
      category_id: '37f3a587-7985-4645-912f-24bceb7cd199',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 2,
      week: 1,
      category_id: '2f22d43f-e506-4c98-bff0-ac8fdd33bcab',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 3,
      week: 1,
      category_id: '5aebf50d-09a5-4ec7-a82c-94e19ab9903d',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 4,
      week: 1,
      category_id: 'a0c0c1de-b81f-435b-8593-b3d2fb8ccc69',
      score: 25,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 5,
      week: 1,
      category_id: '4cc686ae-a6f5-4b41-876c-e34ac0801678',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 6,
      week: 1,
      category_id: '9e9b8916-c880-414f-9314-fa4bd490caec',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 7,
      week: 1,
      category_id: '963236c4-5661-4a9a-9feb-dbde0786d0ea',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 8,
      week: 1,
      category_id: 'b82fec52-c16a-483f-8161-a5484d098851',
      score: 15,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 9,
      week: 1,
      category_id: '15a77cea-903b-434d-94c5-55953a2a05aa',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 10,
      week: 1,
      category_id: '759f2993-961a-4cfd-9edd-e3206a6d3526',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 11,
      week: 1,
      category_id: 'f4d306be-50d3-4b2f-a564-4afbc9c78e1d',
      score: 10,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 12,
      week: 1,
      category_id: '9ca5be2d-e122-4d8a-8481-00065dad8668',
      score: 10,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 13,
      week: 1,
      category_id: '21cefa9c-2a7d-4481-94fc-8665b8b9b3b2',
      score: 10,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 14,
      week: 1,
      category_id: 'b1bc1db0-db1d-4d78-b000-d01390e8be20',
      score: 5,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 15,
      week: 1,
      category_id: '6f8cac49-7f5d-406d-bc66-d445f3f28d5b',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 16,
      week: 1,
      category_id: '044fefcc-0083-43e9-a34f-287fec0a20fa',
      score: 5,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 17,
      week: 1,
      category_id: 'fb0d107a-0044-4b07-b1ef-c5f7dfb285d2',
      score: 5,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 18,
      week: 1,
      category_id: 'a65dea19-a3ac-44cc-8910-55c37a146376',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 19,
      week: 1,
      category_id: 'ec64f6b8-e3db-471d-a010-a9e6e4d3d482',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 20,
      week: 1,
      category_id: 'fd8fbc30-445f-4992-9fb7-27da3938a25c',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 21,
      week: 1,
      category_id: '0b71db51-1a23-41f6-988a-70b9b89e6912',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 22,
      week: 1,
      category_id: '0f0d7b99-5e24-47ec-9001-b1d41138d52a',
      score: -10,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 23,
      week: 1,
      category_id: '68f0fe41-45bc-4930-a254-7c3d1369e8c9',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 24,
      week: 1,
      category_id: 'be220e93-f27b-45ea-b653-82f792191242',
      score: 0,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
    {
      id: 25,
      week: 1,
      category_id: 'c78f770f-2802-4d96-b743-2b90da318498',
      score: -50,
      contestant_id: 'ca174e33-da0b-4670-939d-502ee2677705',
      season: 2
    },
  ]
}

function retrieveData() {
  const testUsers = makeUsersArray()
  const contestantList = makeContestantList()
  const teamList = makeTeamList()
  const rostersList = makeRosters()
  const contestantListRosters = makeContestantListRosters()
  const categoryList = makeCategories()
  const contestantScores = makeTestScores()
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
    contestantListRosters,
    categoryList,
    contestantScores
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
    .into('bachelor_ett_teams')
    .insert(teamList)
    .then(() =>
      db.raw(
        `SELECT setval('bachelor_ett_teams_id_seq', ?)`,
        [teamList[teamList.length-1].id],
      )
    )
}

function seedContestantsList(db, contestantsList) {

  return db
    .into('bachelor_ett_contestants')
    .insert(contestantsList)
    .then(() => 
      db.raw(
        `SELECT setval('bachelor_ett_contestants_id_seq', ?)`,
        [contestantsList[contestantsList.length-1].id],
      )
    )
}

function seedRostersList(db, rostersList) {
  return db
    .into('bachelor_ett_rosters')
    .insert(rostersList)
    .then(() =>
      db.raw(
        `SELECT setval('bachelor_ett_rosters_id_seq', ?)`,
        [rostersList[rostersList.length-1].id],
      ))
}

function seedCategories(db, categories) {
  return db
    .into('bachelor_ett_categories')
    .insert(categories)
    .then(() =>
    db.raw(
      `SELECT setval('bachelor_ett_categories_id_seq', ?)`,
      [categories[categories.length-1].id],
    ))
}
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        bachelor_ett_categories,
        bachelor_ett_rosters,
        bachelor_ett_contestants,
        bachelor_ett_teams,
        bachelor_ett_users cascade
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE bachelor_ett_categories_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_rosters_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_contestants_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_teams_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE bachelor_ett_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('bachelor_ett_categories_id_seq', 0)`),
        trx.raw(`SELECT setval('bachelor_ett_rosters_id_seq', 0)`),
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
  seedRostersList,
  seedCategories,
  makeAuthHeader
}