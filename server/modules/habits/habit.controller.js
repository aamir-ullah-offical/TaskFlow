const Habit = require('../../models/Habit');
const { format, subDays, isSameDay, parseISO } = require('date-fns');

// Create Habit
exports.createHabit = async (req, res, next) => {
  try {
    const { title, description, frequency, color } = req.body;
    const habit = await Habit.create({
      user: req.user.id,
      title,
      description,
      frequency,
      color,
    });
    res.status(201).json({ success: true, habit });
  } catch (error) {
    next(error);
  }
};

// Get Active Habits
exports.getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user.id, status: 'active' })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, habits });
  } catch (error) {
    next(error);
  }
};

// Get Archived Habits
exports.getArchivedHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user.id, status: 'archived' })
      .sort({ updatedAt: -1 });
    res.status(200).json({ success: true, habits });
  } catch (error) {
    next(error);
  }
};

// Toggle Habit Completion (Today)
exports.toggleHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todayIndex = habit.completedDates.indexOf(todayStr);

    if (todayIndex > -1) {
      // Remove today (undo completion)
      habit.completedDates.splice(todayIndex, 1);
    } else {
      // Add today (mark complete)
      habit.completedDates.push(todayStr);
    }
    
    // Sort dates
    habit.completedDates.sort();

    // Recalculate streak
    // Simple logic: check consecutive days backwards from today/yesterday
    let streak = 0;
    const todayISO = parseISO(todayStr);
    
    // Check backwards from today
    for (let i = 0; i < 365; i++) {
        const checkDate = subDays(todayISO, i);
        const checkStr = format(checkDate, 'yyyy-MM-dd');
        
        if (habit.completedDates.includes(checkStr)) {
            streak++;
        } else if (i === 0) {
            // If today is not completed, streak is still valid if yesterday was completed
            continue; 
        } else {
            // Break chain
            break;
        }
    }
    
    // Correction: if today is NOT strictly completed, streak might be yesterday's streak.
    // However, if today is missed, streak count shouldn't reset until tomorrow.
    // Let's refine:
    // Filter dates, sort unique desc.
    const sortedDates = [...new Set(habit.completedDates)].sort().reverse();
    
    let currentStreak = 0;
    let expectedDate = new Date();
    // Normalize time
    expectedDate.setHours(0,0,0,0);

    for (const dateStr of sortedDates) {
        const d = parseISO(dateStr);
        d.setHours(0,0,0,0);
        
        const diff = (expectedDate - d) / (1000 * 60 * 60 * 24); // Days diff
        
        if (diff === 0) {
            // Completed today
            currentStreak++;
            expectedDate = subDays(expectedDate, 1);
        } else if (diff === 1) {
            // Completed yesterday (streak continues)
            currentStreak++;
            expectedDate = subDays(d, 1); // Or expectedDate = subDays(expectedDate, 1) which is d
        } else {
            // Gap > 1 day
            break;
        }
    }
    // Wait, the loop above is slightly flawed if we start with today uncompleted.
    // If sortedDates[0] is yesterday, streak starts there.
    // Let's use simplified logic:
    // Streak = consecutive days ending today or yesterday.

    let consecutive = 0;
    const now = new Date();
    const todayString = format(now, 'yyyy-MM-dd');
    const yesterdayString = format(subDays(now, 1), 'yyyy-MM-dd');

    const hasToday = habit.completedDates.includes(todayString);
    const hasYesterday = habit.completedDates.includes(yesterdayString);

    if (hasToday) {
        consecutive = 1;
        let dateToCheck = subDays(now, 1);
        while (habit.completedDates.includes(format(dateToCheck, 'yyyy-MM-dd'))) {
            consecutive++;
            dateToCheck = subDays(dateToCheck, 1);
        }
    } else if (hasYesterday) {
        consecutive = 1;
        let dateToCheck = subDays(now, 2);
        while (habit.completedDates.includes(format(dateToCheck, 'yyyy-MM-dd'))) {
            consecutive++;
            dateToCheck = subDays(dateToCheck, 1);
        }
    } else {
        consecutive = 0;
    }

    habit.streak = consecutive;
    await habit.save();

    res.status(200).json({ success: true, habit });
  } catch (error) {
    next(error);
  }
};

// Archive Habit (Soft Delete)
exports.archiveHabit = async (req, res, next) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
        if(!habit) return res.status(404).json({message: 'Not found'});
        
        habit.status = 'archived';
        await habit.save();
        res.status(200).json({success: true, message: 'Habit archived', habit});
    } catch(err) { next(err); }
};

// Restore Habit
exports.restoreHabit = async (req, res, next) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
        if(!habit) return res.status(404).json({message: 'Not found'});
        
        habit.status = 'active';
        await habit.save();
        res.status(200).json({success: true, message: 'Habit restored', habit});
    } catch(err) { next(err); }
};

// Permanently Delete Habit
exports.deleteHabitPermanent = async (req, res, next) => {
    try {
        const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if(!habit) return res.status(404).json({message: 'Not found'});
        res.status(200).json({success: true, message: 'Habit permanently deleted'});
    } catch(err) { next(err); }
};
