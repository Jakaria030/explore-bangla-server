const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postBooking, getBookingDetails, deleteBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', verifyToken, verifyTourist, postBooking);
router.get('/bookings/booking-details', verifyToken, verifyTourist, getBookingDetails);
router.delete('/bookings/delete-booking', verifyToken, verifyTourist, deleteBooking);

module.exports = router;