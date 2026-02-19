# Pages & Routing

The application routes are defined in `App.jsx`. All pages are lazy-loaded.

## Auth Pages (`src/pages/auth/`)

### `Login`
-   **Route**: `/login`
-   **Function**: User authentication.
-   **Features**: Form validation, error handling, redirect to dashboard on success.

### `Register`
-   **Route**: `/register`
-   **Function**: New user signup.
-   **Features**: Name/Email/Password inputs, Avatar upload preview.

## Core Pages (`src/pages/`)

### `Dashboard`
-   **Route**: `/dashboard`
-   **Function**: Overview of user productivity.
-   **Components**: `StatsCard`, `WeeklyChart`, Recent Tasks list.
-   **Data**: Fetches aggregated analytics.

### `Tasks`
-   **Route**: `/tasks`
-   **Function**: Main task management interface.
-   **Features**:
    -   Infinite Scroll / Pagination (Custom implementation).
    -   Filtering (Status, Priority, Category).
    -   Search (Debounced).
    -   CRUD Operations (via Modals).

### `Habits`
-   **Route**: `/habits`
-   **Function**: Habit tracking.
-   **Features**:
    -   **Active/Archived Tabs**: Switch views.
    -   **Daily Toggle**: Mark habit as done for today.
    -   **Lifecycle Controls**: Archive/Restore/Delete habits.

### `Profile`
-   **Route**: `/profile`
-   **Function**: User settings.
-   **Features**:
    -   Update Name/Email.
    -   Change Password.
    -   Upload new Avatar.

## Landing Pages (`src/pages/info/`)
A suite of static pages (Features, Pricing, About, etc.) designed for marketing. These share the `LandingNavbar` and `Footer`.

[← Back to Main Documentation](../../README.md)
