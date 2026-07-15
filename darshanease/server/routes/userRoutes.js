// TODO
const express = require('express');
const { updateProfile, uploadProfileImage, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.put('/profile', authMiddleware, updateProfile);
router.post('/upload-image', authMiddleware, uploadSingle, uploadProfileImage);
router.get('/', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;