const express = require('express');
const router = express.Router();
const { listUsers } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/users', auth, admin, listUsers);

module.exports = router;
