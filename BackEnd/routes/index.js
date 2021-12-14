const express = require('express');
const router = express.Router();
const productosController = require('../controller/productosController');

router.get('/products', productosController.getAll);

router.post('/',productosController.create)
router.put('/:id',productosController.update)
router.delete('/:id',productosController.delete)

module.exports = router;