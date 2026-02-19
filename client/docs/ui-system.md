# UI System

The application implements a custom **Glassmorphism** design system without relying on heavy UI component libraries.

## Global Design System (`src/index.css`)

The look and feel are controlled by CSS variables, allowing for instant theme switching and consistent spacing/coloring.

### Key Variables
-   **colors**: `--bg-primary` (Deep dark background), `--bg-card` (Semi-transparent), `--accent` (Purple).
-   **shadows**: `--shadow-card` (Depth), `--shadow-glow` (Neon glow effects).
-   **borders**: `--border` (Subtle white opacity).

### CSS Utility Classes
Instead of Tailwind (only partially used or replaced in specific modules), we use semantic utility classes:
-   `.glass-card`: Applies blur, border, and shadow.
-   `.btn-primary`: Gradient action button with hover glow.
-   `.text-gradient`: Gradient text effect for headers.
-   `.animate-fade-in`: Keyframe animation.

## Layout Hierarchy

1.  **Root (`App.jsx`)**: Providers (Auth, Theme) -> Router.
2.  **`DashboardLayout`**:
    -   **Sidebar**: Variable width (Collapsed/Expanded).
    -   **Navbar**: Fixed top.
    -   **Main Content**: `outlet` container with padding.
3.  **Page Level**:
    -   **Header**: Title + Actions.
    -   **Content Grid**: Responsive CSS Grid (`repeat(auto-fill, minmax(...))`).

## Responsiveness

-   **Mobile First**: Styles default to mobile, overrides at `@media (min-width: ...)` or vice-versa depending on the component.
-   **Sidebar**: Turns into a bottom navigation bar or hamburger menu on mobile.
-   **Grids**: Automatically collapse from multi-column to single-column based on available width.

## Reusable UI Patterns

-   **Cards**: All content lives in `.glass-card` containers.
-   **Modals**: Centered overlays with backdrop blur.
-   **Toasts**: `react-hot-toast` provides consistent feedback for actions (Success/Error).

[← Back to Main Documentation](../../README.md)
