# table  = roles
# Column tabel:
---
1. id (uuid) primary key = idRole-uuid
2. name (string) unique (value = LEADER, VICELEADER, COORDINATOR, SECRETARY, TREASURER, MEMBER)
3. status (boolean)
4. created_at (timestamp)
5. updated_at (timestamp)
relation with table role_users (one to many)
---
# tabel = posts
---
column table:
1. id (uuid) primary key = idPost-uuid
2. npm (string)
3. fullname (string)
4. email (string) unique
6. date_of_birth (date)
7. phone_number (string)
8. division_id (integer)
9. profile_url (string)
10. gander (string)
11. descriptions (text)
12. status (boolean)
13. division (json)
14. created_at (timestamp)
15. updated_at (timestamp)
relation:
1. relation with table users (one to one)
---

# table = role_user 
---
FK: (id_role + id_user)
column table:
1. id_role (uuid) foreign key = id from table roles
2. id_user (uuid) foreign key = id from table users
3. created_at (timestamp)
4. updated_at (timestamp)
relation:
1. relation with table roles (one to many)
2. relation with table users (one to many)
---

# tabel = users;
---
column tabel:
1. id (uuid) primary key 
2. id_post (uuid) foreign key = id from table posts
3. username (string) unique
4. password (string)
5. created_at (timestamp)
6. updated_at (timestamp)
relation:
1. relation with table posts (one to many)
---

# description
---
1. entitas: users
2. relasi: one to many
3. FK: id_post
4. PK: id
5. unique: username
6. not null: id_post, username, password
7. default: created_at, updated_at
8. type: uuid, string, string, string, timestamp, timestamp
9. controller: src/domain/users/controller/user.controller.js
10. model: src/domain/users/model/user.model.js
11. repository: src/domain/users/repository/user.repository.js
12. service: src/domain/users/service/user.service.js
13. dto: 
a. src/domain/users/dto/createUser.dto.js
b. src/domain/users/dto/updateUser.dto.js
c. src/domain/users/dto/index.js (export all dto)
14. seeder: src/domain/users/seeder/user.seeder.js (role: leader + Member)
---
endpoint: GET /api/users 
Response success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Users Successfully Fetched",
  "data": [
    {
        "id": "[uuid_user]",
        "post": {
            "id": "[uuid_post]",
            "npm": "2327240094",
            "fullname": "Jefli Jonathan", 
            "email": "jefli.jonathan@example.com",
            "role_user": [
              {
                id: "object-id",
                name: "LEADER",
                status: true,
                created_at: "2026-01-16T00:05:50.000Z",
                updated_at: "2026-01-16T00:05:50.000Z"
              },
              {
                id: "object-id",
                name: "MEMBER",
                status: true,
                created_at: "2026-01-16T00:05:50.000Z",
                updated_at: "2026-01-16T00:05:50.000Z"
              }
            ],
            "date_of_birth": "2026-01-16T00:05:50.000Z",
            "phone_number": "08123456789",
            "division_id": 1,
            "profile_url": "/images/profile.jpg",
            "gander": "L",
            "descriptions": "aku suka coding aja",
            "status": true,
            "division": {
                "id": 1,
                "name": "website",
                "status": true,
                "created_at": "2026-01-16T00:05:50.000Z",
                "updated_at": "2026-01-16T00:05:50.000Z"
            },
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        }
      "username: "jefli jonathan",
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {    
        "id": "[uuid_user]",
        "post": {
            "id": "[uuid_post]",
            "npm": "2327240094",
            "fullname": "Jefli Jonathan", 
            "email": "jefli.jonathan@example.com",
            "role_user": [
              {
                id: "object-id",
                name: "VICELEADER",
                status: true,
                created_at: "2026-01-16T00:05:50.000Z",
                updated_at: "2026-01-16T00:05:50.000Z"
              },
              {
                id: "object-id",
                name: "MEMBER",
                status: true,
                created_at: "2026-01-16T00:05:50.000Z",
                updated_at: "2026-01-16T00:05:50.000Z"
              }
            ],
            "date_of_birth": "2026-01-16T00:05:50.000Z",
            "phone_number": "08123456789",
            "division_id": 1,
            "profile_url": "/images/profile.jpg",
            "gander": "L",
            "descriptions": "aku suka coding aja",
            "status": true,
            "division": {
                "id": 1,
                "name": "website",
                "status": true,
                "created_at": "2026-01-16T00:05:50.000Z",
                "updated_at": "2026-01-16T00:05:50.000Z"
            },
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        }
      "username: "jefli jonathan",
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
  ]
}
*/

# endpoint: GET /api/users/:id
Response success
/*json
  "status": "Success",
  "status_code": 200,
  "message": "User Successfully Fetched",
  "data": {
    "id": "{object-id}",
    "post": {
        "id": "{object-id}",
        "npm": "2327240094",
        "fullname": "Jefli Jonathan", 
        "email": "jefli.jonathan@example.com",
        "role_user": [
          {
            id: "object-id",
            name: "LEADER",
            status: true,
            created_at: "2026-01-16T00:05:50.000Z",
            updated_at: "2026-01-16T00:05:50.000Z"
          },
          {
            id: "object-id",
            name: "MEMBER",
            status: true,
            created_at: "2026-01-16T00:05:50.000Z",
            updated_at: "2026-01-16T00:05:50.000Z"
          }
        ],
        "date_of_birth": "2026-01-16T00:05:50.000Z",
        "phone_number": "08123456789",
        "division_id": 1,
        "profile_url": "/images/profile.jpg",
        "gander": "L",
        "descriptions": "aku suka coding aja",
        "status": true,
        "division": {
            "id": 1,
            "name": "website",
            "status": true,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        },
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
    }
  "username: "jefli jonathan",
  "created_at": "2026-01-16T00:05:50.000Z",
  "updated_at": "2026-01-16T00:05:50.000Z"
  }
  
*/

# endpoint: POST /api/users
Request body
/*json
{
    "id": "67890",
    "npm": "2327240094",
    "fullname": "Jefli Jonathan", 
    "email": "jefli.jonathan@example.com",
    "role": ["{object-id}", "{object-id}"],
    "date_of_birth": "2026-01-16T00:05:50.000Z",
    "phone_number": "08123456789",
    "division_id": 1,
    "profile_url": "/images/profile.jpg",
    "gander": "L",
    "descriptions": "aku suka coding aja",
    "status": true,
    "division": {
        "id": 1,
        "name": "website",
        "status": true,
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
    }
}
*/

Response success
/*json
{
  "status": "success",
  "status_code": 201,
  "message": "User Successfully Created",
  "data": {
    "id": "67890",
    "npm": "2327240094",
    "fullname": "Jefli Jonathan", 
    "email": "jefli.jonathan@example.com",
    "role_user": ["{object-id}", "{object-id}"],
    "date_of_birth": "2026-01-16T00:05:50.000Z",
    "phone_number": "08123456789",
    "division_id": 1,
    "profile_url": "{}",
    "gander": "L",
    "descriptions": "aku suka coding aja",
    "status": true,
    "division": 1,
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

Response Error
/*json
{
  "status": "error",
  "status_code": 400,
  "message": "Bad Request",
  "details": [
    {
      status: "Error",
      message: "invalid email",
      field: "email"
    },
     {
      status: "Error",
      message: "username is required",
      field: "username"
    },
     {
      status: "Error",
      message: "password is required",
      field: "password"
    },
     {
      status: "Error",
      message: "npm is required",
      field: "npm"
    },
     {
      status: "Error",
      message: "fullname is required",
      field: "fullname"
    },
     {
      status: "Error",
      message: "date of birth is required",
      field: "date_of_birth"
    },
     {
      status: "Error",
      message: "phone number is required",
      field: "phone_number"
    },
     {
      status: "Error",
      message: "division id is required",
      field: "division_id"
    },
     {
      status: "Error",
      message: "profile url is required",
      field: "profile_url"
    },
     {
      status: "Error",
      message: "gander is required",
      field: "gander"
    },
     {
      status: "Error",
      message: "descriptions is required",
      field: "descriptions"
    },
     {
      status: "Error",
      message: "status is required",
      field: "status"
    },
  ]
}
*/

# endpoint : PUT /api/users/:id
Request body
/*json
{
    "id": "67890",
    "npm": "2327240094",
    "fullname": "Jefli Jonathan", 
    "email": "jefli.jonathan@example.com",
    "role_user": ["{object-id}", "{object-id}"],
    "date_of_birth": "2026-01-16T00:05:50.000Z",
    "phone_number": "08123456789",
    "division_id": 1,
    "profile_url": "{}",
    "gander": "L",
    "descriptions": "aku suka coding aja",
    "status": true,
    "division": 1,
}
*/

Response success
/*json
{
  "status": "success"
  "status_code": 200,
  "message": "User Successfully Updated",
  "data": {
    "id": "67890",
    "npm": "2327240094",
    "fullname": "Jefli Jonathan", 
    "email": "jefli.jonathan@example.com",
    "role_user": ["{object-id}", "{object-id}"],
    "date_of_birth": "2026-01-16T00:05:50.000Z",
    "phone_number": "08123456789",
    "division_id": 1,
    "profile_url": "{}",
    "gander": "L",
    "descriptions": "aku suka coding aja",
    "status": true,
    "division": 1,
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

Response Error 400
/*json
{
  "status": "error",
  "status_code": 400,
  "message": "Bad Request",
  "details": [
    {
      status: "Error",
      message: "invalid email",
      field: "email"
    },
     {
      status: "Error",
      message: "username is required",
      field: "username"
    },
     {
      status: "Error",
      message: "password is required",
      field: "password"
    },
     {
      status: "Error",
      message: "npm is required",
      field: "npm"
    },
     {
      status: "Error",
      message: "fullname is required",
      field: "fullname"
    },
     {
      status: "Error",
      message: "date of birth is required",
      field: "date_of_birth"
    },
     {
      status: "Error",
      message: "phone number is required",
      field: "phone_number"
    },
     {
      status: "Error",
      message: "division id is required",
      field: "division_id"
    },
     {
      status: "Error",
      message: "profile url is required",
      field: "profile_url"
    },
     {
      status: "Error",
      message: "gander is required",
      field: "gander"
    },
     {
      status: "Error",
      message: "descriptions is required",
      field: "descriptions"
    },
     {
      status: "Error",
      message: "status is required",
      field: "status"
    },
  ]
}
*/

### DELETE /api/users/:id
## add softdelete 
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "User Successfully Deleted",
  "data": {
    "id": "67890"
  }
}
*/

