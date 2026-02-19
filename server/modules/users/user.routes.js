const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updatePassword, updateTheme, getStats } = require('./user.controller');
const { updateProfileValidator, updateThemeValidator, updatePasswordValidator } = require('./user.validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

router.use(protect); // All user routes are protected

router.get('/me', getProfile);
router.put('/me', upload.single('avatar'), updateProfileValidator, validate, updateProfile);
router.put('/password', updatePasswordValidator, validate, updatePassword);
router.put('/theme', updateThemeValidator, validate, updateTheme);
router.get('/stats', getStats);

module.exports = router;
