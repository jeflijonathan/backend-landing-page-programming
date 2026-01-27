# table candidate_recruitment_sessions
---
1. id (PK) uuid
2. title (string)
3. opening_date (timestamp)
4. closing_date (timestamp)
5. opened_by (FK) -> relation post
6. descriptions (text)
7. status (boolean)
8. created_at timestamp
9. updated_at timestamp
10. deleted_at timestamp
---

# table status_candidate
---
1. id (PK) int
2. name (string) -> value: PENDING, ACCEPTED, REJECTED unique
3. status (boolean)
4. created_at timestamp
5. updated_at timestamp
6. deleted_at timestamp
---

# table candidate
---
1. id (PK) uuid
2. fullname (string)
3. email (string)
4. npm (string)
5. gander (enum)
6. date_of_birth (timestamp)
7. phone_number (string)
8. id_status_candidate (FK) -> relation status_candidate
9. id_candidate_recruitment_sessions (FK)
10. id_division (FK) -> relation division
11. url_cv (FK) -> relation upload_file
12. created_at timestamp
13. updated_at timestamp
14. deleted_at timestamp
---

# description
---
1. entitas: RegistrationCandidate
2. controller: RegistrationCandidateController
3. model: RegistrationCandidateModel
4. request: RegistrationCandidateRequest
5. unit test: RegistrationCandidateTest
---

# GET
endpoint: /api/registration-candidate
response success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Registration candidate retrieved successfully",
  "data": [
    {
      "id": "object-id",
      "fullname": "Jefli Jonathan",
      "email": "[EMAIL_ADDRESS]",
      "npm": "1234567890",
      "gander": "Laki-laki",
      "date_of_birth": "2002-01-01",
      "phone_number": "08123456789",
      "id_status_candidate": "object-id",
      "id_candidate_recruitment_sessions": "uuid",
      "id_division": "uuid",
      "status_candidate": {
        "id": "object-id",
        "name": "PENDING",
        "status": true,
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z",
        "deleted_at": null
      },
      "candidate_recruitment_sessions": {
        "id": "uuid",
        "title": "string",
        "opening_date": "timestamp",
        "closing_date": "timestamp",
        "opened_by": "uuid",
        "descriptions": "text",
        "status": true,
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "deleted_at": "timestamp"
      },
      "division": {
        "id": "uuid",
        "name": "string",
        "status": true,
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "deleted_at": "timestamp"
      },
      "url_cv": "uuid",
      "upload_file": {
        "id": "uuid",
        "name": "string",
        "path": "string",
        "type": "string",
        "size": "integer",
        "uploaded_by": "uuid",
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "deleted_at": "timestamp"
      },
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z",
      "deleted_at": null
    }
  ]
}
*/
# GET By Id
endpoint: /api/registration-candidate/{id}
response success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Registration candidate retrieved successfully",
  "data": {
    "id": "object-id",
    "fullname": "Jefli Jonathan",
    "email": "[EMAIL_ADDRESS]",
    "npm": "1234567890",
    "gander": "Laki-laki",
    "date_of_birth": "2002-01-01",
    "phone_number": "08123456789",
    "id_status_candidate": "object-id",
    "id_candidate_recruitment_sessions": "uuid",
    "id_division": "uuid",
    "status_candidate": {
      "id": "object-id",
      "name": "PENDING",
      "status": true,
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z",
      "deleted_at": null
    },
    "candidate_recruitment_sessions": {
      "id": "uuid",
      "title": "string",
      "opening_date": "timestamp",
      "closing_date": "timestamp",
      "opened_by": "uuid",
      "descriptions": "text",
      "status": true,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "deleted_at": "timestamp"
    },
    "division": {
      "id": "uuid",
      "name": "string",
      "status": true,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "deleted_at": "timestamp"
    },
    "url_cv": "uuid",
    "upload_file": {
      "id": "uuid",
      "name": "string",
      "path": "string",
      "type": "string",
      "size": "integer",
      "uploaded_by": "uuid",
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "deleted_at": "timestamp"
    },
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": null
  }
}
*/

# POST
endpoint: /api/registration-candidate
request body -> note: id_status_candidate default value is 1 (PENDING)
/*json
{
    "fullname": "Jefli Jonathan",
    "email": "[EMAIL_ADDRESS]",
    "npm": "1234567890",
    "gander": "Laki-laki",
    "date_of_birth": "2002-01-01",
    "phone_number": "08123456789",
    "id_candidate_recruitment_sessions": "object-id",
    "id_division": "object-id",
    "url_cv": "object-id"
}
*/

response success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Registration candidate created successfully",
  "data": {
    "id": "object-id",
    "fullname": "Jefli Jonathan",
    "email": "[EMAIL_ADDRESS]",
    "npm": "1234567890",
    "gander": "Laki-laki",
    "date_of_birth": "2002-01-01",
    "phone_number": "08123456789",
    "id_status_candidate": "object-id",
    "id_candidate_recruitment_sessions": "object-id",
    "id_division": "object-id",
    "url_cv": "object-id",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": null
  }
}
*/

# PUT
endpoint: /api/registration-candidate/{id}
request body
/*json
{
    "fullname": "Jefli Jonathan",
    "email": "[EMAIL_ADDRESS]",
    "npm": "1234567890",
    "gander": "Laki-laki",
    "date_of_birth": "2002-01-01",
    "phone_number": "08123456789",
    "id_status_candidate": "object-id",
    "id_candidate_recruitment_sessions": "object-id",
    "id_division": "object-id",
    "url_cv": "object-id"
}
*/

response success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Registration candidate updated successfully",
  "data": {
    "id": "object-id",
    "fullname": "Jefli Jonathan",
    "email": "[EMAIL_ADDRESS]",
    "npm": "1234567890",
    "gander": "Laki-laki",
    "date_of_birth": "2002-01-01",
    "phone_number": "08123456789",
    "id_status_candidate": "object-id",
    "id_candidate_recruitment_sessions": "object-id",
    "id_division": "object-id",
    "url_cv": "object-id",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z",
    "deleted_at": null
  }
}
*/

# DELETE
endpoint: /api/registration-candidate/{id}
response success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Registration candidate deleted successfully"
}
*/
