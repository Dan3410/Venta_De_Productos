const jwt = require("jsonwebtoken");

module.exports = {
  checkTokenValid: async function (token,req) {
    try {
      return jwt.verify(token, req.app.get("secretKey"));
    } catch (e) {
      throw new Error(e.message);
    }
  },

  extractToken: function (req){
    if(req.headers.authorization)
      return req.headers.authorization.substring(7, req.headers.authorization.length)
    else
      throw new Error("La petición no tiene un token")
  }
};
