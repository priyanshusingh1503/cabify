const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again after a minute.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { otpLimiter };
