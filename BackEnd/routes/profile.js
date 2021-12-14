var express = require('express');
var router = express.Router();
var usuariosController = require('../controller/usuariosController')

router.get('/:userName/:token', usuariosController.findUserByUsername);
router.post('/', usuariosController.updateUserData);
module.exports = router;
