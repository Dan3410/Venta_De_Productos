const resModifier = require("./resModifier")
const usuariosModel = require("../models/usuariosModel");


module.exports = {
  obtainData: async function(userName,res) {
    try {
      user = await usuariosModel.findOne({
        userName: userName,
      });
    } catch (e) {
        resModifier.modifyRes(res, "Error", e.message, null);
        console.log("Datos No Modificados1")
      return null;
    }
    if (user === null) {
        resModifier.modifyRes(res, "Error", "Account not Found");
        console.log("Datos No Modificados2")
      return null;
    } else {
      return user;
    }
  },

  hasPrivilege: async function(userName,res) {
    let user = await this.obtainData(userName,res);
    if (user !== null && user.accountType !== "Cuenta Empresarial") {
      console.log(user)
        resModifier.modifyRes(res, "Error", "You dont have the Privilege to do that", null);
      return false;
    } else return true;
  },
};
