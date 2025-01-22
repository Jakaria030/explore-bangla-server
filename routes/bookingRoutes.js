const express = require('express');
const { verifyToken, verifyTourist, verifyTourGuide, verifyAdmin } = require('../middlewares/authMiddlewares');
const { postBooking, getBookingDetails, deleteBooking, getBookingDetailsForTourGuide, getSingleBooking, updateBooking, countAllForDashboard, getBookingCounts,  } = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', verifyToken, verifyTourist, postBooking);
router.get('/bookings/booking-details', verifyToken, verifyTourist, getBookingDetails);
router.delete('/bookings/delete-booking', verifyToken, verifyTourist, deleteBooking);
router.get('/bookings/booking-details-for-tour-guide', verifyToken, verifyTourGuide, getBookingDetailsForTourGuide);
router.get('/bookings/get-single-booking/:id', verifyToken, verifyTourist, getSingleBooking);
router.patch('/bookings/update-booking/:id', updateBooking);

router.get('/dashboard/count-all', verifyToken, verifyAdmin, countAllForDashboard);
router.get('/bookings/counts', verifyToken, verifyTourist, getBookingCounts);

module.exports = router;