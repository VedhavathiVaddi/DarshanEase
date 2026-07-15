// TODO
const Temple = require('../models/Temple');
const TimeSlot = require('../models/TimeSlot');
const { sendResponse, sendError } = require('../utils/sendResponse');

// @desc    Create a temple (admin only)
// @route   POST /api/temples
exports.createTemple = async (req, res, next) => {
  try {
    const { name, description, location, contact, facilities, openingHours } = req.body;

    // Images from uploaded files (if any)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }

    const temple = await Temple.create({
      name,
      description,
      location,
      contact,
      facilities: facilities ? facilities.split(',') : [],
      openingHours,
      images,
      createdBy: req.user._id,
    });

    sendResponse(res, 201, temple, 'Temple created');
  } catch (err) {
    next(err);
  }
};

// @desc    Get all temples (public)
// @route   GET /api/temples
exports.getAllTemples = async (req, res, next) => {
  try {
    const temples = await Temple.find({ isActive: true });
    sendResponse(res, 200, temples);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single temple by ID
// @route   GET /api/temples/:id
exports.getTempleById = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return sendError(res, 404, 'Temple not found');
    }
    sendResponse(res, 200, temple);
  } catch (err) {
    next(err);
  }
};

// @desc    Update temple (admin only)
// @route   PUT /api/temples/:id
exports.updateTemple = async (req, res, next) => {
  try {
    let temple = await Temple.findById(req.params.id);
    if (!temple) {
      return sendError(res, 404, 'Temple not found');
    }

    // Only admin who created it or super admin can update
    if (temple.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 403, 'Not authorized to update this temple');
    }

    const { name, description, location, contact, facilities, openingHours, isActive } = req.body;

    temple.name = name || temple.name;
    temple.description = description || temple.description;
    temple.location = location || temple.location;
    temple.contact = contact || temple.contact;
    temple.facilities = facilities ? facilities.split(',') : temple.facilities;
    temple.openingHours = openingHours || temple.openingHours;
    if (isActive !== undefined) temple.isActive = isActive;

    // If new images uploaded, append
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      temple.images = temple.images.concat(newImages);
    }

    await temple.save();
    sendResponse(res, 200, temple, 'Temple updated');
  } catch (err) {
    next(err);
  }
};

// @desc    Delete temple (admin only)
// @route   DELETE /api/temples/:id
exports.deleteTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return sendError(res, 404, 'Temple not found');
    }

    if (temple.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 403, 'Not authorized');
    }

    await temple.remove();
    sendResponse(res, 200, null, 'Temple deleted');
  } catch (err) {
    next(err);
  }
};

// ---------- TIME SLOTS ----------
// @desc    Add time slot to temple (admin only)
// @route   POST /api/temples/:id/slots
exports.addTimeSlot = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return sendError(res, 404, 'Temple not found');
    }

    // Authorization check
    if (temple.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 403, 'Not authorized');
    }

    const { date, startTime, endTime, capacity, price } = req.body;

    const slot = await TimeSlot.create({
      temple: temple._id,
      date,
      startTime,
      endTime,
      capacity,
      price,
    });

    sendResponse(res, 201, slot, 'Time slot added');
  } catch (err) {
    next(err);
  }
};

// @desc    Get all time slots for a temple
// @route   GET /api/temples/:id/slots
exports.getTimeSlots = async (req, res, next) => {
  try {
    const slots = await TimeSlot.find({ temple: req.params.id });
    sendResponse(res, 200, slots);
  } catch (err) {
    next(err);
  }
};