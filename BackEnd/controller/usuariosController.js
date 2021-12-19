const resModifier = require ("./resModifier");
const usuariosModel = require("../models/usuariosModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  logUser: async function (req, res, next) {
    try {
      const user = await usuariosModel.findOne({ userName: req.body.userName });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ id: user._id }, req.app.get("secretKey"), {
            expiresIn: "1h",
          });
          resModifier.modifyRes(res, "Success", "User Found", { user: user, token: token });
        } else {
          resModifier.modifyRes(res, "Error", "Invalid Password", null);
        }
      } else {
        resModifier.modifyRes(res, "Error", "User Not Found", null);
      }
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
      next(e);
    }
  },
  findUserByUsername: async function (req, res, next) {
    const token = req.params.token;
    try {
      const user = await usuariosModel.findOne({
        userName: req.params.userName,
      });
      if (user) {
        try {
          const decoded = jwt.verify(
            req.params.token,
            req.app.get("secretKey")
          );
          resModifier.modifyRes(res, "Success", "userFound", { user: user });
        } catch (e) {
          resModifier.modifyRes(res, "Error", "Invalid Token", null);
        }
      } else {
        resModifier.modifyRes(res, "Error", "User Not Found", null);
      }
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
    }
  },
  updateUserData: async function (req, res, next) {
    const token = req.body.token;
    let user;
    try {
      user = await usuariosModel.findOne({
        userName: req.body.userName,
      });
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
      return;
    }
    if (user) {
      try {
        const decoded = jwt.verify(req.body.token, req.app.get("secretKey"));
      } catch (e) {
        resModifier.modifyRes(res, "Error", "Invalid Token", null);
        return;
      }
      try {
        let newData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };
        if (req.body.password !== undefined) {
          let newPassword = bcrypt.hashSync(req.body.password, 10);
          newData.password = newPassword;
        }
        await usuariosModel.updateOne({ userName: req.body.userName }, newData);
        resModifier.modifyRes(res, "Success", "User Data Updated", { user: newData });
      } catch (e) {
        resModifier.modifyRes(res, "Error", "Error al Actualizar", null);
        return;
      }
    } else {
      resModifier.modifyRes(res, "Error", "User Not Found", null);
    }
  },
  register: async function (req, res, next) {
    try {
      const userByMail = await usuariosModel.findOne({ mail: req.body.mail });
      const userByuserName = await usuariosModel.findOne({
        userName: req.body.userName,
      });
      if (userByMail === null) {
        if (userByuserName === null) {
          var data = new usuariosModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            mail: req.body.mail,
            accountType: req.body.accountType,
          });
          const document = await data.save();
          resModifier.modifyRes(res, "Success", "User Created Successfully", document);
        } else {
          resModifier.modifyRes(res, "Error", "Username Already In Use");
        }
      }else{
        resModifier.modifyRes(res, "Error", "The Mail Is Already Registered");
      }
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
    }
  },
};
