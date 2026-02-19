const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { getDashboardStats } = require('./analytics.controller');

router.use(protect);

router.get('/dashboard', getDashboardStats);

module.exports = router;
