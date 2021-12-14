const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController')

router.get('/:id', productosController.getById);

module.exports = router;