const resModifier = require("./resModifier");
const jwt = require("jsonwebtoken");

module.exports = {
  isTokenValid: async function (token,req,res) {
    console.log("token: " + token)
    try {
      const decoded = jwt.verify(token, req.app.get("secretKey"));
    } catch (e) {
      console.log(e)
      resModifier.modifyRes(res, "Error", "Invalid Token", null);
      return false;
    }
    return true;
  },
};
