/**
 * User registration endpoint
 * Handles new user registration with JWT authentication
 * @author Mario Shenouda
 * @author Casper Zielinski
 */

import express from "express";
import argon2 from "argon2";
import pool from "../db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * POST /register
 * Creates a new user account and issues authentication tokens
 *
 * Creates user record, hashes password with Argon2, generates JWT tokens,
 * and stores refresh token in database and httpOnly cookie
 *
 * @route POST /register
 * @access Public
 * @body {string} first_name - User's first name (required)
 * @body {string} last_name - User's last name (required)
 * @body {string} email - User's email address (required, unique)
 * @body {string} phone_number - User's phone number (optional)
 * @body {string} password - User's password (required, will be hashed)
 * @body {string} business - User's business name (required)
 * @body {string} fn - User's fn number (required)
 * @body {string} atu - User's atu number (required)
 * @returns {Object} 201 - User created with access token and user info
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 409 - User with this email already exists
 * @returns {Object} 500 - Internal server error
 */
router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    business,
    fn,
    atu,
  } = req.body;

  try {
    // validate input (if missing fields or something is wrong)
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !business ||
      !fn ||
      !atu
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for duplicate email
    const checkuser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkuser.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Hash password using Argon2 (secure password hashing)
    const hashedPassword = await argon2.hash(password);

    // tokens and values for payload, response etc. values initialized in try catch that are needed else where
    let accessToken;
    let refreshToken;
    let userId;

    try {
      // Begin a transaction, so if it fails, or one insert operation fails, both querys roll back
      await pool.query("BEGIN");
      // Insert user into users table and return the generated user_id
      const userRes = await pool.query(
        `INSERT INTO users (first_name, last_name, email, phone_number, business)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id`,
        [first_name, last_name, email, phone_number, business]
      );

      userId = await userRes.rows[0].user_id;

      // Prepare payload for access token (includes user info for API requests)
      const payload = {
        userId: userId,
        email: email,
        name: `${first_name} ${last_name}`,
        business: business,
      };

      // Generate both access and refresh tokens
      accessToken = generateAccessToken(payload);
      refreshToken = generateRefreshToken({ userId: userId });

      // Insert account record with hashed password and refresh token
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

      await pool.query(
        `INSERT INTO account (user_id, name, password_hash, created_on, refresh_token, token_expiress_at, fn, atu)
       VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7)`,
        [
          userId,
          `${first_name} ${last_name}`,
          hashedPassword,
          refreshToken,
          expiresAt,
          fn,
          atu,
        ]
      );

      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      if (/Key \(fn\)=\(([^)]+)\)/.test(error.detail)) {
        return res
          .status(409)
          .send({ error: `Ein Account mit der FN '${fn}' existiert bereits.` });
      }
    }

    // Store refresh token in httpOnly cookie (not accessible via JavaScript)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "none", // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/",
    });

    // Return access token and user info to client
    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: userId,
        name: `${first_name} ${last_name}`,
        email: email,
        business: business,
      },
    });
  } catch (err) {
    console.error("Error in /register: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /register
 * Health check endpoint for the register route
 * @route GET /register
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Server running on route /register");
});

export default router;
