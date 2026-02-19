const cron = require('node-cron');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const { emitToUser } = require('../utils/socketManager');

let jobStarted = false;

/**
 * Reminder Engine - runs every minute
 * 1. Reminder notifications: tasks where reminderTime <= now and not yet notified
 * 2. Overdue notifications: tasks where dueDate < now, still pending, and no overdue
 *    notification sent yet today (checked via a compound query on Notification)
 */
const startReminderJob = () => {
  // Singleton guard — prevent duplicate cron registration
  if (jobStarted) return;
  jobStarted = true;

  // ─── Reminder check: every minute ──────────────────────────────────────────
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      const tasks = await Task.find({
        reminderTime: { $lte: now },
        isNotified:   false,
        status:       'pending',
        isDeleted:    false,
      }).populate('user', '_id name').lean();

      if (tasks.length === 0) return;

      const taskIdsToUpdate = [];

      for (const task of tasks) {
        try {
          const notification = await Notification.create({
            user:    task.user._id,
            task:    task._id,
            message: `⏰ Reminder: "${task.title}" is due now!`,
            type:    'reminder',
          });

          emitToUser(task.user._id.toString(), 'new_notification', {
            notification: {
              _id:       notification._id,
              message:   notification.message,
              type:      notification.type,
              task:      { _id: task._id, title: task.title, priority: task.priority },
              isRead:    false,
              createdAt: notification.createdAt,
            },
          });

          taskIdsToUpdate.push(task._id);
        } catch (taskError) {
          console.error(`[Cron] Error processing task ${task._id}:`, taskError.message);
        }
      }

      // Batch mark as notified
      if (taskIdsToUpdate.length > 0) {
        await Task.updateMany(
          { _id: { $in: taskIdsToUpdate } },
          { $set: { isNotified: true } }
        );
      }
    } catch (error) {
      console.error('[Cron] Reminder job error:', error.message);
    }
  });

  // ─── Overdue check: every 15 minutes ───────────────────────────────────────
  cron.schedule('*/15 * * * *', async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);

      // Find pending tasks that are past due
      const overdueTasks = await Task.find({
        dueDate:   { $lt: now },
        status:    'pending',
        isDeleted: false,
      }).populate('user', '_id').lean();

      if (overdueTasks.length === 0) return;

      for (const task of overdueTasks) {
        try {
          // Only send one overdue notification per task per day
          const alreadyNotified = await Notification.exists({
            user:      task.user._id,
            task:      task._id,
            type:      'task_overdue',
            createdAt: { $gte: todayStart },
          });

          if (alreadyNotified) continue;

          const notification = await Notification.create({
            user:    task.user._id,
            task:    task._id,
            message: `⚠️ Task "${task.title}" is overdue!`,
            type:    'task_overdue',
          });

          emitToUser(task.user._id.toString(), 'new_notification', {
            notification: {
              _id:       notification._id,
              message:   notification.message,
              type:      notification.type,
              task:      { _id: task._id, title: task.title, priority: task.priority },
              isRead:    false,
              createdAt: notification.createdAt,
            },
          });
        } catch (taskError) {
          console.error(`[Cron/Overdue] Error for task ${task._id}:`, taskError.message);
        }
      }
    } catch (error) {
      console.error('[Cron] Overdue job error:', error.message);
    }
  });

  console.log('[Cron] Reminder and overdue jobs started.');
};

module.exports = { startReminderJob };
