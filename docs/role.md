# migration
# table  = roles
# Column tabel:
# 1. id (uuid) primary key = idRole-uuid
# 2. name (string) unique (value = LEADER, VICELEADER, COORDINATOR, SECRETARY, TREASURER, MEMBER)
# 3. status (boolean)
# 4. created_at (timestamp)
# 5. updated_at (timestamp)
# relation with table role_users (one to many)

# tabel = posts
# Column tabel:
# 1. id (uuid) primary key = idPost-uuid
# 2. npm (string)
# 3. fullname (string)
# 4. email (string) unique
# 6. date_of_birth (date)
# 7. phone_number (string)
# 8. division_id (integer)
# 9. profile_url (string)
# 10. gander (string)
# 11. descriptions (text)
# 12. status (boolean)
# 13. division (json)
# 14. created_at (timestamp)
# 15. updated_at (timestamp)
# relation with table users (one to one)

# table = role_user 
# Column tabel:  FK: (id_role + id_user)
# 1. id_role (uuid) foreign key = id from table roles
# 2. id_user (uuid) foreign key = id from table users
# 3. created_at (timestamp)
# 4. updated_at (timestamp)
# relation with table roles (one to many)
# relation with table users (one to many)

# description fitur role
# Entity: Role
# controller: RoleController
# location folder controller: App/Http/Controllers/RoleController.php

# model: Role
# location folder model: App/Models/Role.php

# Request: RoleRequest
# location folder App/Http/Requests/RoleRequest.php

# unit test: RoleTest
# location folder tests/Unit/RoleTest.php

# Error Reponse Database
/*json
{
  "status": "Error",
  "status_code": 500,
  "message": "Database Error"
}
*/
### GET role for OPTIONS /api/role
# fitur search
# fitur sort
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Role Successfully Fetched",
  "data": [
    {
      "id": "object-id",
      "name": "LEADER",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": "object-id",
      "name": "VICELEADER",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": "object-id",
      "name": "COORDINATOR",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": "object-id",
      "name": "SECRETARY",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": "object-id",
      "name": "TREASURER",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    },
    {
      "id": "object-id",
      "name": "MEMBER",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    }
  ]
}
*/