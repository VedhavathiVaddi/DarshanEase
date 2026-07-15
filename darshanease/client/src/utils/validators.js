export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function isValidPhone(value) {
  return /^[6-9]\d{9}$/.test(String(value || '').trim());
}

export function isNotEmpty(value) {
  return String(value || '').trim().length > 0;
}

export function minLength(value, length) {
  return String(value || '').trim().length >= length;
}

/**
 * Validate the login form.
 * @returns {Object} field-keyed error messages, empty object when valid
 */
export function validateLogin({ email, password }) {
  const errors = {};
  if (!isNotEmpty(email)) errors.email = 'Enter your email address.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';

  if (!isNotEmpty(password)) errors.password = 'Enter your password.';
  else if (!minLength(password, 6)) errors.password = 'Password must be at least 6 characters.';

  return errors;
}

/**
 * Validate the registration form.
 */
export function validateRegister({ name, email, phone, password, confirmPassword }) {
  const errors = {};
  if (!isNotEmpty(name)) errors.name = 'Enter your full name.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (!minLength(password, 6)) errors.password = 'Password must be at least 6 characters.';
  if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

/**
 * Validate the booking form (devotee details + slot selection).
 */
export function validateBooking({ visitorName, phone, date, timeSlot, darshanType, quantity }) {
  const errors = {};
  if (!isNotEmpty(visitorName)) errors.visitorName = 'Enter the lead visitor name.';
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (!isNotEmpty(date)) errors.date = 'Choose a darshan date.';
  else if (new Date(date) < new Date(new Date().toDateString())) {
    errors.date = 'Choose today or a future date.';
  }
  if (!isNotEmpty(timeSlot)) errors.timeSlot = 'Choose a time slot.';
  if (!isNotEmpty(darshanType)) errors.darshanType = 'Choose a darshan type.';
  if (!quantity || quantity < 1 || quantity > 10) {
    errors.quantity = 'Enter a quantity between 1 and 10.';
  }
  return errors;
}

/**
 * Validate the payment form (mock — card fields only).
 */
export function validatePayment({ cardName, cardNumber, expiry, cvv }) {
  const errors = {};
  if (!isNotEmpty(cardName)) errors.cardName = 'Enter the name on card.';
  if (!/^\d{16}$/.test(String(cardNumber || '').replace(/\s/g, ''))) {
    errors.cardNumber = 'Enter a valid 16-digit card number.';
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(String(expiry || '').trim())) {
    errors.expiry = 'Use MM/YY format.';
  }
  if (!/^\d{3,4}$/.test(String(cvv || '').trim())) {
    errors.cvv = 'Enter a valid CVV.';
  }
  return errors;
}
