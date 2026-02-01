# table: JWT
JWT table is used to store JWT tokens for authentication
---
1. id string (uuid)
2. revoke boolean
3. IP Addreass
4. device string -> detect phone or desktop divices
5. users_id
---

# deskripsi
---
jwt =  token (1 hour)  refresh_token (24 Hour) 
1. entitas: users
2. relasi: one to many
3. FK: id_post
4. PK: id
5. unique: username
6. not null: id_post, username, password
7. default: created_at, updated_at
8. type: uuid, string, string, string, timestamp, timestamp
9. controller: src/domain/users/controller/auth.controller.js
10. model: src/domain/users/model/auth.model.js
11. repository: src/domain/users/repository/auth.repository.js
12. service: src/domain/users/service/auth.service.js
13. dto: 
a. src/domain/users/dto/login.dto.js
b. src/domain/users/dto/forgatePassword.dto.js
c. src/domain/users/dto/index.js (export all dto)
---
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "User Successfully Logged In",
  "data": {
    "id": "67890",
    "username": "jefli jonathan",
    "role_user": [
      {
        "id": "object-id",
        "name": "VICELEADER",
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
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
*/

## fitur refresh token POST /api/auth/refresh-token
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "User Successfully Logged In",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
*/

## fitur logout POST /api/auth/logout

/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "User Successfully Logged Out"
}
*/

## fitur forgot password 
## 1.  send verification email POST /api/auth/send-verification-email
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Verification email sent successfully",
  "data": {
    "email": "jefli.jonathan@example.com",
  }
}
*/

## 2. verify email POST /api/auth/verify-email
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Email verified successfully"
}
*/

## 3. reset password POST /api/auth/reset-password
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Password reset successfully"
}
*/

## fitur Edit Profile POST /api/auth/edit-profile
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Profile updated successfully"
}
*/

## fitur Edit Password POST /api/auth/edit-password
## verify old password first
/*json
{
  "status": "Success",
  "status_code": 200,
  "message": "Password updated successfully"
}
*/

