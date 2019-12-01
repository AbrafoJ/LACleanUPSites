// In middleware.js, we are going to define the JWT validation logic
let jwt = require('jsonwebtoken');
const config = require('./config.js');

// We can write a function that acts as middleware to get a token from a request and proceeds only when the token is validated.
let checkToken = (req, res, next) => {
  // 1. Capture headers with names ‘x-access-token’ or ‘Authorization.’
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    // 2. If the header is in ‘Authorization: Bearer xxxx…’ format, strip unwanted prefix before token.
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    // 3. Using jwt package and secret string, validate the token.
    jwt.verify(token, config.secret, (err, decoded) => {
      // 4. If anything goes wrong, return an error immediately before passing control to next handler.
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
// 5. Export the middleware function for other modules to use.
module.exports = {
  checkToken: checkToken
};
