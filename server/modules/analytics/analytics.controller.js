const Task = require('../../models/Task');
const Habit = require('../../models/Habit');
const { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek } = require('date-fns');

// @desc    Get Dashboard Analytics
// @route   GET /api/v1/analytics/dashboard
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        
        const todayStart = startOfDay(now);
        const todayEnd = endOfDay(now);
        
        // For Weekly Progress Chart (Last 7 days dynamic)
        const last7DaysStart = subDays(now, 6); 

        // For Growth Calculation (Compare last 7 days vs previous 7 days)
        const thisWeekStart = subDays(now, 7);
        const lastWeekStart = subDays(now, 14);
        
        // For Weekly Goal (Current Calendar Week usually, or rolling 7 days? User said "Weekly Goal". Let's use Calendar Week for the goal circle)
        // actually startOfWeek defaults to Sunday. Let's use that.
        const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
        const currentWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

        // 1. Task Metrics
        const taskStats = await Task.aggregate([
            {
                $match: {
                    user: userId,
                    isDeleted: false
                }
            },
            {
                $facet: {
                    // Overall Counts
                    counts: [
                        {
                            $group: {
                                _id: null,
                                total: { $sum: 1 },
                                completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
                                pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
                                overdue: { 
                                    $sum: { 
                                        $cond: [
                                            { $and: [
                                                { $eq: ["$status", "pending"] },
                                                { $lt: ["$dueDate", now] }
                                            ]}, 
                                            1, 0
                                        ] 
                                    } 
                                }
                            }
                        }
                    ],
                    // Today's Tasks
                    today: [
                        {
                            $match: {
                                dueDate: { $gte: todayStart, $lte: todayEnd }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    // Weekly Progress (Last 7 Days for Chart)
                    weeklyProgress: [
                        {
                            $match: {
                                status: 'completed',
                                updatedAt: { $gte: last7DaysStart }
                            }
                        },
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } }
                    ],
                    // Growth Calc: This Week Completed (Last 7 days)
                    thisWeekCompleted: [
                        {
                            $match: {
                                status: 'completed',
                                updatedAt: { $gte: thisWeekStart }
                            }
                        },
                        { $count: "count" }
                    ],
                    // Growth Calc: Last Week Completed (Previous 7 days)
                    lastWeekCompleted: [
                        {
                            $match: {
                                status: 'completed',
                                updatedAt: { $gte: lastWeekStart, $lt: thisWeekStart }
                            }
                        },
                        { $count: "count" }
                    ],
                    // Weekly Goal: Tasks Due This Calendar Week
                    currentWeekGoal: [
                        {
                            $match: {
                                dueDate: { $gte: currentWeekStart, $lte: currentWeekEnd }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                outputTotal: { $sum: 1 },
                                outputCompleted: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } }
                            }
                        }
                    ]
                }
            }
        ]);

        const stats = taskStats[0];
        const counts = stats.counts[0] || { total: 0, completed: 0, pending: 0, overdue: 0 };
        const todayCount = stats.today[0] ? stats.today[0].count : 0;
        const weeklyProgress = stats.weeklyProgress || [];

        // Growth Calculation
        const thisWeekCount = stats.thisWeekCompleted[0]?.count || 0;
        const lastWeekCount = stats.lastWeekCompleted[0]?.count || 0;
        
        let weeklyGrowth = 0;
        if (lastWeekCount === 0) {
            weeklyGrowth = thisWeekCount > 0 ? 100 : 0;
        } else {
            weeklyGrowth = Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100);
        }

        // Weekly Goal Calculation
        const goalStats = stats.currentWeekGoal[0] || { outputTotal: 0, outputCompleted: 0 };
        const weeklyCompletionRate = goalStats.outputTotal > 0 
            ? Math.round((goalStats.outputCompleted / goalStats.outputTotal) * 100) 
            : 0;

        // 2. Habit Metrics
        const activeHabits = await Habit.countDocuments({ user: userId, status: 'active' });

        // Overall Completion Rate
        const completionRate = counts.total > 0 
            ? Math.round((counts.completed / counts.total) * 100) 
            : 0;

        res.status(200).json({
            success: true,
            stats: {
                total: counts.total,
                completed: counts.completed,
                pending: counts.pending,
                overdue: counts.overdue,
                todayTasks: todayCount,
                completionRate,
                weeklyProgress,
                activeHabits,
                weeklyGrowth,
                weeklyCompletionRate
            }
        });

    } catch (error) {
        next(error);
    }
};
