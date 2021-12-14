const usuariosModel = require("../models/usuariosModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productosModel = require("../models/productosModel");
module.exports = {
  logUser: async function (req, res, next) {
    try {
      const user = await usuariosModel.findOne({ userName: req.body.userName });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ id: user._id }, req.app.get("secretKey"), {
            expiresIn: "1h",
          });
          res.json({
            status: "success",
            message: "user found",
            data: { user: user, token: token },
          });
        } else {
          res.json({
            status: "Error",
            message: "Invalid user/password",
            data: null,
          });
        }
      } else {
        res.json({
          status: "Error",
          message: "user not found",
          data: null,
        });
      }
    } catch (e) {
      console.log("Error: ", e)
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
          res.json({
            status: "success",
            message: "User Found",
            data: { user: user },
          });
        } catch (e) {
          res.json({
            status: "Error",
            message: "Invalid Token",
            data: null,
          });
        }
      } else {
        res.json({
          status: "Error",
          message: "user not found",
          data: null,
        });
      }
    } catch (e) {
      console.log("Error: ",e)
      next(e);
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
      res.json({
        status: "Error",
        message: "User Not Found",
        data: null,
      });
      return
    }
    if (user) {
      try {
        const decoded = jwt.verify(req.body.token, req.app.get("secretKey"));
      } catch (e) {
        res.json({
          status: "Error",
          message: "Invalid Token",
          data: null,
        });
        return
      }
      try{
      let newData = {firstName : req.body.firstName, lastName : req.body.lastName}
      if (req.body.password !== undefined){
        let newPassword = bcrypt.hashSync(req.body.password, 10);
        newData.password = newPassword;
      }  
      await usuariosModel.updateOne({userName: req.body.userName}, newData)
        res.json({
          status: "Success",
          message: "User Data Updated",
          data: { user: newData },
        });
    } catch (e){
      res.json({
        status: "Error",
        message: "Error al actualizar",
        data: null,
      });
      return
    }
  }},
  register: async function (req, res, next) {
    try {
      var data = new usuariosModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
      });
      const document = await data.save();
      res.json({
        status: "Success",
        message: "User Created Successfully",
        data: document,
      });
    } catch (e) {
      console.log("Error: ", e)
      next(e);
    }
  },
};
