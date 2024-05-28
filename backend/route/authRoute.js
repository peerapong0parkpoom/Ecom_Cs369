const express = require('express');
const router = express.Router();
// const {getAllProducts, getProductById, addProduct } = require('../controllers/productController');
const ProductController = require('../controllers/productController');
const productController = new ProductController();


router.get('/products', (req, res) => productController.getAllProducts(req, res));
router.get('/products/:productId', (req, res) => productController.getProductById(req, res));
router.post('/products', (req, res) => productController.addProduct(req, res));

// router.get('/products', getAllProducts);
// router.get('/products/:productId', getProductById);
// router.post('/products',  addProduct);

module.exports = router;

