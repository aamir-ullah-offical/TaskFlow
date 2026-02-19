# Server Overview

The backend is built with **Node.js** and **Express.js**, following a modular structure to ensure scalability and maintainability.

## 📂 Directory Structure

```bash
server/
├── config/             # Configuration (DB connection, Cloudinary)
├── middleware/         # Custom Express middleware
├── models/             # Mongoose data models
├── modules/            # Feature-based modules
│   ├── analytics/      # Analytics Logic
│   ├── auth/           # Authentication Logic
│   ├── habits/         # Habit Logic
│   ├── notifications/  # Notification Logic
│   ├── tasks/          # Task Logic
│   └── users/          # User Logic
├── routes/             # Main API Router
└── utils/              # Helper functions & Services
```

## 🛠️ Key Technologies

- **Express.js**: Web framework for handling API requests.
- **Mongoose**: ODM for MongoDB interaction.
- **JsonWebToken**: Stateless authentication.
- **Socket.io**: Real-time event communication.
- **Cloudinary**: Cloud storage for image uploads.

## 🔄 Request Lifecycle

1. **Incoming Request**: Client sends HTTP request.
2. **Global Middleware**: Helmet (Security), CORS (Cross-Origin), Rate Limit (DDOS protection), JSON Parsing.
3. **Router**: Requests routed to specific modules (`/api/v1/tasks`, etc.).
4. **Auth Middleware**: Verifies JWT (if route is protected).
5. **Controller**: Business logic execution (Validation -> Service -> DB).
6. **Database**: Interaction with MongoDB.
7. **Response**: JSON response sent back to client.
8. **Error Handling**: Centralized error middleware catches & formats exceptions.

[← Back to Main Documentation](../../README.md)
