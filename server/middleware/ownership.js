const mongoose = require('mongoose');
const Task = require('../models/Task');

/**
 * Middleware to verify that the task being accessed belongs to the authenticated user.
 * Attaches the task to req.task for downstream use.
 */
const verifyTaskOwnership = async (req, res, next) => {
  try {
    // Validate ObjectId format before hitting the database
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.',
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or access denied.',
      });
    }

    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyTaskOwnership };
