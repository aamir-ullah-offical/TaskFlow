const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('./auth.controller');
const { registerValidator, loginValidator } = require('./auth.validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 20,
  message: { success: false, message: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, upload.single('avatar'), registerValidator, validate, register);
router.post('/login', authLimiter, loginValidator, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
