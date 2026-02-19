const User = require('../../models/User');
const Task = require('../../models/Task');
const Notification = require('../../models/Notification');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinaryHelper');

// @desc    Get own profile
// @route   GET /api/v1/users/me
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile (name, email, avatar)
// @route   PUT /api/v1/users/me
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;

    // Fix race condition: use findOne with $ne to check email uniqueness atomically
    if (email && email !== user.email) {
      const exists = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (exists) {
        return res.status(409).json({ success: false, message: 'Email already in use.' });
      }
      user.email = email;
    }

    // Handle avatar upload
    if (req.file) {
      if (user.avatar.publicId) {
        await deleteFromCloudinary(user.avatar.publicId);
      }
      const uploaded = await uploadToCloudinary(req.file.buffer, 'todo-saas/avatars');
      user.avatar = uploaded;
    }

    await user.save();
    res.status(200).json({ success: true, message: 'Profile updated.', user });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/v1/users/password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Fetch user with password field
    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update theme preference
// @route   PUT /api/v1/users/theme
// @access  Private
const updateTheme = async (req, res, next) => {
  try {
    const { theme } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { theme },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: 'Theme updated.', theme: user.theme });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics for current user
// @route   GET /api/v1/users/stats
// @access  Private
const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);

    const baseFilter = { user: userId, isDeleted: false };

    const [
      total,
      completed,
      pending,
      overdue,
      todayTasks,
      unreadNotifications,
    ] = await Promise.all([
      Task.countDocuments(baseFilter),
      Task.countDocuments({ ...baseFilter, status: 'completed' }),
      Task.countDocuments({ ...baseFilter, status: 'pending' }),
      Task.countDocuments({
        ...baseFilter,
        status: 'pending',
        dueDate: { $lt: now },
      }),
      Task.countDocuments({
        ...baseFilter,
        dueDate: { $gte: startOfToday, $lt: endOfToday },
      }),
      Notification.countDocuments({ user: userId, isRead: false }),
    ]);

    // Weekly progress: tasks completed per day for last 7 days
    const weeklyData = await Task.aggregate([
      {
        $match: {
          user: userId,
          isDeleted: false,
          status: 'completed',
          updatedAt: { $gte: startOfWeek },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.status(200).json({
      success: true,
      stats: {
        total,
        completed,
        pending,
        overdue,
        todayTasks,
        unreadNotifications,
        completionRate,
        weeklyProgress: weeklyData,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, updatePassword, updateTheme, getStats };
