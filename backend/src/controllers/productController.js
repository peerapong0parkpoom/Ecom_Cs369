const ClothesModel = require('../models/clothesModel');

class ProductController {
  constructor() {
    this.clothesModel = new ClothesModel({
      server: 'DESKTOP-PP321HB',
      user: 'sa',
      password: 'P@ssw0rd',
      database: 'PRODUCT',
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
          encrypt: true, // For Azure
          trustServerCertificate: true
      }
    });
  }

  async getAllProducts(req, res) {
    try {
      const clothes = await this.clothesModel.getAllClothes();
      res.json(clothes);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

  async getProductById(req, res) {
    const productId = parseInt(req.params.productId, 10);
    try {
      const clothes = await this.clothesModel.getClothesById(productId);
      if (!clothes) {
        res.status(404).send('Product not found');
        return;
      }
      res.json(clothes);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

  async addProduct(req, res) {
    const newClothes = {
      productName: req.body.productName,
      size: req.body.size,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };
    try {
      await this.clothesModel.addClothes(newClothes);
      res.status(201).send('Successfully added products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
}

module.exports = ProductController;

