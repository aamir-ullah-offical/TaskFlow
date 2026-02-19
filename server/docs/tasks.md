# Tasks Module

## Module Overview
The Tasks module manages the core functionality of the application: creating, updating, retrieving, and organizing tasks. It supports complex filtering, search, pagination, and real-time notifications.

## File Structure
- `task.controller.js`: CRUD logic, filtering, sorting, archiving.
- `task.routes.js`: API endpoints definition.
- `task.validator.js`: Input validation rules.

## Model Explanation: Task
The `Task` model (`server/models/Task.js`) represents a single actionable item.

| Field | Type | Description |
|-------|------|-------------|
| `user` | ObjectId | Reference to `User`. |
| `title` | String | Task title. Required. |
| `description` | String | Detailed description. |
| `status` | String | `pending` or `completed`. |
| `priority` | String | `low`, `medium`, `high`. |
| `dueDate` | Date | Deadline for the task. |
| `isArchived` | Boolean | Soft archive status. |
| `isDeleted` | Boolean | Soft delete status (Trash bin). |

## Controller Explanation

### `createTask`
- **Purpose**: Add a new task.
- **Process**:
    1. Calculate `order` for positioning.
    2. Upload image if present.
    3. Create document.
    4. **Socket.io**: Emit 'new_notification' to user.

### `getTasks`
- **Purpose**: Retrieve tasks with advanced filtering.
- **Process**:
    1. Build MongoDB filter object from query params (`status`, `priority`, `search`, `date`).
    2. Apply pagination (`skip`, `limit`).
    3. Apply sorting (`sortBy`, `sortOrder`).
    4. Execute `find()` and `countDocuments()` in parallel.
- **Output**: Array of tasks + pagination metadata.

### `updateTask`
- **Purpose**: Modify task details or status.
- **Process**:
    1. Update fields.
    2. If completing, check for notifications.
    3. **Socket.io**: If completed, emit completion celebration.

## Routes

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | `/api/v1/tasks` | Yes | Get tasks (paginated/filtered). |
| POST | `/api/v1/tasks` | Yes | Create a new task. |
| GET | `/api/v1/tasks/:id` | Yes | Get single task details. |
| PUT | `/api/v1/tasks/:id` | Yes | Update task. |
| DELETE | `/api/v1/tasks/:id` | Yes | Soft delete task. |
| PUT | `/api/v1/tasks/:id/archive` | Yes | Toggle archive. |

[← Back to Main Documentation](../../README.md)
