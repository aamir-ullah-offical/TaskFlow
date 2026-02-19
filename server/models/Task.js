const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
      default: null,
      index: true,
    },
    reminderTime: {
      type: Date,
      default: null,
      index: true,
    },
    taskImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    order: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNotified: {
      type: Boolean,
      default: false,
    },
    subtasks: [{
      title: { type: String, trim: true },
      completed: { type: Boolean, default: false }
    }],
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common query patterns
taskSchema.index({ user: 1, isDeleted: 1, status: 1 });
taskSchema.index({ user: 1, isDeleted: 1, dueDate: 1 });
taskSchema.index({ reminderTime: 1, isNotified: 1, status: 1, isDeleted: 1 });
taskSchema.index({ user: 1, isDeleted: 1, createdAt: -1 });

// Virtual: check if task is overdue
taskSchema.virtual('isOverdue').get(function () {
  if (!this.dueDate || this.status === 'completed') return false;
  return new Date() > this.dueDate;
});

taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);
