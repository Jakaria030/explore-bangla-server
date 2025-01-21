const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { connectDB } = require('./dbConfig/dbConfig');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const storyRoutes = require('./routes/storyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


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
app.use(applicationRoutes);
app.use(storyRoutes);
app.use(bookingRoutes);


// payment intent
app.post('/create-payment-intent', async (req, res) => {
    
    const { price } = req.body;
    const amount = parseInt(price * 100);

    const paymentInent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });

    res.send({
        clientSecret: paymentInent.client_secret
    });
    
});

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