const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/route/auth'); // Adjust the path to your auth routes
const productRoutes = require('./src/route/product'); // Adjust the path to your product routes
const passport = require('./src/config/passport'); // Adjust the path to your passport configuration
const middleware = require('./src/middleware/middleware'); // Adjust the path to your middleware
const connectToDatabase = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to database
connectToDatabase();

// CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Initialize Passport and session middleware
middleware(app);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(4000, ()=>{
    console.log('Server running at http://localhost:4000')
})