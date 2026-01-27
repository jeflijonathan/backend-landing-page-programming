## table commitee

## id (PK) using uuid required true

## id_leader (FK) using relation user required true

## id_vice_leader (FK) using relation user required true

## id_secretary (FK) using relation user required true

## id_treasurer (FK) using relation user required true

## start_year required true

## end_year

## created_at

## updated_at

## deleted_at

## table member

## id (PK) using uuid required true

## id_user (FK) using relation user required true

## id_commitee (FK) using relation commitee required true

## created_at

## updated_at

## table coordinator

## id (PK) using uuid required true

## id_user (FK) using relation user required true

## id_commitee (FK) using relation commitee required true

## created_at

## updated_at

## Entity: StructureCommitee

## controller: StructureCommiteeController

# location folder controller:App/Http/Controllers/StructureCommiteeController.php

## model: StructureCommiteeModel

# location folder model:App/Models/StructureCommitee.php

## Request: StructureCommiteeRequest App/Http/Requests/StructureCommiteeRequest.php

# location folder App/Http/Requests/StructureCommiteeRequest.php

## unit test: StructureCommiteeTest tests/Unit/StructureCommiteeTest.php

# location folder tests/Unit/StructureCommiteeTest.php

## GET commitee GET /api/commitee

/*json
{
"status": "Success",
"status_code": 200,
"message": "Commitee Successfully Fetched",
"data": [
{
"id": "uuid-commitee",
"id_leader": "uuid-user-leader",
"id_vice_leader": "uuid-user-vice",
"id_secretary": "uuid-user-secretary",
"id_treasurer": "uuid-user-treasurer",

      "leader": {
        "id": "uuid-user-leader",
        "npm": "2327240094",
        "fullname": "Jefli Jonathan",
        "email": "jefli.jonathan@example.com",
        "role": "ADMIN",
        "date_of_birth": "2026-01-16T00:05:50.000Z",
        "phone_number": "08123456789",
        "division_id": 1,
        "profile_url": "/images/profile.jpg",
        "gender": "L",
        "descriptions": "aku suka coding aja",
        "status": true,
        "division": {
          "id": 1,
          "name": "Website",
          "status": true,
          "created_at": "2026-01-16T00:05:50.000Z",
          "updated_at": "2026-01-16T00:05:50.000Z"
        },
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
      },

      "vice_leader": {
        "id": "uuid-user-vice",
        "npm": "2327240095",
        "fullname": "Vice Leader Name",
        "email": "vice@example.com",
        "role": "MEMBER",
        "date_of_birth": "2026-01-16T00:05:50.000Z",
        "phone_number": "08123456780",
        "division_id": 2,
        "profile_url": "/images/profile2.jpg",
        "gender": "L",
        "descriptions": "vice leader description",
        "status": true,
        "division": {
          "id": 2,
          "name": "Mobile",
          "status": true,
          "created_at": "2026-01-16T00:05:50.000Z",
          "updated_at": "2026-01-16T00:05:50.000Z"
        },
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
      },

      "secretary": {
        "id": "uuid-user-secretary",
        "npm": "2327240096",
        "fullname": "Secretary Name",
        "email": "secretary@example.com",
        "role": "MEMBER",
        "phone_number": "08123456781",
        "gender": "P",
        "status": true,
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
      },

      "treasurer": {
        "id": "uuid-user-treasurer",
        "npm": "2327240097",
        "fullname": "Treasurer Name",
        "email": "treasurer@example.com",
        "role": "MEMBER",
        "phone_number": "08123456782",
        "gender": "L",
        "status": true,
        "created_at": "2026-01-16T00:05:50.000Z",
        "updated_at": "2026-01-16T00:05:50.000Z"
      },

      "coordinators": [
        {
          "id": "uuid-coordinator",
          "user": {
            "id": "uuid-user-coordinator",
            "fullname": "Coordinator Name",
            "email": "coordinator@example.com",
            "role": "MEMBER",
            "status": true
          },
          "created_at": "2026-01-16T00:05:50.000Z",
          "updated_at": "2026-01-16T00:05:50.000Z"
        }
      ],

      "members": [
        {
          "id": "uuid-member",
          "user": {
            "id": "uuid-user-member",
            "fullname": "Member Name",
            "email": "member@example.com",
            "role": "MEMBER",
            "status": true
          },
          "created_at": "2026-01-16T00:05:50.000Z",
          "updated_at": "2026-01-16T00:05:50.000Z"
        }
      ],
      "start_year": "2026",
      "end_year": "2027",
      "created_at": "2026-01-16T00:05:50.000Z",
      "updated_at": "2026-01-16T00:05:50.000Z"
    }

]
}
*/

## Error Response

/*json
{
"status":"",
"status_code":"",
"message":"",
}
*/

## Create commitee POST /api/commitee

/*json
{
"status": "Success",
"status_code": 200,
"message": "Commitee Successfully Created",
"data": {
"id": "uuid-commitee",
"id_leader": "uuid-user-leader",
"id_vice_leader": "uuid-user-vice",
"id_secretary": "uuid-user-secretary",
"id_treasurer": "uuid-user-treasurer",
"start_year": "2026",
"end_year": "2027",
"member": [
{
"id": "uuid-member",
"user": {
....
},
"created_at": "2026-01-16T00:05:50.000Z",
"updated_at": "2026-01-16T00:05:50.000Z"
}
],
"coordinator": [
{
"id": "uuid-coordinator",
"user": {
...
},
"created_at": "2026-01-16T00:05:50.000Z",
"updated_at": "2026-01-16T00:05:50.000Z"
}
],
"created_at": "2026-01-16T00:05:50.000Z",
"updated_at": "2026-01-16T00:05:50.000Z"
}
}
_/

## Update commitee

/_json
{
"status": "Success",
"status_code": 200,
"message": "Commitee Successfully Updated",
"data": {
"id": "uuid-commitee",
"id_leader": "uuid-user-leader",
"id_vice_leader": "uuid-user-vice",
"id_secretary": "uuid-user-secretary",
"id_treasurer": "uuid-user-treasurer",
"start_year": "2026",
"end_year": "2027",
"member": [
{
"id": "uuid-member",
"user": {
....
},
"created_at": "2026-01-16T00:05:50.000Z",
"updated_at": "2026-01-16T00:05:50.000Z"
}
],
"coordinator": [
{
"id": "uuid-coordinator",
"user": {
...
},
"created_at": "2026-01-16T00:05:50.000Z",
"updated_at": "2026-01-16T00:05:50.000Z"
}
],
"created_at": "2026-01-16T00:05:50.000Z",
"updated_at": "2026-01-16T00:05:50.000Z"
}
}
_/

## Delete commitee

/_json
{
"status": "Success",
"status_code": 200,
"message": "Commitee Successfully Deleted"
}
_/
