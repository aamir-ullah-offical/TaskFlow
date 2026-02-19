# Middleware & Security

## Overview
Middleware functions intercept requests before they reach the controllers, handling cross-cutting concerns like authentication, error handling, and request validation.

## Core Middleware

### `auth.js` (Authentication)
-   **`protect`**:
    1.  Checks for `Authorization: Bearer <token>` header.
    2.  Verifies JWT signature.
    3.  Finds user by ID.
    4.  Attaches `req.user` to the request object.
    5.  Hults request if token is invalid/expired.
-   **`authorize(...roles)`**:
    1.  Checks if `req.user.role` is in the allowed list.

### `errorHandler.js` (Global Error Handling)
-   Centralizes error response formatting.
-   Catches:
    -   Mongoose Validation Errors (400).
    -   Duplicate Key Errors (409).
    -   JWT Errors (401).
-   **Output**: Always returns JSON `{ success: false, message: '...' }` to ensure client consistency.

### `upload.js` (File Handling)
-   Uses `multer` to handle `multipart/form-data`.
-   Stores files in memory buffer for immediate Cloudinary upload.
-   Validates file types (images only).

## Security Measures

-   **Helmet**: Sets secure HTTP headers (HSTS, X-Frame-Options, etc.).
-   **CORS**: Restricts access to allowed domains (Client URL).
-   **Rate Limiting**: Limits repeated requests from same IP (Prevent Brute Force/DDoS).
-   **Mongo Sanitize**: Removes keys starting with `$` to prevent NoSQL injection.
-   **XSS Clean**: Sanitizes user input to prevent Cross-Site Scripting.

[← Back to Main Documentation](../../README.md)
