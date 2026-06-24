const Otp = require('../models/Otp');
const User = require('../models/User');
const { sendOtpEmail } = require('../utils/emailService');
const mongoose = require('mongoose');

const isMockMode = () => !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || mongoose.connection.readyState !== 1;

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: 'Invalid email format.' });

    const code = generateOtp();
    if (mongoose.connection.readyState === 1) {
      await Otp.deleteMany({ email });
      await Otp.create({ email, code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
    }
    await sendOtpEmail(email, code);
    return res.json({ success: true });
  } catch (error) {
    console.error('sendOtp error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    if (!/^\d{4}$/.test(otp)) return res.status(400).json({ success: false, message: 'OTP must be a 4-digit code.' });

    if (isMockMode()) {
      if (otp === '1234') return res.json({ success: true, message: 'Logged in successfully (mock mode).' });
      return res.status(400).json({ success: false, message: 'Invalid code. Please try again.' });
    }

    const otpRecord = await Otp.findOne({ email, code: otp });
    if (!otpRecord) return res.status(400).json({ success: false, message: 'Invalid code. Please try again.' });
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'Code has expired. Request a new one.' });
    }
    await Otp.deleteOne({ _id: otpRecord._id });
    await User.findOneAndUpdate({ email }, { email }, { upsert: true, new: true });
    return res.json({ success: true, message: 'Logged in successfully.' });
  } catch (error) {
    console.error('verifyOtp error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

module.exports = { sendOtp, verifyOtp };
