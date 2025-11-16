/**
 * SmartKasse Backend Application
 * Main entry point for the Express API server
 *
 * This file configures the Express application with middleware,
 * routes, and error handling for the SmartKasse point-of-sale system
 *
 * @example
 * // Adding a new API endpoint
 * import newRoutes from "./routes/new.js";
 * app.use("/new", newRoutes);
 *
 * @author Casper Zielinski
 * @author Mario Shenouda
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import refreshRoutes from "./routes/refresh.js";
import registerRoutes from "./routes/register.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();

/**
 * Middleware Configuration
 * Applied in order to all incoming requests
 */

// CORS - Allow frontend to make requests with credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Helmet - Set security-related HTTP headers
app.use(helmet());

// Cookie Parser - Parse cookies from request headers
app.use(cookieParser());

/**
 * API Routes
 * All routes are prefixed with their endpoint path
 */
app.use("/refresh", refreshRoutes); // Token refresh endpoint
app.use("/register", registerRoutes); // User registration endpoint

/**
 * Health Check Endpoint
 * Used to verify the server is running
 * @route GET /
 * @access Public
 */
app.get("/", (_, res) => {
  res.send("SmartKasse API - Server running");
});

/**
 * 404 Handler
 * Catches all unmatched routes and returns a 404 error
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// Server Configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SmartKasse API running on port ${PORT}`);
});
