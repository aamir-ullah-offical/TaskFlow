const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Habit title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },
    streak: {
      type: Number,
      default: 0,
    },
    // Array of ISO date strings (YYYY-MM-DD) for easier checking
    completedDates: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: '#8b5cf6', // Default accent color
    },
    // Lifecycle Status: active | archived
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying active/archived habits
habitSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Habit', habitSchema);
