const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const taskRoutes = require('../modules/tasks/task.routes');
const notificationRoutes = require('../modules/notifications/notification.routes');
const habitRoutes = require('../modules/habits/habit.routes');
const analyticsRoutes = require('../modules/analytics/analytics.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/notifications', notificationRoutes);
router.use('/habits', habitRoutes);
router.use('/analytics', analyticsRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running.', timestamp: new Date() });
});

module.exports = router;
