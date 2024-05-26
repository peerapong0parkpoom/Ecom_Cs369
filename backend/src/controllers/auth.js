const dbconfig = require('../config/database');
const sql = require('mssql');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, date_of_birth } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const pool = await sql.connect(dbconfig);

        // Check if the user already exists
        const checkUserQuery = `
            SELECT * FROM Users WHERE username = @username OR email = @email
        `;
        const checkUserResult = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query(checkUserQuery);

        if (checkUserResult.recordset.length > 0) {
            return res.status(400).json({ success: false, message: 'It seems you already have an account, please log in instead.' });
        }

        // Define SQL query for inserting a new user
        const query = `
            INSERT INTO Users (username, first_name, last_name, email, password, date_of_birth)
            VALUES (@username, @first_name, @last_name, @email, @password, @date_of_birth)
        `;

        // Execute the query with parameters
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('first_name', sql.VarChar, first_name)
            .input('last_name', sql.VarChar, last_name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .input('date_of_birth', sql.Date, new Date(date_of_birth))
            .query(query);

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// //@desc     Login user
// //@route    POST /api/v1/auth/login
// //@access   Public
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ success: false, error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: 'Server error' });
            }
            return res.status(200).json({ success: true, data: user });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Server error' });
        }
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
};