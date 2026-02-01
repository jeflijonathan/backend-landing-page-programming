# table = UploadFile
# Column tabel:
UploadFile Columns:
---
1. id (uuid) primary key = nameFile-uuid
2. url (string)
3. created_at (timestamp)
4. updated_at (timestamp)
---

# deskription 
---
1. entitas: UploadFile
2. controller: src/domain/uploadFile/uploadFile.controller.js
3. model: src/domain/uploadFile/uploadFile.model.js
4. service: src/domain/uploadFile/uploadFile.service.js
5. repository: src/domain/uploadFile/uploadFile.repository.js
6. dto (yup): using base dto in common 
a. create: src/domain/uploadFile/dto/createUploadFile.dto.js
b. update: src/domain/uploadFile/dto/updateUploadFile.dto.js
c. index: src/domain/uploadFile/dto/index.js (export all dto)
7. unit test: src/testing/uploadFile.test.js

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
