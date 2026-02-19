// In-memory map of userId -> Set of socket instances (supports multiple tabs)
const userSockets = new Map();

/**
 * Register a socket for a user (supports multiple tabs/connections)
 */
const registerSocket = (userId, socket) => {
  const key = userId.toString();
  if (!userSockets.has(key)) {
    userSockets.set(key, new Set());
  }
  userSockets.get(key).add(socket);
};

/**
 * Remove a specific socket when a tab disconnects
 */
const removeSocket = (userId, socketId) => {
  const key = userId.toString();
  const sockets = userSockets.get(key);
  if (!sockets) return;

  for (const socket of sockets) {
    if (socket.id === socketId) {
      sockets.delete(socket);
      break;
    }
  }

  if (sockets.size === 0) {
    userSockets.delete(key);
  }
};

/**
 * Emit an event to all active connections for a user (all tabs)
 */
const emitToUser = (userId, event, data) => {
  const sockets = userSockets.get(userId.toString());
  if (!sockets || sockets.size === 0) return false;

  for (const socket of sockets) {
    socket.emit(event, data);
  }
  return true;
};

module.exports = { registerSocket, removeSocket, emitToUser };
