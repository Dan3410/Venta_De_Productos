var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
const resModifier = require("../utils/resModifier");

/* GET users listing. */
router.post("/", (req, res) =>
  userController.registerUser(req).then(
    (result) => {
      if (result.code === 201) {
        resModifier.modifyRes(res, result.code, "User Created", result.user);
      }
      if (result.code === 452 || result.code === 453) {
        resModifier.sendClientError(res, result.code);
      }
    },
    () => resModifier.sendErrorServer(res)
  )
);

module.exports = router;
