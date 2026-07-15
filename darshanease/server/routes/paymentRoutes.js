// TODO
const express = require('express');
const { createOrder, verifyPayment, getPaymentStatus } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/:bookingId', getPaymentStatus);

module.exports = router;