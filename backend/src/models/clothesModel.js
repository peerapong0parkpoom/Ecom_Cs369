
const mssql = require('mssql');

class ClothesModel {
  constructor(config) {
    this.config = config;
  }

  async getAllClothes() {
    try {
      const pool = await new mssql.ConnectionPool(this.config).connect();
      const result = await pool.request().query('SELECT * FROM Clothes');
      return result.recordset;
    } catch (error) {
      console.error('Error retrieving all clothes:', error);
      throw error;
    }
  }

  async getClothesById(productId) {
    try {
      const pool = await new mssql.ConnectionPool(this.config).connect();
      const result = await pool
        .request()
        .input('productId', mssql.Int, productId)
        .query('SELECT * FROM Clothes WHERE product_id = @productId');

      return result.recordset[0]; 
    } catch (error) {
      console.error('Error retrieving clothes by ID:', error);
      throw error;
    }
  }

  async addClothes(clothes) {
    try {
      const pool = await new mssql.ConnectionPool(this.config).connect();
      const request = pool.request()
        .input('productName', mssql.NVarChar, clothes.productName)
        .input('size', mssql.NVarChar, clothes.size)
        .input('price', mssql.Decimal, clothes.price)
        .input('imageUrl', mssql.NVarChar, clothes.imageUrl);

      await request.query(`
        INSERT INTO Clothes (product_name, size, price, image_url)
        VALUES (@productName, @size, @price, @imageUrl)
      `);
    } catch (error) {
      console.error('Error adding clothes:', error);
      throw error;
    }
  }
}

module.exports = ClothesModel;
