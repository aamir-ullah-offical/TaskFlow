# State Management

The application uses **React Context API** for global state management, avoiding the complexity of external libraries like Redux for this scope.

## 1. AuthContext (`src/context/AuthContext.jsx`)
Manages the user's authentication session.

-   **State**: `user` object, `loading` boolean.
-   **Persistence**: Syncs with `localStorage` ('token', 'user').
-   **Methods**:
    -   `login(email, password)`: Authenticates and sets state.
    -   `register(formData)`: Creates account and sets state.
    -   `logout()`: Clears state and localStorage.
    -   `updateUser(data)`: Updates local user data without re-login.
    -   `updatePassword(...)`: Handles password change logic.

## 2. SocketContext (`src/context/SocketContext.jsx`)
Manages the real-time WebSocket connection.

-   **State**: `socket` instance, `notifications` array.
-   **Logic**:
    -   Connects to Socket.io server using the JWT token for auth handshake.
    -   Listens for `new_notification` events.
    -   Triggers Toast notifications on incoming events.
    -   Provides `socket` instance to children for custom event emission.

## 3. ThemeContext (`src/context/ThemeContext.jsx`)
Manages the UI theme preference.

-   **State**: `theme` ('light' | 'dark').
-   **Logic**:
    -   Detects system preference initially.
    -   Applies `data-theme` attribute to the `<body>` tag.
    -   Persists choice in `localStorage`.

## 4. Local State
Individual pages (like `Tasks.jsx`) manage their own data state (tasks list, filter inputs, pagination) using `useState` and `useReducer`. This keeps the global store clean and performant.

[← Back to Main Documentation](../../README.md)
