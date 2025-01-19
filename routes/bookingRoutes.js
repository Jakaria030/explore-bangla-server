const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postBooking, getBookingDetails } = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', verifyToken, verifyTourist, postBooking);
router.get('/bookings/booking-details', verifyToken, verifyTourist, getBookingDetails);

module.exports = router;