const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const Product = require('../models/product');

router.get('/', productController.get_all_products);

router.get('/:productId', productController.get_product);

router.post('/', productController.add_product);

router.put('/:productId', productController.update_product);

router.delete('/:productId', productController.delete_product);


module.exports = router;