# Component Library

The application utilizes a set of reusable, modular components organized by feature and function.

## 🧱 UI Components (`src/components/ui/`)

Generic, low-level components used across the application.

### `ConfirmModal`
-   **Purpose**: A glassmorphic modal for dangerous actions (Delete).
-   **Props**: `title`, `message`, `onConfirm`, `onCancel`, `loading`, `confirmText`.
-   **Usage**: Used in Task and Habit deletion flows.

### `SkeletonLoader`
-   **Purpose**: Content placeholder during data fetching.
-   **Props**: `count`, `height`.
-   **Animation**: CSS shimmer effect.

### `PremiumSpinner`
-   **Purpose**: High-quality loading spinner for async actions.

## 🧩 Feature Components

### Layout (`src/components/layout/`)
-   **`DashboardLayout`**: The main wrapper for authenticated pages. Handles Sidebar/Navbar responsiveness.
-   **`Sidebar`**: Collapsible navigation menu.
-   **`Navbar`**: Top bar with user profile, theme toggle, and mobile menu trigger.

### Tasks (`src/components/tasks/`)
-   **`TaskCard`**: Displays individual task details (Title, Priority Badge, Due Date). Handles status toggling and quick actions.
-   **`TaskForm`**: Form for Creating/Editing tasks. Handles validation and file uploads.
-   **`TaskFilters`**: Search bar and dropdowns for filtering the task list.

### Analytics (`src/components/analytics/`)
-   **`StatsCard`**: Displays key metrics (Total, Completed, etc.).
-   **`WeeklyChart`**: Recharts implementation showing 7-day completion history.

### AI Integration (`src/components/ai/`)
-   **`FloatingAIChat`**: A chat interface for interacting with the AI assistant.
-   **`AISuggester`**: Generates task suggestions using Puter.js.

## 🏗️ Design Patterns

-   **Composition**: Components accept `children` where appropriate to remain flexible.
-   **Container/Presentational**: Pages (Containers) handle data fetching, while Components (Presentational) handle rendering.
-   **Prop Types**: Most components expect specific props documented in their comments.

[← Back to Main Documentation](../../README.md)
