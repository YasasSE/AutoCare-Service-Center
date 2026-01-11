const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingsByEmail,
  getDashboardStats,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Dashboard stats route (must be before /:id route)
router.get('/stats/dashboard', protect, getDashboardStats);

// Customer bookings route (must be before /:id route)
router.get('/customer/:email', getBookingsByEmail);

// Main routes
router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBookingById)
  .delete(protect, deleteBooking);

router.route('/:id/status')
  .put(protect, updateBookingStatus);

module.exports = router;