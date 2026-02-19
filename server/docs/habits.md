# Habits Module

## Module Overview
The Habits module enables users to track recurring behaviors. It supports daily/weekly frequencies, streak tracking, and a lifecycle management system (Active -> Archived -> Restored).

## File Structure
- `habit.controller.js`: Logic for creating, toggling, and managing habit lifecycle.
- `habit.routes.js`: API endpoints definition.

## Model Explanation: Habit
The `Habit` model (`server/models/Habit.js`) tracks behavior consistency.

| Field | Type | Description |
|-------|------|-------------|
| `user` | ObjectId | Reference to `User`. |
| `title` | String | Description of the habit. |
| `frequency` | String | `daily` or `weekly`. |
| `streak` | Number | Current consecutive completion count. |
| `completedDates` | Array<String> | List of dates (YYYY-MM-DD) when habit was done. |
| `status` | String | `active` or `archived`. |
| `color` | String | UI accent color. |

## Controller Explanation

### `createHabit`
- **Purpose**: Initialize a new habit.
- **Input**: `title`, `frequency`, `color`.
- **Process**: Creates document with `status: 'active'` and `streak: 0`.

### `toggleHabit`
- **Purpose**: Mark a habit as done/undone for today.
- **Process**:
    1. Check if today's date exists in `completedDates`.
    2. If exists -> Remove it (Undo).
    3. If not exists -> Add it (Complete).
    4. **Recalculate Streak**: Algorithms checks consecutive dates backwards from today.
    5. Save document.

### `archiveHabit` / `restoreHabit`
- **Purpose**: Manage lifecycle.
- **Process**: Updates `status` field. Archived habits are hidden from the main view but data is preserved.

## Routes

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | `/api/v1/habits` | Yes | Get active habits. |
| GET | `/api/v1/habits/archived` | Yes | Get archived habits. |
| POST | `/api/v1/habits` | Yes | Create new habit. |
| PUT | `/api/v1/habits/:id/toggle` | Yes | Toggle completion for today. |
| PATCH | `/api/v1/habits/:id/archive` | Yes | Archive habit. |
| PATCH | `/api/v1/habits/:id/restore` | Yes | Restore habit. |
| DELETE | `/api/v1/habits/:id` | Yes | Permanently delete. |

[← Back to Main Documentation](../../README.md)
