const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/authController');
const { otpLimiter } = require('../middleware/rateLimiter');

router.post('/send-otp', otpLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
