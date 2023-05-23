const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const { ResponseHandler } = require("../../utils");

class Auth {
  constructor() {}

  async authenticate(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(" ")[1];
    }
   
    if (!token)
      return ResponseHandler.errorResponse(res, 401, "Authentication failed");

    try {
      // Verify token
      const decoded = jwt.verify(token, jwtSecret);
      
      req.user = {
        user_id: decoded.id
      };
     
      next();
    } catch (err) {
      return ResponseHandler.errorResponse(res, 401, "Authentication failed");
    }
  }


}

module.exports = new Auth();
