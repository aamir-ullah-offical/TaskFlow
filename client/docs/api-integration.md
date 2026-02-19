# API Integration

The frontend communicates with the backend via a centralized Axios instance.

## Axios Setup (`src/api/axios.js`)

A custom axios instance is created with:
-   **Base URL**: From environment variables (`VITE_API_URL`) or defaults to `/api/v1`.
-   **Headers**: `Content-Type: application/json`.

## Interceptors

### Request Interceptor
Automatically injects the JWT token into every request.

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor
Global error handling, specifically for Authentication failures.

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      logout(); // redirect to login
    }
    return Promise.reject(error);
  }
);
```

## Data Fetching Pattern

Components typically follow this pattern:
1.  **State**: `data` (null/[]), `loading` (true), `error` (null).
2.  **Effect**: `useEffect` calls an async function.
3.  **Async Function**:
    -   Set `loading(true)`.
    -   Call `api.get(...)`.
    -   Update `data`.
    -   Catch error -> Toast notification.
    -   Finally -> `loading(false)`.

This ensures consistent UI states (Loading Skeletons, Error Toasts, Data Display).

## External Services: AI (Puter.js)

The application uses **Puter.js** for client-side AI, avoiding the need for backend API keys or proxies.

### Service Location
`client/src/services/puterAI.js`

### Integration Logic
Puter.js routes requests through the Puter platform.

```javascript
import puter from '@heyputer/puter.js';

const response = await puter.ai.chat([
  { role: 'system', content: 'Your system prompt here...' },
  { role: 'user', content: userInput },
]);
```

### Key Functions
-   `suggestTasks(topic)`: Returns task suggestions.
-   `generateDescription(title)`: Returns plain text description.
-   `dailySummary(stats)`: Generates motivational summary.

### Error Handling
All AI functions throw standard JS `Error` objects, which are caught by the UI and displayed via `react-hot-toast`.

[← Back to Main Documentation](../../README.md)
