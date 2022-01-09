const resModifier = require("./resModifier");
const usuariosModel = require("../models/usuariosModel");
const tokenFunctions = require("./tokenFunctions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  logInUser: async function (req, res, next) {
    try {
      const user = await usuariosModel.findOne({
        username: req.params.username,
      });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            { id: user._id, username: user.username },
            req.app.get("secretKey"),
            {
              expiresIn: "1h",
            }
          );
          resModifier.modifyRes(res, "Success", "User Found", {
            user: user,
            token: token,
          });
        } else {
          resModifier.modifyRes(res, "Error", "Contraseña invalida", null);
        }
      } else {
        resModifier.modifyRes(res, "Error", "Usuario no encontrado", null);
      }
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al ingresar: " + e.message,
        null
      );
      next(e);
    }
  },
  findUserByUsername: async function (req, res, next) {
    try {
      const token = tokenFunctions.extractToken(req);
      const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
      const user = await usuariosModel.findOne({
        username: tokenDecoded.username,
      });
      if (user) {
        resModifier.modifyRes(res, "Success", "Usuario encontrado", {
          user: user,
        });
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (e) {
      resModifier.modifyRes(res, "Error", e.message, null);
    }
  },
  updateUserData: async function (req, res, next) {
    try {
      const token = tokenFunctions.extractToken(req);
      const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
      const user = await usuariosModel.findOne({
        username: tokenDecoded.username,
      });
      if (user) {
        let newData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };
        if (req.body.password !== undefined) {
          let newPassword = bcrypt.hashSync(req.body.password, 10);
          newData.password = newPassword;
        }
        await usuariosModel.updateOne(
          { username: tokenDecoded.username },
          newData
        );
        resModifier.modifyRes(res, "Success", "User Data Updated", {
          user: newData,
        });
      } else {
        throw new Error("User Not Found");
      }
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al Actualizar: " + e.message,
        null
      );
      return;
    }
  },
  registerUser: async function (req, res, next) {
    try {
      const userByMail = await usuariosModel.findOne({ mail: req.body.mail });
      const userByUsername = await usuariosModel.findOne({
        username: req.body.username,
      });
      if (userByMail === null) {
        if (userByUsername === null) {
          var data = new usuariosModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            mail: req.body.mail,
            accountType: req.body.accountType,
          });
          const document = await data.save();
          resModifier.modifyRes(
            res,
            "Success",
            "User Created Successfully",
            document
          );
        } else {
          throw new Error("El nombre de usuario ya esta en uso");
        }
      } else {
        throw new Error("Ya hay una cuenta con dicho mail");
      }
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al registrarse: " + e.message,
        null
      );
    }
  },
};
