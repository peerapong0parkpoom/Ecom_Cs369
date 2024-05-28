const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./route/authRoute'); 
const connectToMSSQLDatabase = require('./config/productDatabase'); 


const app = express();
const PORT = process.env.PORT || 4000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Connect to MSSQL database
connectToMSSQLDatabase()
 

// Routes
app.use('/api', authRoute); 


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// Start the server
app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});


