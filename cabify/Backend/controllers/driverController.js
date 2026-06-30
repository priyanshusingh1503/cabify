const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const jwt = require('jsonwebtoken');

const driverLogin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
    const driver = await Driver.findOne({ email: email.toLowerCase() });
    if (!driver) return res.status(404).json({ success: false, message: 'Driver not found.' });
    const token = jwt.sign({ id: driver._id, email: driver.email, role: 'driver' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, driver });
  } catch (error) {
    console.error('driverLogin error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getDriverRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.user.id }).sort({ createdAt: -1 });
    return res.json({ success: true, rides });
  } catch (error) {
    console.error('getDriverRides error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id).select('-__v');
    if (!driver) return res.status(404).json({ success: false, message: 'Driver not found.' });
    return res.json({ success: true, driver });
  } catch (error) {
    console.error('getDriverProfile error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const updateDriverLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (lat == null || lng == null) return res.status(400).json({ success: false, message: 'Lat/Lng required.' });
    const driver = await Driver.findByIdAndUpdate(req.user.id, { lat, lng }, { new: true });
    return res.json({ success: true, driver });
  } catch (error) {
    console.error('updateDriverLocation error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getDriverAnalytics = async (req, res) => {
  try {
    const driverId = req.user.id;
    const mongoose = require('mongoose');
    const driverObjectId = new mongoose.Types.ObjectId(driverId);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const allRides = await Ride.find({ driverId });

    const dailyRides = await Ride.aggregate([
      { $match: { driverId: driverObjectId, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
        revenue: { $sum: '$price' }
      }},
      { $sort: { _id: 1 } }
    ]);

    const rideTypeResult = await Ride.aggregate([
      { $match: { driverId: driverObjectId } },
      { $group: { _id: '$rideType', count: { $sum: 1 } } }
    ]);

    const statusResult = await Ride.aggregate([
      { $match: { driverId: driverObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const completedRides = allRides.filter(r => r.status === 'completed');
    const totalRevenue = completedRides.reduce((sum, r) => sum + r.price, 0);
    const avgDistance = allRides.length ? (allRides.reduce((sum, r) => sum + r.distance, 0) / allRides.length).toFixed(1) : 0;
    const avgDuration = allRides.length ? Math.round(allRides.reduce((sum, r) => sum + r.duration, 0) / allRides.length) : 0;
    const completionRate = allRides.length ? Math.round((completedRides.length / allRides.length) * 100) : 0;

    const pickupHotspots = await Ride.aggregate([
      { $match: { driverId: driverObjectId } },
      { $group: {
        _id: { lat: { $round: ['$pickup.lat', 2] }, lng: { $round: ['$pickup.lng', 2] } },
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    const dropoffHotspots = await Ride.aggregate([
      { $match: { driverId: driverObjectId } },
      { $group: {
        _id: { lat: { $round: ['$dropoff.lat', 2] }, lng: { $round: ['$dropoff.lng', 2] } },
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    const recentRides = await Ride.find({ driverId }).sort({ createdAt: -1 }).limit(10)
      .select('pickup.address dropoff.address rideType price distance duration status createdAt');

    const typeMap = {};
    rideTypeResult.forEach(t => { typeMap[t._id] = t.count; });
    const statusMap = {};
    statusResult.forEach(s => { statusMap[s._id] = s.count; });

    return res.json({
      success: true,
      analytics: {
        dailyRides: dailyRides.map(d => ({ date: d._id, count: d.count, revenue: d.revenue })),
        rideTypeBreakdown: typeMap,
        statusBreakdown: statusMap,
        totalStats: {
          totalRides: allRides.length,
          completedRides: completedRides.length,
          totalRevenue: Math.round(totalRevenue),
          avgDistance: Number(avgDistance),
          avgDuration,
          completionRate
        },
        pickupLocations: pickupHotspots.map(p => ({ lat: p._id.lat, lng: p._id.lng, count: p.count })),
        dropoffLocations: dropoffHotspots.map(d => ({ lat: d._id.lat, lng: d._id.lng, count: d.count })),
        recentRides
      }
    });
  } catch (error) {
    console.error('getDriverAnalytics error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { driverLogin, getDriverRides, getDriverProfile, updateDriverLocation, getDriverAnalytics };
