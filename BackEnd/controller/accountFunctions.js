const userModel = require("../models/userModel");

module.exports = {
  obtainData: async function (username) {
    try {
      user = await userModel.findOne({
        username: username,
      });
      if (user === null) {
        throw new Error("Account not Found");
      } else {
        return user;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },

  checkPrivilege: async function (username, res) {
    let user = await this.obtainData(username);
    if (user !== null && user.accountType !== "Cuenta Empresarial")
      throw new Error(res, "Error", "Privilegios insuficientes", null);
  },
};
