var express = require('express');
var router = express.Router();
var usuariosController = require('../controller/usuariosController')

/* GET users listing. */
router.post('/', usuariosController.registerUser);

module.exports = router;
