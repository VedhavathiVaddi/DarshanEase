import { STORAGE_KEYS, BOOKING_STATUS } from '../utils/constants';
import { generateBookingId, sleep } from '../utils/helpers';

// Mock persistence layer — swap for real API calls (POST /api/bookings, etc.)
// once a backend exists. Shapes are kept API-realistic on purpose.

function readBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
}

function writeBookings(bookings) {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

export async function createBooking(userId, bookingDraft) {
  await sleep(400);
  const bookings = readBookings();
  const booking = {
    id: generateBookingId(),
    userId,
    status: BOOKING_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    ...bookingDraft,
  };
  bookings.push(booking);
  writeBookings(bookings);
  return booking;
}

export async function confirmBooking(bookingId) {
  await sleep(200);
  const bookings = readBookings();
  const idx = bookings.findIndex((b) => b.id === bookingId);
  if (idx === -1) throw new Error('Booking not found.');
  bookings[idx].status = BOOKING_STATUS.CONFIRMED;
  writeBookings(bookings);
  return bookings[idx];
}

export async function getBookingsForUser(userId) {
  await sleep(300);
  return readBookings()
    .filter((b) => b.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getBookingById(bookingId) {
  await sleep(200);
  const booking = readBookings().find((b) => b.id === bookingId);
  if (!booking) throw new Error('Booking not found.');
  return booking;
}

export async function cancelBooking(bookingId) {
  await sleep(300);
  const bookings = readBookings();
  const idx = bookings.findIndex((b) => b.id === bookingId);
  if (idx === -1) throw new Error('Booking not found.');
  bookings[idx].status = BOOKING_STATUS.CANCELLED;
  writeBookings(bookings);
  return bookings[idx];
}
