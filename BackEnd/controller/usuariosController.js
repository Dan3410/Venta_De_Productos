const usuariosModel = require("../models/usuariosModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function modifyRes(res, status, message, data){
  res.json({
    status: status,
    message: message,
    data: data
  })
}

module.exports = {
  logUser: async function (req, res, next) {
    try {
      const user = await usuariosModel.findOne({ userName: req.body.userName });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ id: user._id }, req.app.get("secretKey"), {
            expiresIn: "1h",
          });
          modifyRes(res,"Success","User Found",{user:user, token:token})
        } else {
          modifyRes(res,"Error","Invalid user/password",null)
        }
      } else {
        modifyRes(res,"Error","User Not Found",null)
      }
    } catch (e) {
      modifyRes(res,"Error",e.message,null)
      next(e)
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
          modifyRes(res,"Success","userFound",{user:user})
        } catch (e) {
          modifyRes(res,"Error","Invalid Token",null)
          next(e)
        }
      } else {
        modifyRes(res,"Error","User Not Found",null)
      }
    } catch (e) {
      modifyRes(res,"Error",e.message,null)
      next(e)
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
      modifyRes(res,"Error",e.message,null)
      next(e)
    }
    if (user) {
      try {
        const decoded = jwt.verify(req.body.token, req.app.get("secretKey"));
      } catch (e) {
        modifyRes(res,"Error","Invalid Token",null)
        next(e)
        return
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
        modifyRes(res,"Success","User Data Updated",{user:newData})
      } catch (e) {
        modifyRes(res,"Error","Error al Actualizar",null)
        next(e)
      }
    }else{
      modifyRes(res,"Error","User Not Found",null)
    }
  },
  register: async function (req, res, next) {
    try {
      var data = new usuariosModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        accountType: req.body.accountType,
      });
      console.log(data);
      const document = await data.save();
      modifyRes(res,"Success","User Created Successfully",document)
    } catch (e) {
      modifyRes(res,"Error",e.message,null)
      next(e);
    }
  },
};
