// TODO
const TimeSlot = require('../models/TimeSlot');

// Check if slot has enough capacity
exports.checkAvailability = async (slot, numberOfPeople) => {
  const available = slot.capacity - slot.bookedCount;
  return available >= numberOfPeople;
};

// Reserve slot (increment bookedCount)
exports.reserveSlot = async (slot, numberOfPeople) => {
  slot.bookedCount += numberOfPeople;
  await slot.save();
  return slot;
};

// Release slot (decrement bookedCount)
exports.releaseSlot = async (slot, numberOfPeople) => {
  slot.bookedCount = Math.max(0, slot.bookedCount - numberOfPeople);
  await slot.save();
  return slot;
};