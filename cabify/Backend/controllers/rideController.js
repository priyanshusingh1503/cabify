const Ride = require('../models/Ride');
const Driver = require('../models/Driver');
const User = require('../models/User');

const RIDE_TYPES = {
  UberGo: { baseFare: 25, perKm: 8, perMin: 2 },
  Premier: { baseFare: 50, perKm: 12, perMin: 3 },
  UberXL: { baseFare: 75, perKm: 16, perMin: 4 },
};

const AVG_SPEED_KMPH = 25;

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const estimate = async (req, res) => {
  try {
    const { pickupLat, pickupLng, dropoffLat, dropoffLng } = req.body;
    if (!pickupLat || !pickupLng || !dropoffLat || !dropoffLng)
      return res.status(400).json({ success: false, message: 'Pickup and dropoff coordinates required.' });

    const dist = haversineKm(pickupLat, pickupLng, dropoffLat, dropoffLng);
    const roadDist = dist * 1.3;
    const durationMin = Math.round((roadDist / AVG_SPEED_KMPH) * 60);

    const estimates = Object.entries(RIDE_TYPES).map(([name, rates]) => {
      const price = Math.round(rates.baseFare + rates.perKm * roadDist + rates.perMin * durationMin);
      return {
        name, price, priceDisplay: `₹${price.toFixed(2)}`,
        distance: Math.round(roadDist * 10) / 10, duration: durationMin,
        eta: `${Math.max(2, Math.round(durationMin * 0.3))} min away`,
        desc: name === 'UberGo' ? 'Affordable, everyday rides'
          : name === 'Premier' ? 'Comfortable sedans, top-quality drivers'
          : 'Affordable rides for groups up to 6',
      };
    });

    return res.json({ success: true, estimates, pickupLat, pickupLng, dropoffLat, dropoffLng });
  } catch (error) {
    console.error('estimate error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const requestRide = async (req, res) => {
  try {
    const { pickupAddress, pickupLat, pickupLng, dropoffAddress, dropoffLat, dropoffLng, rideType } = req.body;
    if (!pickupAddress || !pickupLat || !pickupLng || !dropoffAddress || !dropoffLat || !dropoffLng || !rideType)
      return res.status(400).json({ success: false, message: 'Missing required fields.' });

    const rates = RIDE_TYPES[rideType];
    if (!rates) return res.status(400).json({ success: false, message: 'Invalid ride type.' });

    const dist = haversineKm(pickupLat, pickupLng, dropoffLat, dropoffLng);
    const roadDist = dist * 1.3;
    const durationMin = Math.round((roadDist / AVG_SPEED_KMPH) * 60);
    const price = Math.round(rates.baseFare + rates.perKm * roadDist + rates.perMin * durationMin);

    const user = await User.findOne({ email: req.user.email });
    const userId = user?._id || req.user.id || req.user._id;

    const ride = await Ride.create({
      userId,
      driverId: null,
      pickup: { address: pickupAddress, lat: pickupLat, lng: pickupLng },
      dropoff: { address: dropoffAddress, lat: dropoffLat, lng: dropoffLng },
      rideType,
      status: 'pending',
      price, distance: Math.round(roadDist * 10) / 10, duration: durationMin,
    });

    const io = req.app.get('io');
    if (io) {
      io.to('drivers').emit('ride:new-request', {
        rideId: ride._id,
        rideType, price, pickupAddress, dropoffAddress,
        pickupLat, pickupLng, dropoffLat, dropoffLng,
        distance: ride.distance, duration: ride.duration,
        userId: userId.toString(),
      });
    }

    return res.json({
      success: true, ride,
      driver: null,
      message: 'Searching for nearby drivers...',
    });
  } catch (error) {
    console.error('requestRide error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const nearbyDrivers = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ success: false, message: 'Location required.' });

    const allDrivers = await Driver.find({ status: { $in: ['available', 'busy'] } }).lean();
    const nearby = allDrivers.map(d => {
      const dist = haversineKm(parseFloat(lat), parseFloat(lng), d.lat, d.lng);
      return { ...d, distance: Math.round(dist * 10) / 10 };
    }).filter(d => d.distance < 10).sort((a, b) => a.distance - b.distance);

    return res.json({ success: true, drivers: nearby.slice(0, 20) });
  } catch (error) {
    console.error('nearbyDrivers error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driverId', 'name vehicle plateNumber phone');
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found.' });
    return res.json({ success: true, ride });
  } catch (error) {
    console.error('getRide error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const updateRideStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['accepted', 'arrived', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status.' });

    const update = { status };
    if (status === 'accepted' && !req.body.driverId) {
      const driver = await Driver.findOne({ email: req.user.email });
      if (driver) update.driverId = driver._id;
    }

    const ride = await Ride.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate('driverId', 'name vehicle plateNumber phone');
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found.' });

    if (status === 'completed' && ride.driverId) {
      await Driver.findByIdAndUpdate(ride.driverId, { status: 'available' });
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('ride:status-update', { rideId: ride._id, status });
    }

    return res.json({ success: true, ride });
  } catch (error) {
    console.error('updateRideStatus error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getRideHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const rides = await Ride.find({ userId }).sort({ createdAt: -1 }).limit(50).lean();
    return res.json({ success: true, rides });
  } catch (error) {
    console.error('getRideHistory error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const rateRide = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { id } = req.params;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ success: false, message: 'Rating must be 1-5.' });

    const Ride = require('../models/Ride');
    const Driver = require('../models/Driver');
    const ride = await Ride.findById(id);
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found.' });
    if (ride.status !== 'completed') return res.status(400).json({ success: false, message: 'Can only rate completed rides.' });

    const userId = req.user.id || req.user._id;
    if (ride.userId.toString() !== userId.toString()) return res.status(403).json({ success: false, message: 'Not your ride.' });
    if (ride.riderRating) return res.status(400).json({ success: false, message: 'Already rated.' });

    ride.riderRating = rating;
    ride.riderReview = review || '';
    await ride.save();

    if (ride.driverId) {
      const driver = await Driver.findById(ride.driverId);
      if (driver) {
        const total = driver.totalRatings + 1;
        driver.avgRating = ((driver.avgRating * driver.totalRatings) + rating) / total;
        driver.totalRatings = total;
        await driver.save();
      }
    }

    return res.json({ success: true, message: 'Rating submitted.' });
  } catch (error) {
    console.error('rateRide error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { estimate, requestRide, nearbyDrivers, getRide, updateRideStatus, getRideHistory, rateRide };
