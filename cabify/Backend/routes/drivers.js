const express = require('express');
const router = express.Router();
const { driverLogin, getDriverRides, getDriverProfile, updateDriverLocation, getDriverAnalytics } = require('../controllers/driverController');
const auth = require('../middleware/auth');

router.post('/login', driverLogin);
router.get('/me', auth, getDriverProfile);
router.get('/rides', auth, getDriverRides);
router.put('/location', auth, updateDriverLocation);
router.get('/analytics', auth, getDriverAnalytics);

module.exports = router;
