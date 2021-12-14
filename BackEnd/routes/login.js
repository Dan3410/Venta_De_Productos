var express = require('express');
var router = express.Router();
var usuariosController = require('../controller/usuariosController')

router.post('/', usuariosController.logUser);

module.exports = router;
