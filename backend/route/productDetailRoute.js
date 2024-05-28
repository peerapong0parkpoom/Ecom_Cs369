
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const connectToMSSQLDatabase = require('../config/productDatabase');
const ProductController = require('../controllers/productController');

const productController = new ProductController();

// Middleware เพื่อเชื่อมต่อกับฐานข้อมูล
async function connectToDatabase(req, res, next) {
    try {
        const pool = await connectToMSSQLDatabase();
        req.dbPool = pool; // เก็บ pool connection ใน req เพื่อใช้ใน route ต่าง ๆ
        next();
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Server Error');
    }
}

// เส้นทางดึงรายละเอียดสินค้าตามรหัสสินค้า
router.get('/:id', connectToDatabase, async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await req.dbPool.request()
            .input('productId', sql.Int, productId)
            .query('SELECT * FROM Clothes WHERE product_id = @productId');

        const product = result.recordset[0];
        if (product) {
            res.render('productDetail', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// เส้นทางเพิ่มสินค้าใหม่
router.post('/', connectToDatabase, async (req, res) => {
    const newClothes = {
        productName: req.body.productName,
        size: req.body.size,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
    };
    try {
        await productController.addProduct(newClothes);
        res.status(201).send('เพิ่มสินค้าสำเร็จ');
    } catch (error) {
        console.error(error);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

module.exports = router;


