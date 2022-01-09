var express = require('express');
var router = express.Router();
var productController = require('../controller/productController')

router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.post('/', productController.createProduct)

module.exports = router;