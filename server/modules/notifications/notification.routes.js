const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications } = require('./notification.controller');
const { protect } = require('../../middleware/auth');

router.use(protect);

router.get('/', getNotifications);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/', deleteAllNotifications);   // bulk clear all
router.delete('/:id', deleteNotification);

module.exports = router;

