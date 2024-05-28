const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

const productController = new ProductController();

router.get('/products', (req, res) => productController.getAllProducts(req, res));
router.get('/products/:productId', (req, res) => productController.getProductById(req, res));
router.post('/products', (req, res) => productController.addProduct(req, res));

module.exports = router;

