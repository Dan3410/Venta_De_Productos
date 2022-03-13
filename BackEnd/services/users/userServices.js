module.exports = {
  findUsernameService: async function (username) {
    return await userModel.findOne({
      username: username,
    });
  },

  findMailService: async function (mail) {
    return await userModel.findOne({ mail: mail });
  },

  createUserService: async function (userData) {
    var data = new userModel(userData);
    return await data.save();
  },

  updateUserService: async function (username, newData) {
    return await userModel.updateOne({ username: username }, newData);
  },
};
