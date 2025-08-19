const express = require('express');
const {isAuthenticated} = require('../middleware/authMiddleware');
const {getDashboardData} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/', isAuthenticated, getDashboardData);
module.exports = router;