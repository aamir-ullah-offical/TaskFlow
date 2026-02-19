const { body, query } = require('express-validator');

const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Task title is required.')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters.'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters.'),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters.'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high.'),

  body('status')
    .optional()
    .isIn(['pending', 'completed']).withMessage('Status must be pending or completed.'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date.'),

  body('reminderTime')
    .optional()
    .isISO8601().withMessage('Reminder time must be a valid date.'),
];

const updateTaskValidator = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty.')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters.'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters.'),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters.'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high.'),

  body('status')
    .optional()
    .isIn(['pending', 'completed']).withMessage('Status must be pending or completed.'),

  body('dueDate')
    .optional({ nullable: true })
    .isISO8601().withMessage('Due date must be a valid date.'),

  body('reminderTime')
    .optional({ nullable: true })
    .isISO8601().withMessage('Reminder time must be a valid date.'),
];

module.exports = { createTaskValidator, updateTaskValidator };
