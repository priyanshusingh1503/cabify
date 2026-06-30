const User = require('../models/User');

const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v').sort({ createdAt: -1 });
    return res.json({ success: true, users });
  } catch (error) {
    console.error('listUsers error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { listUsers };
