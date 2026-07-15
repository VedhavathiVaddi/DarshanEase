// TODO
const Booking = require('../models/Booking');
const TimeSlot = require('../models/TimeSlot');
const Temple = require('../models/Temple');
const { sendResponse, sendError } = require('../utils/sendResponse');
const bookingService = require('../services/bookingService');

// @desc    Create a booking (user)
// @route   POST /api/bookings
exports.createBooking = async (req, res, next) => {
  try {
    const { timeSlotId, numberOfPeople, specialRequests } = req.body;

    // Check slot exists
    const slot = await TimeSlot.findById(timeSlotId);
    if (!slot) {
      return sendError(res, 404, 'Time slot not found');
    }

    // Check availability
    const available = await bookingService.checkAvailability(slot, numberOfPeople);
    if (!available) {
      return sendError(res, 400, 'Not enough capacity for this slot');
    }

    // Check if user already has a booking for this slot (optional)
    const existing = await Booking.findOne({ user: req.user._id, timeSlot: timeSlotId, status: { $ne: 'cancelled' } });
    if (existing) {
      return sendError(res, 400, 'You already have a booking for this slot');
    }

    // Calculate total amount
    const totalAmount = slot.price * numberOfPeople;

    // Create booking with pending status
    const booking = await Booking.create({
      user: req.user._id,
      temple: slot.temple,
      timeSlot: timeSlotId,
      numberOfPeople,
      totalAmount,
      specialRequests,
      status: 'pending',
    });

    // Reserve the slot (decrement capacity)
    await bookingService.reserveSlot(slot, numberOfPeople);

    sendResponse(res, 201, booking, 'Booking created, proceed to payment');
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings/my-bookings
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('temple', 'name location')
      .populate('timeSlot')
      .sort({ createdAt: -1 });
    sendResponse(res, 200, bookings);
  } catch (err) {
    next(err);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('temple')
      .populate('timeSlot')
      .populate('user', 'name email phone');
    if (!booking) {
      return sendError(res, 404, 'Booking not found');
    }
    // Check if user owns booking or admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 403, 'Not authorized');
    }
    sendResponse(res, 200, booking);
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return sendError(res, 404, 'Booking not found');
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 403, 'Not authorized');
    }

    if (booking.status === 'confirmed' || booking.status === 'pending') {
      // Release slot
      const slot = await TimeSlot.findById(booking.timeSlot);
      if (slot) {
        slot.bookedCount = Math.max(0, slot.bookedCount - booking.numberOfPeople);
        await slot.save();
      }
      booking.status = 'cancelled';
      await booking.save();
      sendResponse(res, 200, booking, 'Booking cancelled');
    } else {
      sendError(res, 400, 'Booking cannot be cancelled in its current status');
    }
  } catch (err) {
    next(err);
  }
};