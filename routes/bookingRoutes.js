const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', verifyToken, verifyTourist, postBooking);

module.exports = router;