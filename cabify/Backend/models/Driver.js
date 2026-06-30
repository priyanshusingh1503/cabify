const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, default: '' },
  vehicle: { type: String, default: 'Sedan' },
  plateNumber: { type: String, default: '' },
  lat: { type: Number, default: 23.2599 },
  lng: { type: Number, default: 77.4126 },
  status: { type: String, enum: ['available', 'busy', 'offline'], default: 'available' },
  avgRating: { type: Number, default: 5.0 },
  totalRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Driver', driverSchema);
