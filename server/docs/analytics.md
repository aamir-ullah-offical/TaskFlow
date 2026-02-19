# Analytics Module

## Module Overview
The Analytics module provides real-time insights into user productivity. It uses advanced MongoDB aggregation pipelines to calculate statistics on-the-fly, ensuring data accuracy without maintaining separate counter fields.

## File Structure
- `analytics.controller.js`: Contains specific aggregation logic.
- `analytics.routes.js`: API endpoints.

## Aggregation Pipeline Explained

The `getDashboardStats` controller uses a single `Task.aggregate([])` call with a `$facet` stage to perform multiple analyses in parallel:

1.  **`counts` Facet**:
    -   Matches user tasks.
    -   Sums `total`, `completed`, `pending`.
    -   Sums `overdue` (where `dueDate < now` and `status == pending`).

2.  **`weeklyProgress` Facet**:
    -   Matches completed tasks in the last 7 days.
    -   Groups by `updatedAt` date.
    -   Sorts by date.
    -   **Result**: Array of `{ date, count }` for charting.

3.  **`weeklyGrowth` Facet**:
    -   Calculates tasks completed in *current* 7-day window vs *previous* 7-day window.
    -   Computes percentage change.

4.  **`weeklyGoal` Facet**:
    -   Calculates completion rate for tasks due within the current calendar week.

## Controller Explanation

### `getDashboardStats`
-   **Purpose**: Fetch all data needed for the Dashboard.
-   **Input**: User ID.
-   **Output**:
    ```json
    {
      "stats": {
        "total": 15,
        "completed": 10,
        "pending": 5,
        "overdue": 1,
        "todayTasks": 3,
        "completionRate": 66,
        "weeklyProgress": [...],
        "activeHabits": 4,
        "weeklyGrowth": 12,
        "weeklyCompletionRate": 85
      }
    }
    ```

## Routes

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | `/api/v1/analytics/dashboard` | Yes | Get consolidated dashboard stats. |

## Performance Considerations
-   **Facets**: Using `$facet` allows a single DB round-trip instead of multiple queries, reducing latency.

[← Back to Main Documentation](../../README.md)
