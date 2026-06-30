const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  pickup: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  dropoff: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  rideType: { type: String, enum: ['UberGo', 'Premier', 'UberXL'], required: true },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'arrived', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  price: { type: Number, required: true },
  distance: { type: Number, required: true },
  duration: { type: Number, required: true },
  riderRating: { type: Number, min: 1, max: 5, default: null },
  riderReview: { type: String, default: '' },
  driverRating: { type: Number, min: 1, max: 5, default: null },
  driverReview: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ride', rideSchema);
