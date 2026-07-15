// TODO
const express = require('express');
const {
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
  addTimeSlot,
  getTimeSlots,
} = require('../controllers/templeController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadMultiple } = require('../middleware/uploadMiddleware');
const { templeValidation, timeSlotValidation, validate } = require('../utils/validators');

const router = express.Router();

// Public routes
router.get('/', getAllTemples);
router.get('/:id', getTempleById);
router.get('/:id/slots', getTimeSlots);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, uploadMultiple, templeValidation, validate, createTemple);
router.put('/:id', authMiddleware, adminMiddleware, uploadMultiple, updateTemple);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTemple);
router.post('/:id/slots', authMiddleware, adminMiddleware, timeSlotValidation, validate, addTimeSlot);

module.exports = router;