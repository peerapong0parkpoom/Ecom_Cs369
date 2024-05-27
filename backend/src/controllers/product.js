const dbconfig = require('../config/database');
const sql = require('mssql');

// Controller to handle product detail
exports.detail = async (req, res) => {
    try {
        const productId = req.query.id; // Assuming product ID is passed as a query parameter
        const pool = req.pool;
        const result = await pool.request()
            .input('id', sql.Int, productId)
            .query('SELECT * FROM Products WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: result.recordset[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Controller to handle adding a product
exports.add = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const pool = req.pool;
        const query = `
            INSERT INTO Products (name, description, price)
            VALUES (@name, @description, @price)
        `;
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('price', sql.Decimal, price)
            .query(query);

        res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Controller to handle displaying the home page for logged-in users
exports.home = async (req, res) => {
    try {
        const pool = req.pool;
        const result = await pool.request()
            .query('SELECT * FROM Products');

        res.status(200).json({ success: true, data: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Controller to handle displaying the index page for all users
exports.index = async (req, res) => {
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request()
            .query('SELECT * FROM Products');

        res.status(200).json({ success: true, data: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
