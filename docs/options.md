# location: App/Http/Controllers/OptionsController.php

# options member 
filter by name role
# role=LEADER,VICELEADER, COORDINATOR, SECRETARY, TREASURER, MEMBER
endpoint: GET /api/options/anggota
Response Success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Options Users Successfully Fetched",
  "data": [
    {
        "id": "uuid-users-1",
        "username": "jefli jonathan",
        "division": {
            "id": 1,
            "name": "website",
            "status": true,
            "created_at": "2026-01-16T00:05:50.000Z",
            "updated_at": "2026-01-16T00:05:50.000Z"
        },
        "role_user": [
            {
                "id": "uuid-role-1",
                "name": "LEADER",
                "status": true,
                "created_at": "2026-01-16T00:05:50.000Z",
                "updated_at": "2026-01-16T00:05:50.000Z"
            },
            {
                "id": "uuid-role-2",
                "name": "MEMBER",
                "status": true,
                "created_at": "2026-01-16T00:05:50.000Z",
                "updated_at": "2026-01-16T00:05:50.000Z"
            }
        ]
    }
  ]
}
*/
