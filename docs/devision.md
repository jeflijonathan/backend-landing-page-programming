# table devisi
---
1. id integer (PK) auto increment
2. name string (unique)
3. url_image string (FK)
4. status boolean
5. created_at timestamp
6. updated_at timestamp
7. relation url_image with table upload_file
---

# description
---
Entity: Division
controller: DivisionController
model: Division.model.js
repository: Division.repository.js
service: Division.service.js
devision default data (seeder): WEBSITE, MOBILE, GAME, MACHINE LEARNING 
dto: 
src/domain/division/dto/divisionCreate.dto.js
src/domain/division/dto/divisionUpdate.dto.js
src/domain/division/dto/index.js
unitTesting: src/testing/division.test.js
read common: 
1. using base controller
2. using base DTO
3. using base MYSQL
and consts form comon
dbField.js
statusCode.js
userRole.js 
---

# endpoint
endpoint:GET /api/division
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Division Successfully Fetched",
  "data": [
    {
      "id": 1,
      "name": "website",
      "url_image": "650e8400-e29b-41d4-a716-446655440000",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": 2,
      "name": "mobile",
      "url_image": "650e8400-e29b-41d4-a716-446655440000",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
        "id": 3,
        "url_image": "650e8400-e29b-41d4-a716-446655440000",
        "name": "game",
        "status": true,
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
        "id": 3,
        "name": "machine learning",
        "url_image": "650e8400-e29b-41d4-a716-446655440000",
        "status": true,
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
    }
  ],
  pagination: {
      "page": 1,
      "limit": 10,
      "total": 5,
      "total_pages": 1
  }
}
*/

# get by id
endpoint: GET /api/division/:id
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Division Successfully Fetched",
  "data": {
    "id": 1,
    "name": "website",
    "url_image": "650e8400-e29b-41d4-a716-446655440000",
    "status": true,
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### POST /api/division

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Division Successfully Created",
  "data": {
    "id": 4,
    "name": "website",
    "url_image": "650e8400-e29b-41d4-a716-446655440000",
    "status": true,
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### PUT /api/division/:id

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Division Successfully Updated",
  "data": {
    "id": 4,
    "name": "website",
    "url_image": "650e8400-e29b-41d4-a716-446655440000",
    "status": true,
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/