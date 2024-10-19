const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Define routes
app.get('/', (req, res) => res.send('Weather Summary App'));

// Use the PORT from the .env file, default to 5000 if not set
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
