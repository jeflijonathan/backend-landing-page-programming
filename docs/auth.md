## Entity: Auth
## controller: AuthController
# location folder controller:App/Http/Controllers/AuthController.php

## model: AuthModel
# location folder model:App/Models/AuthModel.php

## Request: AuthRequest
# location folder App/Http/Requests/AuthRequest.php

## unit test: AuthTest
# location folder tests/Unit/AuthTest.php

## fitur login POST /api/auth/login
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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

