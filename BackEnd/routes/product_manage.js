var express = require('express');
var router = express.Router();
var productosController = require('../controller/productosController')

router.delete('/:id', productosController.delete);
router.put('/:id', productosController.update);
router.post('/', productosController.create)

module.exports = router;