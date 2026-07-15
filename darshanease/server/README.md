# Temple Booking System - Backend

A Node.js/Express backend for a temple booking system with payment integration (Razorpay).

## Features
- User registration/login with JWT authentication
- Admin management for temples and slots
- Real-time slot availability booking
- Payment via Razorpay
- Email notifications (Nodemailer)
- Cloudinary image upload

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the variables as in `.env.sample`
4. Run the server: `npm run dev`

## API Documentation
(Postman collection available upon request)

## Environment Variables
See `.env.sample` for required variables.

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JWT, Bcrypt
- Cloudinary, Multer
- Razorpay
- Nodemailer

## License
MIT