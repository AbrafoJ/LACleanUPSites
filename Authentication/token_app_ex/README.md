## Basic JWT Token Example in App
Using JWT to create tokens and send them back to users.

## Install  
```
Clone this repo and run "npm install" in the main directory
```

## Usage  

### Start server  
```
node server.js //// starts server on 8000 port
```

### Make Client Requests  
In terminal or command line, enter one of the following:

Input:
```
curl -X GET http://localhost:8000
```
Expected Output:
```
{"success":false,"message":"Auth token is not supplied"}
```

Input:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"password":"password", "username":"admin"}' \
  http://localhost:8000/login
```
Expected Output:
```
{
   "success":true,
   "message":"Authentication successful!",   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68"
}
```

Input:
```
curl -X GET \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTI1MTQwLCJleHAiOjE1MzUwMTE1NDB9.MIcWFBzAr5WVhbaSa1kd1_hmEZsepo8fXqotqvAerKI' \
  http://localhost:8000
```
Expected Output:
```
{
    "success": true,
    "message": "Index page"
}
```

## License  
MIT. You can do whatever you want.  
