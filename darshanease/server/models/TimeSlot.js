const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Temple',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // e.g., "09:00"
      required: true,
    },
    endTime: {
      type: String, // e.g., "10:00"
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    bookedCount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique slot per temple per date/time
timeSlotSchema.index({ temple: 1, date: 1, startTime: 1, endTime: 1 }, { unique: true });

module.exports = mongoose.models.TimeSlot || mongoose.model('TimeSlot', timeSlotSchema);