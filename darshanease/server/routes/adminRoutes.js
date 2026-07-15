// TODO
const express = require('express');
const {
  getStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get('/stats', getStats);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);
router.get('/users', getAllUsers);

module.exports = router;