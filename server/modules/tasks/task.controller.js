const Task = require('../../models/Task');
const Notification = require('../../models/Notification');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinaryHelper');
const { emitToUser } = require('../../utils/socketManager');

/**
 * Escape a string for safe use in a MongoDB $regex query (prevents ReDoS)
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Helper: create a notification + emit socket event (fire-and-forget, never throws)
 */
const notify = async (userId, taskId, message, type) => {
  try {
    const notification = await Notification.create({ user: userId, task: taskId, message, type });
    emitToUser(userId.toString(), 'new_notification', {
      notification: {
        _id:       notification._id,
        message:   notification.message,
        type:      notification.type,
        task:      taskId ? { _id: taskId } : null,
        isRead:    false,
        createdAt: notification.createdAt,
      },
    });
  } catch (err) {
    console.error('[Notify] Failed to create notification:', err.message);
  }
};

// @desc    Get all tasks for current user (with filtering, search, pagination)
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      category,
      search,
      isArchived,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const filter = {
      user:      req.user._id,
      isDeleted: false,
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = { $regex: escapeRegex(category), $options: 'i' };
    if (isArchived !== undefined) filter.isArchived = isArchived === 'true';
    if (search) {
      const safeSearch = escapeRegex(search);
      filter.$or = [
        { title:       { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
      ];
    }
    if (startDate || endDate) {
      filter.dueDate = {};
      if (startDate) filter.dueDate.$gte = new Date(startDate);
      if (endDate)   filter.dueDate.$lte = new Date(endDate);
    }

    // Whitelist sortBy to prevent injection
    const allowedSortFields = ['createdAt', 'updatedAt', 'dueDate', 'priority', 'status', 'order', 'title'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;
    const sort     = { [safeSortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort(sort).skip(skip).limit(limitNum).lean({ virtuals: true }),
      Task.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        total,
        page:        pageNum,
        limit:       limitNum,
        totalPages:  Math.ceil(total / limitNum),
        hasNext:     pageNum < Math.ceil(total / limitNum),
        hasPrev:     pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, task: req.task });
  } catch (error) {
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, category, priority, status, dueDate, reminderTime } = req.body;

    let taskImage = { url: '', publicId: '' };
    if (req.file) {
      taskImage = await uploadToCloudinary(req.file.buffer, 'todo-saas/tasks');
    }

    // Get the highest order value for this user
    const lastTask = await Task.findOne({ user: req.user._id, isDeleted: false })
      .sort({ order: -1 })
      .select('order')
      .lean();
    const order = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create({
      user:        req.user._id,
      title,
      description,
      category,
      priority,
      status,
      dueDate:     dueDate || null,
      reminderTime: reminderTime || null,
      taskImage,
      order,
    });

    // 🔔 Notify: task created
    notify(req.user._id, task._id, `📝 Task "${task.title}" was created.`, 'task_created');

    res.status(201).json({ success: true, message: 'Task created.', task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = req.task;
    const { title, description, category, priority, status, dueDate, reminderTime } = req.body;

    const wasCompleted = task.status === 'completed';

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) {
      if (status === 'completed' && task.status === 'pending') {
        task.isNotified = true;
      }
      task.status = status;
    }
    // Treat empty string as null for optional date fields
    if (dueDate !== undefined) task.dueDate = dueDate || null;
    if (reminderTime !== undefined) {
      task.reminderTime = reminderTime || null;
      task.isNotified   = false;
    }

    // Handle task image upload
    if (req.file) {
      if (task.taskImage.publicId) {
        await deleteFromCloudinary(task.taskImage.publicId);
      }
      task.taskImage = await uploadToCloudinary(req.file.buffer, 'todo-saas/tasks');
    }

    await task.save();

    // 🔔 Notify: task just completed (only fires once on transition to completed)
    if (!wasCompleted && task.status === 'completed') {
      notify(req.user._id, task._id, `🎉 Task "${task.title}" completed! Great work!`, 'task_completed');
    }

    res.status(200).json({ success: true, message: 'Task updated.', task });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = req.task;
    task.isDeleted = true;
    await task.save();
    res.status(200).json({ success: true, message: 'Task deleted.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle archive status
// @route   PUT /api/v1/tasks/:id/archive
// @access  Private
const toggleArchive = async (req, res, next) => {
  try {
    const task = req.task;
    task.isArchived = !task.isArchived;
    await task.save();
    res.status(200).json({
      success: true,
      message: task.isArchived ? 'Task archived.' : 'Task unarchived.',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder tasks (drag & drop)
// @route   PUT /api/v1/tasks/reorder
// @access  Private
const reorderTasks = async (req, res, next) => {
  try {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds must be an array.' });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, user: req.user._id },
        update: { $set: { order: index } },
      },
    }));

    await Task.bulkWrite(bulkOps);
    res.status(200).json({ success: true, message: 'Tasks reordered.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask, toggleArchive, reorderTasks };
