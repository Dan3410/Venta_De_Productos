var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
const resModifier = require("../utils/resModifier");

router.post("/:username", (req, res) =>
  userController.logInUser(req).then((response) => {
    if (response.code === 200)
      resModifier.modifyRes(res, response.code, "User Found", {
        token: response.token,
      });
    if (response.code === 401 || response.code === 404)
      resModifier.sendClientError(res, response.code);
  }, () => resModifier.sendErrorServer(res))
);

module.exports = router;
