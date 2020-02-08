# API documentation

## POST requests

### /user/signup
Signs up a user. Responds with 200 OK upon success.

#### Required Headers
'Content-Type': 'application/json'

#### Body
{
  username: string, 
  password: string, 
  passwordConfirmation: string, 
  email: string
}

### /user/login
Logs in a user with a specified username and password. responds with a session token if successful.

#### Required Headers
'Content-Type': 'application/json'

#### Body
{
  username: string,
  password: string
}

#### Response body
{
  token: string
}

### /user/createGait
Creates a "gait" (walk) for a specific user, with a start and end (in lat/long).
Checks to make sure the provided token is valid for a given session, and creates 
a gait under the associated username.

#### Required headers
'Content-Type': 'application/json'

#### Request body
{
  startLat: string,
  startLong: string,
  endLat: string,
  endLong: string,
  token: string
}
