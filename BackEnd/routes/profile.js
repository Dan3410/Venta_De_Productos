var express = require('express');
var router = express.Router();
var usuariosController = require('../controller/usuariosController')

router.get('/', usuariosController.findUserByUsername);
router.put('/', usuariosController.updateUserData);
module.exports = router;
