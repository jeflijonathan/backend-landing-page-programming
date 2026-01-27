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

# devision default data: WEBSITE, MOBILE, GAME, MACHINE LEARNING 
### GET /api/division
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
  ]
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