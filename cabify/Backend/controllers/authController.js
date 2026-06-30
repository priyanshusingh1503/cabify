const Otp = require('../models/Otp');
const User = require('../models/User');
const { sendOtpEmail } = require('../utils/emailService');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const isMockMode = () => process.env.MOCK_MODE === 'true' || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || mongoose.connection.readyState !== 1;

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: 'Invalid email format.' });

    const code = isMockMode() ? '1234' : generateOtp();
    if (mongoose.connection.readyState === 1) {
      await Otp.deleteMany({ email });
      await Otp.create({ email, code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
    }
    console.log(`OTP for ${email}: ${code}`);
    await sendOtpEmail(email, code);
    return res.json({ success: true });
  } catch (error) {
    console.error('sendOtp error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, phone } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    if (!/^\d{4}$/.test(otp)) return res.status(400).json({ success: false, message: 'OTP must be a 4-digit code.' });

    if (mongoose.connection.readyState === 1) {
      const otpRecord = await Otp.findOne({ email, code: otp });
      if (!otpRecord) {
        return res.status(400).json({ success: false, message: 'Invalid code. Please try again.' });
      }
      if (new Date() > otpRecord.expiresAt) {
        await Otp.deleteOne({ _id: otpRecord._id });
        return res.status(400).json({ success: false, message: 'Code has expired. Request a new one.' });
      }
      await Otp.deleteOne({ _id: otpRecord._id });
    } else if (isMockMode() && otp === '1234') {
      // DB down + mock mode: accept 1234 as fallback
    } else {
      return res.status(400).json({ success: false, message: 'Database not connected. Please try again.' });
    }

    const updateData = { email };
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOneAndUpdate({ email }, { $set: updateData }, { upsert: true, new: true });
    }
    const role = user?.role || 'user';
    const token = jwt.sign({ id: user?._id, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, email, message: 'Logged in successfully.' });
  } catch (error) {
    console.error('verifyOtp error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select('-__v');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, user });
  } catch (error) {
    console.error('getMe error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { name: name || '', phone: phone || '' } },
      { new: true }
    ).select('-__v');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, user });
  } catch (error) {
    console.error('updateProfile error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { sendOtp, verifyOtp, getMe, updateProfile };
