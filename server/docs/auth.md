# Authentication Module

## Module Overview
The Authentication module handles user registration, login, token generation, and session management. It uses JWT (JSON Web Tokens) for stateless authentication and bcrypt for password hashing.

## File Structure
- `auth.controller.js`: Handles business logic for registration, login, and profile retrieval.
- `auth.routes.js`: Defines API endpoints (`/register`, `/login`, `/me`).
- `auth.validator.js`: Express-validator middleware for request validation.

## Model Explanation: User
The `User` model (`server/models/User.js`) stores user credentials and preferences.

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | User's full name. Required. |
| `email` | String | Unique email address. Required. |
| `password` | String | Hashed password (bcrypt). Not selected by default. |
| `avatar` | Object | `{ url, publicId }` for Cloudinary image. |
| `role` | String | `user` or `admin`. Defaults to `user`. |
| `theme` | String | UI theme preference (`light` or `dark`). |

## Controller Explanation

### `register`
- **Purpose**: Create a new user account.
- **Input**: `name`, `email`, `password`, `avatar` (file).
- **Process**:
    1. Check if email already exists.
    2. Upload avatar to Cloudinary (optional).
    3. Create user document.
    4. Generate JWT.
- **Output**: JSON with token and user profile.

### `login`
- **Purpose**: Authenticate existing user.
- **Input**: `email`, `password`.
- **Process**:
    1. Find user by email (select password).
    2. Compare password with hash.
    3. Update `lastLogin`.
    4. Generate JWT.
- **Output**: JSON with token and user profile.

### `getMe`
- **Purpose**: Verify token and get current user data.
- **Input**: JWT in Authorization header.
- **Process**: Extracts user from `req.user` (populated by `protect` middleware).
- **Output**: JSON with user profile.

## Routes

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/api/v1/auth/register` | No | Register a new user. |
| POST | `/api/v1/auth/login` | No | Login and receive a token. |
| GET | `/api/v1/auth/me` | **Yes** | Get current logged-in user profile. |

[← Back to Main Documentation](../../README.md)
