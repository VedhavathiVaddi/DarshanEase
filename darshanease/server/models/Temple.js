// TODO
const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a temple name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    contact: {
      phone: { type: String },
      email: { type: String },
    },
    facilities: [String],
    openingHours: {
      open: String,
      close: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Temple || mongoose.model('Temple', templeSchema);