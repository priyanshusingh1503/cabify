const express = require('express');
const router = express.Router();
const { estimate, requestRide, nearbyDrivers, getRide, updateRideStatus, getRideHistory, rateRide } = require('../controllers/rideController');
const auth = require('../middleware/auth');

router.post('/estimate', estimate);
router.post('/request', auth, requestRide);
router.get('/nearby-drivers', nearbyDrivers);
router.get('/history/me', auth, getRideHistory);
router.get('/:id', auth, getRide);
router.put('/:id/status', auth, updateRideStatus);
router.post('/:id/rate', auth, rateRide);

module.exports = router;
