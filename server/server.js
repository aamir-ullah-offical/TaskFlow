require('dotenv').config();

// ─── Environment Validation (fail fast) ─────────────────────────────────────
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`[FATAL] Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const { registerSocket, removeSocket } = require('./utils/socketManager');
const { startReminderJob } = require('./jobs/reminderJob');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Initialize Express
const app = express();
const server = http.createServer(app);

// ─── Socket.io Setup ────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.io authentication middleware
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required.'));
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    console.error('[Socket Auth Error]', err.message);
    next(new Error('Authentication failed.'));
  }
});

io.on('connection', (socket) => {
  registerSocket(socket.userId, socket);

  socket.on('disconnect', () => {
    removeSocket(socket.userId, socket.id);
  });
});

// ─── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet());

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 200,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

app.use(mongoSanitize());
app.use(xss());

// ─── General Middleware ──────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// 404 handler for API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
  }
  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const clientBuildPath = path.join(__dirname, '../client/dist');
  
  app.use(express.static(clientBuildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
    // 404 handler for non-API routes in dev (since client is separate)
    app.use((req, res) => {
        res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
    });
}

// ─── Centralized Error Handler ───────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    }
    startReminderJob();
  });
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

module.exports = { app, io };
