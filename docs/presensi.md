# table status_presesi_sessions
---
1. id integer (PK) auto increment
2. name string (unique) (value = waiting, open, close)
3. status boolean (true = active, false = inactive)
4. created_at timestamp
5. updated_at timestamp
6. deleted_at timestamp
---

# table presensi_sessions
---
1. id uuid (PK)
2. title string
3. description text
4. open_at datetime
5. close_at datetime
6. is_participation_proof_required boolean (true = harus upload bukti, false = tidak perlu upload bukti)
7. status integer (FK)
8. created_at timestamp
9. updated_at timestamp
10. deleted_at timestamp
* relation status with table status
---

# table presensi
---
1. id uuid (PK)
2. id_post uuid (FK)
3. id_presensi_sessions uuid (FK)
4. statusPresensi integer (FK)
5. description text (null)
6. image_url string (null)
7. created_at timestamp
8. updated_at timestamp
9. deleted_at timestamp
* relation id_post with table post
* relation image_url with table upload_file
* relation id_presensi_sessions with table candidate
* relation statusPresensi with table status_presensi
---

# table status_presensi
---
1. id integer (PK)
2. name string (present, absent, permission)
3. status boolean (true = active, false = inactive)
4. created_at timestamp
5. updated_at timestamp
6. deleted_at timestamp
---

# description fitur
---
description:
1. Entity: PresensiCandidate
2. controller: src/domains/presensi/presensi.controller.js
3. model: src/domains/presensi/presensi.model.js
4. DTO: 
  a. src/domains/presensi/dto/CreateSessionpresensi.dto.js -> This feature is used to create a new session, allowing users to add new sessions to the system.
  b. src/domains/presensi/dto/UpdateSessionpresensi.dto.js -> This feature is used to update session information and participant data, allowing users to change the participants’ attendance status.
  c. src/domains/presensi/dto/scanPresensi.dto.js -> This feature is used to scan the participant’s attendance status.
  d. src/domains/presensi/dto/index.js -> This feature is used to get all sessions, allowing users to view all sessions in the system.
5. unit test: src/testing/presensi.test.js
6. repository: src/domains/presensi/presensi.repository.js
7. service: src/domains/presensi/presensi.service.js
8. validator: src/domains/presensi/presensi.validator.js
9. Create Session Filter: Allows filtering by role during session creation. A dedicated endpoint is provided to retrieve active roles or select from the available post options. This feature helps the session creation process by determining which members will participate and be included in the attendance list.
---

## Error Reponse Database
/*json
{
"status": "Error",
"status_code": 500,
"message": "Database Error"
}
*/

## fitur get all sessions GET /api/presensi-sessions
**parameter**
- search: string
- sort: asc, desc
- order_by: created_at, updated_at
- status: integer
---

Success Response
/*json
{
"status": "Success",
"status_code": 200,
"message": "Presensi Sessions Successfully Fetched",
"data": [
{
"id": "uuid-session-1",
"title": "Pertemuan 1: Introduction",
"presensi_allow_presensi_sessions": [
    {
      "id": "uuid-role-1",
      "name": "LEADER"
    },
    {
      "id": "uuid-role-2",
      "name": "VICELEADER"
    },
    {
      "id": "uuid-role-3",
      "name": "COORDINATOR"
    },
    {
      "id": "uuid-role-4",
      "name": "SECRETARY"
    },
    {
      "id": "uuid-role-5",
      "name": "TREASURER"
    },
    {
      "id": "uuid-role-6",
      "name": "MEMBER"
    }
],
"is_participation_proof_required": true,
"description": "Sesi perkenalan UKM Programming",
"presensi_candidates": [
    {
      "id": "uuid-presensi-1",
      "id_post": "uuid-session-1",
      "statusPresensi": 1,
      "created_at": "2026-01-25T19:30:00.000Z",
      "description": null,
      "updated_at": "2026-01-25T19:30:00.000Z",
      "status": {
        "id": 1,
        "name": "present"
      }
    },
    {
      "id": "uuid-presensi-2",
      "id_post": "uuid-session-1",
      "statusPresensi": 2,
      "created_at": "2026-01-25T19:30:00.000Z",
      "updated_at": "2026-01-25T19:30:00.000Z",
      "deskripsi": "Alasan absen",
      "status": {
        "id": 2,
        "name": "absent"
      }
    },
    {
      "id": "uuid-presensi-3",
      "id_post": "uuid-session-1",
      "statusPresensi": 3,
      "created_at": "2026-01-25T19:30:00.000Z",
      "description": "Alasan late",
      "updated_at": "2026-01-25T19:30:00.000Z",
      "status": {
        "id": 3,
        "name": "late"
      }
    }
],
"open_at": "2026-01-25T19:00:00.000Z",
"close_at": "2026-01-25T21:00:00.000Z",
"status": true,
"created_at": "2026-01-25T18:00:00.000Z",
"updated_at": "2026-01-25T18:00:00.000Z"
}
]
}
*/


## Error Response 401

/*json
{
"status": "Error",
"status_code": 401,
"message": "Unauthorized - Authentication required"
}
*/

## Error Response 404

/*json
{
"status": "Error",
"status_code": 404,
"message": "Presensi Sessions Not Found"
}
*/

## Error Response 500

/*json
{
"status": "Error",
"status_code": 500,
"message": "Internal Server Error"
}
*/

## fitur get session detail GET /api/presensi-sessions/{id}

/*json
{
"status": "Success",
"status_code": 200,
"message": "Presensi Session Detail Successfully Fetched",
"data": {
"id": "uuid-session-1",
"title": "Pertemuan 1: Introduction",
"description": "Sesi perkenalan UKM Programming",
"open_at": "2026-01-25T19:00:00.000Z",
"close_at": "2026-01-25T21:00:00.000Z",
"presensi_allow_presensi_sessions": [
{ "id": "uuid-role-1", "name": "LEADER" },
{ "id": "uuid-role-2", "name": "VICELEADER" },
{ "id": "uuid-role-3", "name": "COORDINATOR" },
{ "id": "uuid-role-4", "name": "SECRETARY" },
{ "id": "uuid-role-5", "name": "TREASURER" },
{ "id": "uuid-role-6", "name": "MEMBER" }
],
"presensi_candidates": [
{
"id": "uuid-presensi-1",
"id_post": "uuid-session-1",
"statusPresensi": 1,
"created_at": "2026-01-25T19:30:00.000Z",
"description": null,
"updated_at": "2026-01-25T19:30:00.000Z",
"status": {
"id": 1,
"name": "present"
}
},
{
"id": "uuid-presensi-2",
"id_post": "uuid-session-1",
"statusPresensi": 2,
"created_at": "2026-01-25T19:30:00.000Z",
"updated_at": "2026-01-25T19:30:00.000Z",
"deskripsi": "Alasan absen",
"status": {
"id": 2,
"name": "absent"
}
},
{
"id": "uuid-presensi-3",
"id_post": "uuid-session-1",
"statusPresensi": 3,
"created_at": "2026-01-25T19:30:00.000Z",
"description": "Alasan late",
"updated_at": "2026-01-25T19:30:00.000Z",
"status": {
"id": 3,
"name": "late"
}
}
],
"status": true,
"created_at": "2026-01-25T18:00:00.000Z",
"updated_at": "2026-01-25T18:00:00.000Z"
}
}
*/




## fitur create session POST /api/presensi-sessions

/*json
{
"status": "Success",
"status_code": 201,
"message": "Presensi Session Successfully Created",
"data": {
"id": "uuid-new-session",
"title": "Pertemuan 2: Logic",
"presensi_allow_presensi_sessions": [
{
"id": "uuid-role-candidate",
"name": "candidate"
},
],
"descriptions": "Sesi pemahaman logika dasar",
"open_at": "2026-02-01T19:00:00.000Z",
"close_at": "2026-02-01T21:00:00.000Z",
"is_participation_proof_required": true,
"status": true,
"created_at": "2026-01-25T21:35:00.000Z",
"updated_at": "2026-01-25T21:35:00.000Z"
}
}
*/


## Error Response 400
/*json
{
"status": "Error",
"status_code": 400,
"message": "Bad Request"
"details": [
  {
    "field": "id_post",
    "message": "Invalid session ID format"
  }
]
}
*/

## fitur submit presensi POST /api/presensi/submit/{id} (akses: bersangkutan)

/*json
{
"status": "Success",
"status_code": 201,
"message": "Presensi Successfully Submitted",
"data": {
"image_url": "uuid-image-url",
"statusPresensi": 1,
"created_at": "2026-01-25T19:30:00.000Z",
"updated_at": "2026-01-25T19:30:00.000Z",
}
}
*/


## fitur update presensi sessions PUT /api/presensi-sessions/{id}( akases: coordinator, leader & viceLeader)
/*json
{
"status": "Success",
"status_code": 200,
"message": "Presensi Session Successfully Updated",
"data": {
"id": "uuid-session-1",
"title": "Pertemuan 1: Introduction",
"description": "Sesi perkenalan UKM Programming",
"open_at": "2026-01-25T19:00:00.000Z",
"close_at": "2026-01-25T21:00:00.000Z",
"status_prensesi_sessions": 1,

    }

}
*/

## fitur history presensi GET /api/presensi/history/{id} (id=id_post) (akses: ALL) (fitur search, sort, filter) filter by id_posts

# This feature displays all attendance data based on the relationship with the post.

/*json
{
"status": "Success",
"status_code": 200,
"message": "Presensi History Successfully Fetched",
"data": [
{
"id": "uuid-session-1",
"title": "Pertemuan 1: Introduction",
"description": "Sesi perkenalan UKM Programming",
"open_at": "2026-01-25T19:00:00.000Z",
"close_at": "2026-01-25T21:00:00.000Z",
"presensi_allow_presensi_sessions": [
{ "id": "uuid-role-1", "name": "LEADER" },
{ "id": "uuid-role-2", "name": "VICELEADER" },
{ "id": "uuid-role-3", "name": "COORDINATOR" },
{ "id": "uuid-role-4", "name": "SECRETARY" },
{ "id": "uuid-role-5", "name": "TREASURER" },
{ "id": "uuid-role-6", "name": "MEMBER" }
],
"presensi_candidates": [
{
"id": "uuid-presensi-2",
"id_post": "uuid-session-1",
"statusPresensi": 2,
"created_at": "2026-01-25T19:30:00.000Z",
"updated_at": "2026-01-25T19:30:00.000Z",
"deskripsi": "Alasan absen",
"status": {
"id": 2,
"name": "absent"
}
},
],
"status": true,
"created_at": "2026-01-25T18:00:00.000Z",
"updated_at": "2026-01-25T18:00:00.000Z"
}

]
}
*/
