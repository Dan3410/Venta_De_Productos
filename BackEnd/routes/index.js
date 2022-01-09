const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController');

router.get('/products', productosController.getAllProducts);

module.exports = router;