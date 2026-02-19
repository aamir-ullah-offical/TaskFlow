# Client Overview

The frontend is a **Single Page Application (SPA)** built with **React 18** and **Vite**, prioritizing performance, responsiveness, and a premium "glassmorphism" aesthetic.

## 📂 Directory Structure

```bash
client/src/
├── api/                # Axios instance & interceptors
├── assets/             # Static images/icons
├── components/         # UI Components
│   ├── ai/             # AI-related components
│   ├── analytics/      # Charts & Stats cards
│   ├── landing/        # Landing page specific components
│   ├── layout/         # Navbar, Sidebar, Layout wrappers
│   ├── tasks/          # Task-specific components
│   └── ui/             # Generic UI elements (Modals, Loaders)
├── context/            # Global State (Auth, Theme, Socket)
├── hooks/              # Custom React Hooks
├── pages/              # Page components (Routed)
├── services/           # External services
├── App.jsx             # Main Router setup
├── main.jsx            # Entry point
└── index.css           # Global Styles & Variables
```

## 🛠️ Key Technologies

-   **React 18**: Core library (Hooks, Context, Suspense).
-   **Vite**: Build tool for fast HMR and optimized production builds.
-   **React Router DOM**: Client-side routing.
-   **Axios**: HTTP client.
-   **Socket.io-client**: Real-time communication.
-   **Puter.js**: Zero-backend AI integration for task suggestions.
-   **Date-fns**: Date manipulation.
-   **Recharts**: Data visualization.
-   **Lucide React**: Icon set.
-   **React Hot Toast**: Notifications.

## 🎨 Design System

The application uses **Vanilla CSS Modules** and **Global CSS Variables** for a custom, lightweight interface.

-   **Glassmorphism**: Heavy use of `backdrop-filter: blur()`.
-   **Variables**: Defined in `index.css`.
-   **Dark Mode**: Built-in generic support via `[data-theme='dark']`.

[← Back to Main Documentation](../../README.md)
