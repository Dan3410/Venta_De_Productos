const userModel = require("../../utils/models/userModel");

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

  checkPrivilege: async function (username) {
    let user = await this.obtainData(username);
    return user !== null && user.accountType === "Cuenta Empresarial";
  },
};
