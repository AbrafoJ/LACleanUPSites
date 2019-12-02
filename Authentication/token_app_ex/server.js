// server.js holds the main application logic
// Contains the code to create a token
const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    // Here we are mocking the username and password, but in reality, those details should 
    //    be fetched from the database server.
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        // jwt.sign function takes the payload, secret and options as its arguments.
        //  - The payload can be used to find out which user is the owner of the token.
        //  - Options can have an expire time until which token is valid.
        //  - The generated token will be a string.
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls.
        // We are then sending the generated token back to the client in the response body. 
        // The client should preserve this token for future requests.
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

// Starting point of the server
function main () {
  let app = express(); // Export app for other routes to use
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  // Routes & Handlers
  // Code for starting the application server, attaching routes to middleware and handlers.
  app.post('/login', handlers.login);
  // A chain of handlers, where control first goes to middleware and then to the handler.
  //    - Middleware function verifies JWT
  app.get('/', middleware.checkToken, handlers.index);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
