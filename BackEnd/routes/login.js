var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')

router.post('/:username', userController.logInUser);

module.exports = router;
