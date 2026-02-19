# Database Schema

## Overview
The application uses **MongoDB**, a NoSQL document database. Data is modeled using **Mongoose**, which provides schema validation and type casting.

## Models

### 1. User
Represents a registered account.
-   **_id**: ObjectId (Primary Key).
-   **name**: String (Required).
-   **email**: String (Unique, Indexed).
-   **password**: String (Hashed).
-   **avatar**: Object `{ url, publicId }`.
-   **role**: Enum `['user', 'admin']`.
-   **theme**: Enum `['light', 'dark']`.
-   **timestamps**: `createdAt`, `updatedAt`.

### 2. Task
Represents a user's actionable item.
-   **user**: ObjectId (Ref: User, Indexed).
-   **title**: String.
-   **description**: String.
-   **priority**: Enum `['low', 'medium', 'high']`.
-   **status**: Enum `['pending', 'completed']`.
-   **dueDate**: Date (Indexed).
-   **isArchived**: Boolean.
-   **isDeleted**: Boolean (Soft Delete).

### 3. Habit
Represents a recurring tracking item.
-   **user**: ObjectId (Ref: User).
-   **frequency**: Enum `['daily', 'weekly']`.
-   **streak**: Number.
-   **completedDates**: Array of Strings (`YYYY-MM-DD`).
-   **status**: Enum `['active', 'archived']`.

### 4. Notification
Represents a system alert for a user.
-   **user**: ObjectId (Ref: User).
-   **task**: ObjectId (Ref: Task, Optional).
-   **type**: Enum `['reminder', 'task_created', ...]`.
-   **isRead**: Boolean.

## Relationships
-   **One-to-Many**: User -> Tasks
-   **One-to-Many**: User -> Habits
-   **One-to-Many**: User -> Notifications

All relationships are referenced by `ObjectId` and enforced at the application level (Mongoose).

## Indexes
Indexes are critical for performance. The following fields are indexed:
-   **User**: `email`
-   **Task**: `user` + `status`, `dueDate`, `createdAt`
-   **Habit**: `user` + `status`
-   **Notification**: `user` + `isRead`

[← Back to Main Documentation](../../README.md)
