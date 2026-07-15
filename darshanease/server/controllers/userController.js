// TODO
const User = require('../models/User');
const { sendResponse, sendError } = require('../utils/sendResponse');

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    const { name, phone, address } = req.body;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    // If image upload, handle via multer - we'll use a separate route for image
    // but here we just update text fields.

    const updatedUser = await user.save();
    sendResponse(res, 200, {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      profileImage: updatedUser.profileImage,
    }, 'Profile updated');
  } catch (err) {
    next(err);
  }
};

// @desc    Upload profile image
// @route   POST /api/users/upload-image
exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'No image uploaded');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    user.profileImage = req.file.path; // Cloudinary URL
    await user.save();

    sendResponse(res, 200, { profileImage: user.profileImage }, 'Image uploaded');
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    sendResponse(res, 200, users);
  } catch (err) {
    next(err);
  }
};