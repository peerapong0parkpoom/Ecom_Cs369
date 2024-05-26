const express = require('express');
const router = express.Router();
const { detail, add, home, index } = require('../controllers/product');
const middleware = require('../middleware/middleware'); // Adjust the path to your middleware if needed

// Define routes and map them to controller functions
// router.get('/detail', middleware.isLoggedIn, detail); // Middleware example to check if logged in
// router.post('/add', middleware.isLoggedIn, add); // Middleware example to check if logged in
// router.get('/home', middleware.isLoggedIn, home); // Middleware example to check if logged in
// router.get('/', index); // No login required

module.exports = router;
