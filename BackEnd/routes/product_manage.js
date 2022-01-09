var express = require('express');
var router = express.Router();
var productosController = require('../controller/productosController')

router.delete('/:id', productosController.deleteProduct);
router.put('/:id', productosController.updateProduct);
router.post('/', productosController.createProduct)

module.exports = router;