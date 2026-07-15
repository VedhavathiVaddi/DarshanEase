// TODO
const { body, validationResult } = require('express-validator');

// Register validation rules
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone number is required'),
];

// Login validation
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Temple validation
const templeValidation = [
  body('name').notEmpty().withMessage('Temple name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('location.address').notEmpty().withMessage('Address is required'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('location.state').notEmpty().withMessage('State is required'),
];

// TimeSlot validation
const timeSlotValidation = [
  body('date').isISO8601().withMessage('Valid date required'),
  body('startTime').notEmpty().withMessage('Start time required'),
  body('endTime').notEmpty().withMessage('End time required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  templeValidation,
  timeSlotValidation,
  validate,
};