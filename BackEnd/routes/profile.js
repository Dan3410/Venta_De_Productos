var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
const resModifier = require("../utils/resModifier");

router.get("/", (req, res) =>
  userController.findUserByUsername(req).then(
    (result) => {console.log(result)
      if (result.code === 200)
        resModifier.modifyRes(res, result.code, "User found", {
          user: result.user,
        });
      if (result.code === 400) resModifier.sendClientError(res,400);
    },

    (error) => {console.log(error); resModifier.sendErrorServer(res)}
  )
);
router.put("/", (req, res) =>
  userController.updateUserData(req).then(
    (result) => {
      if (result.code === 200)
        resModifier.modifyRes(res, result.code, "User Data Updated", {
          user: result.user,
        });
      if (result.code === 404) resModifier.sendClientError(res,404);
    },
    () => resModifier.sendErrorServer(res)
  )
);
module.exports = router;
