const tokenFunctions = require("./tokenFunctions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  findUsernameService,
  findMailService,
  createUserService,
} = require("../services/users/userServices");

module.exports = {
  logInUser: async function (req, res, next) {
    const user = findUsernameService(req.params.username);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          { id: user._id, username: user.username },
          req.app.get("secretKey"),
          {
            expiresIn: "1h",
          }
        );
        return { code: 200, token: token };
      } else {
        return { code: 401, token: null };
      }
    } else {
      return { code: 404, token: null };
    }
  },
  findUserByUsername: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    const user = findUsernameService(tokenDecoded.username);
    if (user) {
      return { code: 200, user: user };
    } else {
      return { code: 404, user: null };
    }
  },

  updateUserData: async function (req, res, next) {
    const token = tokenFunctions.extractToken(req);
    const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
    const user = findUsernameService(tokenDecoded.username);
    if (user) {
      let newData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      if (req.body.password !== undefined) {
        let newPassword = bcrypt.hashSync(req.body.password, 10);
        newData.password = newPassword;
      }
      await updateUserService(tokenDecoded.username, newData);
      return { code: 200, user: newData };
    } else {
      return { code: 404, user: null };
    }
  },

  registerUser: async function (req, res, next) {
    const userByMail = findMailService(req.body.mail);
    const userByUsername = findUsernameService(req.body.username);
    if (userByMail === null) {
      if (userByUsername === null) {
        const user = createUserService({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: req.body.password,
          mail: req.body.mail,
          accountType: req.body.accountType,
        });

        return { code: 201, user: user };
      } else {
        //Ya hay un usuario con dicho username
        return { code: 452, user: null };
      }
    } else {
      // Ya hay un usuario con dicho mail
      return { code: 453, user: null };
    }
  },
};
