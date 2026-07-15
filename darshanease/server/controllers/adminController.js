// TODO
const User = require('../models/User');
const Temple = require('../models/Temple');
const Booking = require('../models/Booking');
const { sendResponse } = require('../utils/sendResponse');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTemples = await Temple.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const revenue = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    sendResponse(res, 200, {
      totalUsers,
      totalTemples,
      totalBookings,
      confirmedBookings,
      revenue: revenue.length > 0 ? revenue[0].total : 0,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/admin/bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('temple', 'name')
      .populate('timeSlot')
      .sort({ createdAt: -1 });
    sendResponse(res, 200, bookings);
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking status (admin)
// @route   PUT /api/admin/bookings/:id
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return sendError(res, 404, 'Booking not found');
    }
    booking.status = status;
    await booking.save();
    sendResponse(res, 200, booking, 'Booking status updated');
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    sendResponse(res, 200, users);
  } catch (err) {
    next(err);
  }
};