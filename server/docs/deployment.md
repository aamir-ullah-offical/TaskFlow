# Deployment Guide

This guide covers the deployment process for the Task Flow application.

## Prerequisites

-   **Node.js** v18+
-   **MongoDB** (Atlas or Self-hosted)
-   **Cloudinary** Account (for image uploads)

## Environment Variables

Ensure these variables are set in your production environment:

### Backend
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=complex_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend
```env
VITE_API_URL=https://your-backend-domain.com/api/v1
VITE_SOCKET_URL=https://your-backend-domain.com
```

## Deployment Strategies

### 1. Monorepo Deployment (Render / Railway)
Since the `client` and `server` are in the same repo, you can deploy them as separate services or a single service serving static files.

#### Option A: Separate Services (Recommended)
1.  **Backend Service**:
    -   Root Directory: `./server`
    -   Build Command: `npm install`
    -   Start Command: `node server.js`
2.  **Frontend Service** (Static Site):
    -   Root Directory: `./client`
    -   Build Command: `npm install && npm run build`
    -   Publish Directory: `dist`

#### Option B: Unified Deployment (Backend serves Frontend)
1.  Build the frontend: `cd client && npm run build`.
2.  Copy `client/dist` to `server/public`.
3.  Configure Express in `server.js` to serve static files:
    ```javascript
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));
    ```

## Build Process

### Frontend
The frontend uses **Vite** for building.
```bash
npm run build
```
This generates optimized, minified assets in the `dist/` folder with hashed filenames for caching.

### Backend
The backend is standard Node.js. No transpilation step is needed unless you move to TypeScript.

## Scalability on Production
-   **Database**: Use MongoDB Atlas with auto-scaling.
-   **Server**: Run behind a Load Balancer.
-   **Socket.io**: If running multiple server instances, use a **Redis Adapter** to sync events.

[← Back to Main Documentation](../../README.md)
