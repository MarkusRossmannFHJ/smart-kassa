/**
 * User login endpoint
 * Handles user authentication and JWT token generation
 * @author Markus Rossman
 * @author Casper Zielinski
 */

import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * POST /login
 * Authenticates a user and issues JWT tokens
 *
 * Verifies user credentials against the database, validates password hash,
 * and generates both access and refresh tokens on successful authentication
 *
 * @route POST /login
 * @access Public
 * @body {string} name - User's account name (required)
 * @body {string} password - User's password (required)
 * @returns {Object} 200 - Login successful with access token and user info
 * @returns {Object} 400 - User not found
 * @returns {Object} 401 - Invalid password
 * @returns {Object} 500 - Internal server error
 */
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query database for user account by email
    const result = await pool.query(
      `
      SELECT 
        account.account_id,
        account.password_hash,
        users.id AS user_id,
        users.email
      FROM account
      JOIN users
        ON users.id = account.users_id
      WHERE account.email = $1
     `, [email]
    );

    // Check if user exists
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Account not found" });
    }

    const user = result.rows[0];

    // Verify password against stored Argon2 hash
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // Prepare payload for access token (includes user info for API requests)
    const payload = {
      userId: user.userId,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      business: user.business,
    };

    // Generate both access and refresh tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ userId: user.userId });

    // Calculate refresh token expiration (30 days from now)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Update account record with new refresh token and expiration
    await pool.query(
      `INSERT INTO account (token_expiress_at, refresh_token)
      VALUES ($1, $2)`,
      [expiresAt, refreshToken]
    );

    // Store refresh token in httpOnly cookie (not accessible via JavaScript)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax", // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return access token and user info to client
    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.userId,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        business: user.business,
      },
    });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /login
 * Health check endpoint for the login route
 * @route GET /login
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Server running ...");
});

export default router;
