// TODO
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const paymentService = require('../services/paymentService');
const { sendResponse, sendError } = require('../utils/sendResponse');

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
exports.createOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return sendError(res, 404, 'Booking not found');
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, 'Not authorized');
    }

    if (booking.status !== 'pending') {
      return sendError(res, 400, 'Booking is not pending');
    }

    // Check if payment already created
    let payment = await Payment.findOne({ booking: bookingId });
    if (payment && payment.status === 'created') {
      // Return existing order
      return sendResponse(res, 200, {
        orderId: payment.razorpayOrderId,
        amount: payment.amount,
        currency: payment.currency,
        bookingId: booking._id,
      }, 'Order already created');
    }

    // Create new order
    const order = await paymentService.createRazorpayOrder(booking.totalAmount, 'INR');

    // Save payment record
    payment = await Payment.create({
      booking: booking._id,
      razorpayOrderId: order.id,
      amount: booking.totalAmount,
      currency: 'INR',
      status: 'created',
    });

    sendResponse(res, 200, {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      bookingId: booking._id,
    }, 'Order created');
  } catch (err) {
    next(err);
  }
};

// @desc    Verify payment and confirm booking
// @route   POST /api/payments/verify
exports.verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, bookingId } = req.body;

    // Verify signature
    const isValid = paymentService.verifySignature(orderId, paymentId, signature);
    if (!isValid) {
      return sendError(res, 400, 'Invalid payment signature');
    }

    // Find payment record
    const payment = await Payment.findOne({ razorpayOrderId: orderId });
    if (!payment) {
      return sendError(res, 404, 'Payment not found');
    }

    // Update payment
    payment.razorpayPaymentId = paymentId;
    payment.razorpaySignature = signature;
    payment.status = 'captured';
    await payment.save();

    // Update booking status
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return sendError(res, 404, 'Booking not found');
    }

    booking.status = 'confirmed';
    booking.paymentId = payment._id;
    await booking.save();

    // Optionally send confirmation email (emailService)

    sendResponse(res, 200, {
      bookingId: booking._id,
      status: booking.status,
    }, 'Payment verified and booking confirmed');
  } catch (err) {
    next(err);
  }
};

// @desc    Get payment status
// @route   GET /api/payments/:bookingId
exports.getPaymentStatus = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({ booking: req.params.bookingId });
    if (!payment) {
      return sendError(res, 404, 'Payment not found');
    }
    sendResponse(res, 200, payment);
  } catch (err) {
    next(err);
  }
};