## table = informations
## column table
# 1. id (PK)
# 2. title
# 3. url_file (FK)
# 4. id_author (FK)
# 5. description
# 6. created_at
# 7. updated_at
# 8. deleted_at

## fitur get all informations GET /api/informasi
# fitur search
# fitur sort asc, desc order by created_at, updated_at
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Informasi Successfully Fetched",
  "data": [
    {
      "id": "object-id",
      "title": "Informasi 1",
      "url_file": "id_upload_file",
      "id_author": "object-id",
      "description": "Informasi 1",
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z",
      "deleted_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": "object-id",
      "title": "Informasi 2",
      "url_file": "id_upload_file",
      "id_author": "object-id",
      "description": "Informasi 2",
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z",
      "delete_at": "2026-01-16T00:05:50.000Z"
    }
  ]
}
*/

### GET informasi by id GET /api/informasi/:id

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Informasi Successfully Fetched",
  "data": {
    "id": "object-id",
    "title": "Informasi 1",
    "url_file": "id_upload_file",
    "id_author": "object-id",
    "description": "Informasi 1",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### POST informasi POST /api/informasi
request body
/*json
  "id": "object-id",
  "title": "Informasi 1",
  "url_file": "id_upload_file",
  "id_author": "object-id",
  w"description": "Informasi 1",
*/

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Informasi Successfully Created",
  "data": {
    "id": "object-id",
    "title": "Informasi 1",
    "url_file": "id_upload_file",
    "id_author": "object-id",
    "description": "Informasi 1",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### PUT informasi by id PUT /api/informasi/:id
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Informasi Successfully Updated",
  "data": {
    "id": "object-id",
    "title": "Informasi 1",
    "url_file": "id_upload_file",
    "id_author": "object-id",
    "description": "Informasi 1",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### DELETE informasi by id soft delete /api/informasi/:id

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Informasi Successfully Deleted",
  "data": {
    "id": "object-id",
    "title": "Informasi 1",
    "url_file": "id_upload_file",
    "id_author": "object-id",
    "description": "Informasi 1",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": "2026-01-16T00:05:50.000Z"
  }
}
*/


