# Task Flow

**Task Flow** is a production-grade, multi-user productivity platform designed to help individuals and teams manage tasks, habits, and projects with efficiency. It features a modern, glassmorphism-inspired UI, real-time collaboration, and AI-powered productivity assistance.

## 🚀 Key Features

- **Task Management**: Drag-and-drop organization, priority levels, and subtasks.
- **Habit Tracking**: Daily/Weekly streaks, lifestyle monitoring.
- **Real-Time Collaboration**: Instant updates via Socket.io.
- **AI Assistance**: Smart task breakdown and suggestions powered by Puter.js.
- **Analytics Dashboard**: Visual productivity insights.

## 📂 Documentation Structure

### 🖥 Client
- [Overview](./client/docs/overview.md)
- [Architecture](./client/docs/architecture.md)
- [Components](./client/docs/components.md)
- [Pages](./client/docs/pages.md)
- [API Integration](./client/docs/api-integration.md)
- [State Management](./client/docs/state-management.md)
- [UI System](./client/docs/ui-system.md)

### ⚙ Server
- [Overview](./server/docs/overview.md)
- [Architecture](./server/docs/architecture.md)
- [Authentication](./server/docs/auth.md)
- [Habits Module](./server/docs/habits.md)
- [Tasks Module](./server/docs/tasks.md)
- [Analytics Module](./server/docs/analytics.md)
- [Middleware](./server/docs/middleware.md)
- [Database](./server/docs/database.md)
- [Security](./server/docs/security.md)
- [Deployment](./server/docs/deployment.md)

## 🛠 Tech Stack

### Frontend
- **React 18** (Vite)
- **TailwindCSS** (Custom Glassmorphism)
- **Recharts** (Analytics)
- **Puter.js** (AI)

### Backend
- **Node.js** & **Express**
- **MongoDB** (Mongoose)
- **Socket.io** (Real-time)
- **JWT** (Auth)

## 🏃‍♂️ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/task-flow.git

# 2. Install dependencies (Root, Client, Server)
npm install
cd client && npm install
cd ../server && npm install

# 3. Environment Setup
# Create .env files in /server and /client based on .env.example

# 4. Run Development Servers
# Terminal 1 (Backend)
cd server && npm run dev

# Terminal 2 (Frontend)
cd client && npm run dev
```

---

[License](./LICENSE) | [Contributing](./CONTRIBUTING.md)
