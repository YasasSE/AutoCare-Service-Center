const Booking = require('../models/Booking');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public/Private
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public/Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const {
      serviceName,
      serviceNames,
      date,
      time,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      licensePlate,
      customerName,
      email,
      phone,
      address,
      notes,
    } = req.body;

    const booking = await Booking.create({
      serviceName,
      serviceNames,
      date,
      time,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      licensePlate,
      customerName,
      email,
      phone,
      address,
      notes,
      status: 'Pending',
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin only)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      await booking.deleteOne();
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookings by customer email
// @route   GET /api/bookings/customer/:email
// @access  Public
const getBookingsByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/bookings/stats/dashboard
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: 'Pending' });
    const approved = await Booking.countDocuments({ status: 'Approved' });
    const completed = await Booking.countDocuments({ status: 'Completed' });
    
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyBookings = await Booking.countDocuments({ 
      createdAt: { 
        $gte: today 
      } 
    });

    res.json({
      totalBookings,
      pending,
      approved,
      completed,
      dailyBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingsByEmail,
  getDashboardStats,
};