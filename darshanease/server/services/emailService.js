// TODO
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send booking confirmation email
exports.sendBookingConfirmation = async (to, bookingDetails) => {
  const { name, templeName, date, time, totalAmount } = bookingDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Confirmation - Temple Booking',
    html: `
      <h2>Booking Confirmed</h2>
      <p>Dear ${name},</p>
      <p>Your booking at <strong>${templeName}</strong> has been confirmed.</p>
      <p>Date: ${date}</p>
      <p>Time: ${time}</p>
      <p>Total Amount: ₹${totalAmount}</p>
      <p>Thank you for using our service.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Generic email sender
exports.sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};