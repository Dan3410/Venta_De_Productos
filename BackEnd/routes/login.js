var express = require('express');
var router = express.Router();
var usuariosController = require('../controller/usuariosController')

router.post('/:username', usuariosController.logInUser);

module.exports = router;
