# table = UploadFile
# Column tabel:
# 1. id (uuid) primary key = nameFile-uuid
# 2. url (string)
# 3. created_at (timestamp)
# 4. updated_at (timestamp)

# deskription 
# entitas: UploadFile
# controller: UploadFileController
# model: UploadFile
# request: UploadFileRequest
# unit test: UploadFileTest

## upload file
### endpoint: GET /api/upload-file
Response Success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "File Successfully Fetched",
  "data": {
   "id": "profile-550e8400-e29b-41d4-a716-446655440000"
    "url": "/images/profile.jpg",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### endpoint: POST /api/upload-file POST /api/upload-file
Request_body
/*json
{
  "file": "/images/profile.jpg"
}
*/

Response Success
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "File Successfully Uploaded",
  "data": {
   "id": "profile-650e8400-e29b-41d4-a716-446655440000",
    "url": "/images/profile.jpg",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/


### endpoint: PUT /api/upload-file/:id
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "File Successfully Updated",
  "data": {
    "id": "profile-550e8400-e29b-41d4-a716-446655440000"
    "url": "/images/profile.jpg",
    "created_at": "2026-01-16T00:05:50.000Z",
    "updated_at": "2026-01-16T00:05:50.000Z"
  }
}
*/

### endpoint: DELETE /api/upload-file/:id
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "File Successfully Deleted",
  "data": {
    "id": "67890"
  }
}
*/
