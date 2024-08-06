// routes/authRoutes.js
const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile, verifyEmail, resetPassword,
    forgotPassword,} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.get('/verify-email/:id', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
