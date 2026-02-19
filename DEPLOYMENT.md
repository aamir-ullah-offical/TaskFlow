# 🚀 Deploying TaskFlow to Railway

This guide walks you through deploying the TaskFlow (MERN Stack) application to [Railway.app](https://railway.app/).

## Prerequisites

1.  **GitHub Account**: Your project must be pushed to a GitHub repository.
2.  **Railway Account**: Sign up at [railway.app](https://railway.app/).

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepared for Railway deployment"
git push origin main
```

## Step 2: Deploy on Railway

1.  **New Project**: Go to your Railway Dashboard and click **"New Project"**.
2.  **Deploy from GitHub**: Select **"Deploy from GitHub repo"**.
3.  **Select Repository**: Choose your `TaskFlow` repository.
4.  **Deploy**: Click **"Deploy Now"**.

## Step 3: Configure Environment Variables

Once the deployment starts, it might fail initially because environment variables are missing. Go to the **Variables** tab in your Railway project and add the following:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Railway sets this automatically, but good to have) | `5000` |
| `MONGO_URI` | Connection string for MongoDB | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `CLIENT_URL` | URL of the deployed frontend | `https://your-app.up.railway.app` |
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window | `900000` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

> **Note**: For `CLIENT_URL`, wait for Railway to generate a domain for your service (under Settings > Domains), then use that URL. Also update `CLIENT_URL` in your `.env` file locally if you want to test against production.

## Step 4: Verify Deployment

1.  Wait for the build to complete. Railway will install dependencies for both client and server, build the React client, and start the Node server.
2.  Click the generated URL to open your app.
3.  Test generic features (Login, Register, Tasks) to ensure the API is connected correctly.

## Troubleshooting

-   **Build Fails**: Check the "Build Logs". Ensure `npm run build` runs successfully locally.
-   **App Crashes**: Check "Deploy Logs". Usually due to missing environment variables (like `MONGO_URI`).
-   **White Screen**: Open browser console. If you see 404s for JS/CSS files, ensure the `client/dist` directory is being served correctly.

---

---

## 🛠️ Build & Start Commands (Technical Reference)

These commands are already configured in your root `package.json`. Railway will run them automatically.

*   **Build Command**:
    ```bash
    npm run build
    ```
    *What it does*: Installs dependencies for root, client, and server; builds the React client; and prepares the server.

*   **Start Command**:
    ```bash
    npm start
    ```
    *What it does*: Starts the Express server (which serves both the API and the React frontend).

## ℹ️ Architecture Note

**Single Service Deployment (Monorepo)**:
We have configured this project to run as a **single service**. You do **NOT** need to deploy frontend and backend separately.
-   The Node.js server handles API requests.
-   The same server serves the compiled React frontend files.
-   This saves costs and simplifies configuration.
