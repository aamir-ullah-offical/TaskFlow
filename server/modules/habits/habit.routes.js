const express = require('express');
const router = express.Router();
// Check middleware path: server/routes/index.js uses ../modules/.., so relative to habit routes
// middleware is in server/middleware
const { protect } = require('../../middleware/auth'); 
const { createHabit, getHabits, getArchivedHabits, toggleHabit, archiveHabit, restoreHabit, deleteHabitPermanent } = require('./habit.controller');

router.use(protect);

// Habits routes
router.route('/')
  .get(getHabits)
  .post(createHabit);

router.route('/archived')
  .get(getArchivedHabits);

router.route('/:id/toggle')
  .put(toggleHabit);

router.route('/:id/archive')
  .patch(archiveHabit);

router.route('/:id/restore')
  .patch(restoreHabit);

router.route('/:id')
  .delete(deleteHabitPermanent);

module.exports = router;
