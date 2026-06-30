const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, getMe, updateProfile } = require('../controllers/authController');
const { otpLimiter } = require('../middleware/rateLimiter');
const auth = require('../middleware/auth');

router.post('/send-otp', otpLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', auth, getMe);
router.put('/me', auth, updateProfile);

module.exports = router;
