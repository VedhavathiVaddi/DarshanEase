// TODO
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'temple_booking',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage });

// Single image upload middleware
const uploadSingle = upload.single('image');

// Multiple images upload
const uploadMultiple = upload.array('images', 5);

module.exports = { uploadSingle, uploadMultiple };