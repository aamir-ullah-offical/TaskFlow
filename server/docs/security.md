# Security Architecture

## Overview
This document outlines the security measures implemented to protect the Task Flow application, its users, and data.

## 1. Authentication & Authorization
-   **JWT (JSON Web Tokens)**: Used for stateless authentication.
    -   **Signature**: Signed with a high-entropy `JWT_SECRET`.
    -   **Expiration**: Short-lived tokens (e.g., 7 days) to minimize risk.
-   **Password Hashing**: User passwords are typically hashed using `bcrypt` (Salt rounds: 10+).

## 2. Dependency Security
-   **Helmet**: Secures Express apps by setting various HTTP headers (HSTS, X-Powered-By removal, etc.).
-   **CORS**: Configured to ONLY allow requests from the specific Client URL defined in `.env`.
-   **Rate Limiting**: `express-rate-limit` is applied to `/api/` routes to prevent Abuse/DDoS.

## 3. Data Sanitization
-   **NoSQL Injection**: `mongo-sanitize` removes keys starting with `$` or containing `.` from user input to prevent operator injection.
-   **XSS (Cross-Site Scripting)**: `xss-clean` middleware sanitizes user input (handling HTML tags) to prevent script injection.

## 4. Environment Security
-   **Secrets Management**: API Keys, DB URIs, and Secrets are stored in `.env` files (not committed to git).
-   **Production Mode**: Running node in `production` mode enables performance optimizations and disables verbose error stack traces in responses.

## 5. File Uploads
-   **Validation**: Multer filters validate MIME types (images only).
-   **Storage**: Files are not stored on the disk; they are streamed directly to Cloudinary or stored temporarily in memory buffers.

[← Back to Main Documentation](../../README.md)
