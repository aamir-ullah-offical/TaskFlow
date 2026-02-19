const express = require('express');
const router = express.Router();
const {
  getTasks, getTask, createTask, updateTask, deleteTask, toggleArchive, reorderTasks,
} = require('./task.controller');
const { createTaskValidator, updateTaskValidator } = require('./task.validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const { verifyTaskOwnership } = require('../../middleware/ownership');
const upload = require('../../middleware/upload');

router.use(protect); // All task routes are protected

router.get('/', getTasks);
router.post('/', upload.single('taskImage'), createTaskValidator, validate, createTask);
router.put('/reorder', reorderTasks);
router.get('/:id', verifyTaskOwnership, getTask);
router.put('/:id', verifyTaskOwnership, upload.single('taskImage'), updateTaskValidator, validate, updateTask);
router.delete('/:id', verifyTaskOwnership, deleteTask);
router.put('/:id/archive', verifyTaskOwnership, toggleArchive);

module.exports = router;
