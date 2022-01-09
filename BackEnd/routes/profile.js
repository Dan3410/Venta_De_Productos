var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')

router.get('/', userController.findUserByUsername);
router.put('/', userController.updateUserData);
module.exports = router;
