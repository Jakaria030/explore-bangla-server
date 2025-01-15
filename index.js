const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./dbConfig/dbConfig');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');


// Load environment variables
dotenv.config();


// Connect to MongoDB
connectDB();

// Create express app
const app = express();


// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use(userRoutes);
app.use(packageRoutes);


// Base route message
app.get('/', (req, res) => {
    res.send('Welcome to "Explore Bangla" server.');
});


// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send({message: 'Resource not Found.'});
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});